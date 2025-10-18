import argparse
import json
import os
from typing import Dict, List, Optional, Tuple


class Md2Json:
    """Utility that converts markdown comparison files into JSON compatible with the legacy pipeline."""

    def __init__(self, level: int = 1, pretty_printing: bool = False):
        self.level = level
        self.pretty_printing = pretty_printing

    def read_file(self, file_path: str) -> str:
        try:
            with open(file_path, "r", encoding="utf-8") as file:
                return file.read()
        except FileNotFoundError:
            print(f"Error: File {file_path} not found.")
        except IOError as exc:
            print(f"Error reading file {file_path}: {exc}")
        return ""

    def write_file(self, path: str, content: str) -> None:
        dir_name = os.path.dirname(path)
        if dir_name:
            os.makedirs(dir_name, exist_ok=True)
        try:
            with open(path, "w", encoding="utf-8") as file:
                file.write(content)
        except IOError as exc:
            print(f"Error writing to file {path}: {exc}")

    def convert_markdown_to_json(self, markdown_content: str) -> Optional[Dict]:
        """Parses markdown into the legacy JSON structure expected by the Angular/Gulp stack."""
        lines = [line.rstrip() for line in markdown_content.splitlines()]

        # Extract title
        title_line = self._find_first_header(lines)
        if title_line is None:
            return None

        title = self._strip_header_marker(lines[title_line])

        description_lines, criteria_blocks = self._extract_sections(lines, title_line + 1)

        description = self._normalise_description(description_lines)
        criteria = [self._build_criteria_block(block) for block in criteria_blocks]

        children = []
        if description:
            children.append({"type": "text", "content": description})
        children.extend(criteria)

        return {
            "type": "header",
            "level": 1,
            "content": title,
            "children": children
        }

    def dir_to_json(self, input_dir: str, output_path_tmp: str, output_path: str) -> None:
        json_array: List[Dict] = []
        if not os.path.isdir(input_dir):
            print(f"Input directory {input_dir} not found.")
            return

        for filename in sorted(os.listdir(input_dir)):
            if not filename.endswith(".md"):
                continue
            file_path = os.path.join(input_dir, filename)
            markdown_content = self.read_file(file_path)
            if not markdown_content:
                continue

            json_object = self.convert_markdown_to_json(markdown_content)
            if not json_object:
                continue

            json_array.append(json_object)
            json_string = json.dumps(json_object, indent=4 if self.pretty_printing else None)
            tmp_target = os.path.join(output_path_tmp, filename.replace(".md", ".json"))
            self.write_file(tmp_target, json_string)

        final_json = json.dumps(json_array, indent=4 if self.pretty_printing else None)
        self.write_file(output_path, final_json)

    def _find_first_header(self, lines: List[str]) -> Optional[int]:
        for idx, line in enumerate(lines):
            if line.strip().startswith("#"):
                return idx
        return None

    def _strip_header_marker(self, line: str) -> str:
        stripped = line.lstrip("#").strip()
        return stripped

    def _extract_sections(self, lines: List[str], start_index: int) -> Tuple[List[str], List[Tuple[str, List[str]]]]:
        description_lines: List[str] = []
        criteria_blocks: List[Tuple[str, List[str]]] = []

        current_criterion: Optional[Tuple[str, List[str]]] = None

        for line in lines[start_index:]:
            stripped = line.strip()
            if stripped.startswith("##"):
                # Flush existing criterion
                if current_criterion:
                    criteria_blocks.append(current_criterion)
                criterion_name = stripped.lstrip("#").strip()
                current_criterion = (criterion_name, [])
            elif stripped.startswith("#"):
                # Another top-level header indicates a new entry; stop processing
                break
            else:
                if current_criterion:
                    current_criterion[1].append(line)
                else:
                    description_lines.append(line)

        if current_criterion:
            criteria_blocks.append(current_criterion)

        return description_lines, criteria_blocks

    def _normalise_description(self, description_lines: List[str]) -> str:
        cleaned = [line.strip() for line in description_lines if line.strip()]
        return "\n".join(cleaned)

    def _build_criteria_block(self, criterion: Tuple[str, List[str]]) -> Dict:
        name, lines = criterion
        text_lines: List[str] = []
        list_items: List[str] = []

        for line in lines:
            stripped = line.strip()
            if not stripped:
                continue
            if stripped.startswith("-"):
                item = stripped.lstrip("-").strip()
                if item:
                    list_items.append(item)
            else:
                text_lines.append(stripped)

        children: List[Dict] = []
        if text_lines:
            children.append({"type": "text", "content": "\n".join(text_lines)})
        if list_items:
            children.append({
                "type": "list",
                "level": 2,
                "children": [
                    {
                        "type": "item",
                        "level": 1,
                        "content": item,
                        "plainChildren": ""
                    }
                    for item in list_items
                ]
            })

        return {
            "type": "header",
            "level": 2,
            "content": name,
            "children": children
        }


def build_arg_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Convert markdown comparison files to JSON.")
    parser.add_argument("--input", dest="input_dir")
    parser.add_argument("--tmp", dest="tmp_dir")
    parser.add_argument("--output", dest="output_path")
    parser.add_argument("--level", type=int, default=1)
    parser.add_argument("--pretty", action="store_true", help="Enable pretty printed JSON output.")
    parser.add_argument("positional", nargs="*",
                        help="Backward compatible positional arguments: input_dir tmp_dir output_path [level] [pretty]")
    return parser


def parse_arguments(raw_args: List[str]) -> argparse.Namespace:
    parser = build_arg_parser()
    args = parser.parse_args(raw_args)

    if args.input_dir and args.tmp_dir and args.output_path:
        return args

    # Fallback to legacy positional arguments.
    if len(args.positional) < 3:
        parser.error(
            "Missing required arguments. Provide --input/--tmp/--output or positional input_dir tmp_dir output_path."
        )

    positional = args.positional
    args.input_dir = positional[0]
    args.tmp_dir = positional[1]
    args.output_path = positional[2]

    if len(positional) > 3:
        args.level = int(positional[3])
    if len(positional) > 4:
        pretty_value = positional[4].lower()
        args.pretty = pretty_value in {"true", "1", "yes"}

    return args


def main(raw_args: List[str]) -> None:
    args = parse_arguments(raw_args)
    md2json = Md2Json(level=args.level, pretty_printing=args.pretty)
    md2json.dir_to_json(args.input_dir, args.tmp_dir, args.output_path)


if __name__ == "__main__":
    import sys

    main(sys.argv[1:])
