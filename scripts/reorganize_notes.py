#!/usr/bin/env python3
"""Reorganize notes to follow the latest comparison template."""

from __future__ import annotations

import argparse
import re
import textwrap
from collections import defaultdict
from dataclasses import dataclass
from pathlib import Path
from typing import Dict, Iterable, List, Sequence
SECTION_PATTERN = re.compile(r"^(#{2,3})\s+(.*)$")


def normalize(title: str) -> str:
    """Normalize heading titles for comparison."""

    return re.sub(r"[^a-z0-9]+", "", title.lower())


ALIASES: Dict[str, str] = {
    "repository": "repo",
}

PLACEHOLDER_COMMENT = "<!-- ToDo -->"


def canonical_key(name: str) -> str:
    key = normalize(name)
    return ALIASES.get(key, key)


@dataclass
class Section:
    level: int
    title: str
    content: str


@dataclass
class TemplateSubsection:
    title: str
    content: str

    @property
    def normalized_title(self) -> str:
        return canonical_key(self.title)


@dataclass
class Group:
    title: str
    content: str
    subsections: List[TemplateSubsection]

    @property
    def normalized_title(self) -> str:
        return canonical_key(self.title)


def parse_template(path: Path) -> List[Group]:
    template_text = path.read_text(encoding="utf-8")
    _, body = split_header(template_text)
    template_sections = parse_sections(body)

    groups: List[Group] = []
    current: Group | None = None
    for section in template_sections:
        if section.level == 2:
            current = Group(title=section.title, content=section.content, subsections=[])
            groups.append(current)
        elif section.level == 3 and current is not None:
            current.subsections.append(
                TemplateSubsection(title=section.title, content=section.content)
            )

    return groups


def split_header(text: str) -> tuple[str, str]:
    first_section = re.search(r"^##\s+", text, flags=re.MULTILINE)
    if not first_section:
        return text.rstrip("\n"), ""
    head = text[: first_section.start()].rstrip("\n")
    body = text[first_section.start():].lstrip("\n")
    return head, body


def parse_sections(body: str) -> List[Section]:
    sections: List[Section] = []
    current_level = None
    current_title = None
    current_lines: List[str] = []

    for line in body.splitlines():
        heading = SECTION_PATTERN.match(line)
        if heading:
            if current_title is not None:
                content = "\n".join(current_lines).rstrip()
                sections.append(Section(current_level, current_title, content))
            current_level = len(heading.group(1))
            current_title = heading.group(2).strip()
            current_lines = []
        else:
            if current_title is not None:
                current_lines.append(line)

    if current_title is not None:
        content = "\n".join(current_lines).rstrip()
        sections.append(Section(current_level, current_title, content))

    return sections


def format_section(title: str, content: str, level: int = 3) -> str:
    heading = "#" * level
    if content:
        return f"{heading} {title}\n{content.rstrip()}"
    return f"{heading} {title}"


def template_placeholder(content: str) -> str:
    details = content.rstrip()
    if details:
        return f"{PLACEHOLDER_COMMENT}\n{details}"
    return PLACEHOLDER_COMMENT


def reorganize_body(groups: Sequence[Group], sections: Sequence[Section]) -> tuple[str, List[str]]:
    normalized_map: Dict[str, List[int]] = defaultdict(list)
    for idx, section in enumerate(sections):
        if section.content.strip():
            normalized_map[canonical_key(section.title)].append(idx)

    used = [False] * len(sections)
    warnings: List[str] = []
    body_parts: List[str] = []

    for group in groups:
        group_sections: List[str] = []
        group_key = group.normalized_title
        normalized_subs = [sub.normalized_title for sub in group.subsections]

        if group_key not in normalized_subs and normalized_map.get(group_key):
            idx = normalized_map[group_key].pop(0)
            used[idx] = True
            group_sections.append(format_section(group.title, sections[idx].content))

        for subsection, n_key in zip(group.subsections, normalized_subs):
            if normalized_map.get(n_key):
                idx = normalized_map[n_key].pop(0)
                used[idx] = True
                group_sections.append(format_section(subsection.title, sections[idx].content))
            else:
                group_sections.append(
                    format_section(
                        subsection.title,
                        template_placeholder(subsection.content),
                    )
                )

        if group_sections:
            body_parts.append(f"## {group.title}")
            body_parts.append("")
            body_parts.append("\n\n".join(group_sections))
            body_parts.append("")

    leftovers = [
        sections[i]
        for i, flag in enumerate(used)
        if not flag and sections[i].content.strip()
    ]
    if leftovers:
        warnings.append(
            "Unmapped sections: "
            + ", ".join(section.title for section in leftovers)
        )
        for section in leftovers:
            body_parts.append(format_section(section.title, section.content, level=section.level))
            body_parts.append("")

    body = "\n".join(body_parts).strip()
    return body, warnings


def process_file(path: Path, groups: Sequence[Group], dry_run: bool) -> List[str]:
    original_text = path.read_text(encoding="utf-8")
    header, body_text = split_header(original_text)
    sections = parse_sections(body_text)
    new_body, warnings = reorganize_body(groups, sections)

    assembled_parts = []
    if header:
        assembled_parts.append(header.rstrip())
    if new_body:
        if assembled_parts:
            assembled_parts.append("")
        assembled_parts.append(new_body)
    new_text = "\n".join(assembled_parts).strip() + "\n"

    if new_text == original_text:
        return warnings

    action = "Would update" if dry_run else "Updated"
    print(f"{action} {path}")
    if not dry_run:
        path.write_text(new_text, encoding="utf-8")
    return warnings


def iter_target_files(data_dir: Path, explicit: Sequence[str]) -> Iterable[Path]:
    if explicit:
        yielded = set()
        for pattern in explicit:
            matches = sorted(data_dir.glob(pattern))
            if not matches:
                candidate = data_dir.joinpath(pattern)
                if candidate.is_file():
                    matches = [candidate]
            for path in matches:
                if path.is_file() and path not in yielded:
                    yielded.add(path)
                    yield path
        return
    for path in sorted(data_dir.glob("*.md")):
        if path.is_file():
            yield path


HELP_EPILOG = textwrap.dedent(
    """Examples:
      python scripts/reorganize_notes.py --dry-run
      python scripts/reorganize_notes.py data/vim.md data/emacs.md

    Notes:
      * Filenames are resolved relative to --data-dir.
      * --template controls which comparison template to follow.
    """
)


def main() -> None:
    parser = argparse.ArgumentParser(
        description=__doc__,
        add_help=False,
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog=HELP_EPILOG,
    )
    parser.add_argument(
        "-h",
        "--help",
        action="help",
        default=argparse.SUPPRESS,
        help="Show this help message and exit",
    )
    parser.add_argument(
        "--dataset",
        type=Path,
        help="Path to a dataset root containing config/ and data/ subdirectories",
    )
    parser.add_argument(
        "--template",
        default=Path("config/comparison-template.md"),
        type=Path,
        help="Path to the comparison template (overrides --dataset config)",
    )
    parser.add_argument(
        "--data-dir",
        default=Path("data"),
        type=Path,
        help="Directory containing notes (overrides --dataset data dir)",
    )
    parser.add_argument(
        "--dry-run",
        action="store_true",
        help="Show which files would change without modifying them",
    )
    parser.add_argument(
        "files",
        nargs="*",
        help="Optional subset of note filenames to process",
    )

    args = parser.parse_args()

    if args.dataset:
        dataset_root = args.dataset
        data_dir = dataset_root / "data"
        config_dir = dataset_root / "config"
        template_matches = sorted(config_dir.glob("*comparison-template.md"))
        if not template_matches:
            raise FileNotFoundError(
                f"No comparison template found in {config_dir} matching '*comparison-template.md'"
            )
        if len(template_matches) > 1:
            raise RuntimeError(
                f"Multiple comparison templates found in {config_dir}: {', '.join(str(p) for p in template_matches)}"
            )
        template_path = template_matches[0]
    else:
        data_dir = args.data_dir
        template_path = args.template

    groups = parse_template(template_path)
    warnings: List[str] = []

    for note_path in iter_target_files(data_dir, args.files):
        warnings.extend(process_file(note_path, groups, args.dry_run))

    if warnings:
        print("\nWarnings:")
        for warning in warnings:
            print(f"- {warning}")


if __name__ == "__main__":
    main()
