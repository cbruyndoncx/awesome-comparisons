import argparse
import json
import os
from typing import List

from to_json_serializer import HeaderNode, Node, RootNode, ToJSONSerializer


class Md2Json:
    """Utility that converts markdown comparison files into JSON."""

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

    def convert_markdown_to_json(self, markdown_content: str) -> dict:
        """Builds an AST from markdown content and returns the JSON representation."""
        root_node = self.create_ast(markdown_content)
        serializer = ToJSONSerializer()
        serializer.set_raw(markdown_content)
        json_content = serializer.to_json(root_node)
        return json.loads(json_content)

    def create_ast(self, markdown_content: str) -> RootNode:
        """Creates a simple AST capturing headers, list items and paragraphs."""
        root_node = RootNode()
        lines = markdown_content.splitlines()

        for line in lines:
            line = line.strip()
            if not line:
                continue

            if line.startswith("#"):
                level = len(line) - len(line.lstrip("#"))
                header_node = HeaderNode(level)
                text_content = line.lstrip("#").strip()
                header_node.add_child(text_content)
                header_node.set_start_index(line.index(text_content))
                header_node.set_end_index(line.index(text_content) + len(text_content))
                root_node.add_child(header_node)
            elif line.startswith("- "):
                list_item_node = Node()
                text_content = line[2:].strip()
                list_item_node.add_child(text_content)
                list_item_node.set_start_index(line.index(text_content))
                list_item_node.set_end_index(line.index(text_content) + len(text_content))
                root_node.add_child(list_item_node)
            elif line.startswith(">"):
                blockquote_node = Node()
                text_content = line[1:].strip()
                blockquote_node.add_child(text_content)
                blockquote_node.set_start_index(line.index(text_content))
                blockquote_node.set_end_index(line.index(text_content) + len(text_content))
                root_node.add_child(blockquote_node)
            else:
                para_node = Node()
                text_content = line.strip()
                para_node.add_child(text_content)
                para_node.set_start_index(line.index(text_content))
                para_node.set_end_index(line.index(text_content) + len(text_content))
                root_node.add_child(para_node)

        return root_node

    def dir_to_json(self, input_dir: str, output_path_tmp: str, output_path: str) -> None:
        json_array: List[dict] = []
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
            json_array.append(json_object)
            json_string = json.dumps(json_object, indent=4 if self.pretty_printing else None)
            tmp_target = os.path.join(output_path_tmp, filename.replace(".md", ".json"))
            self.write_file(tmp_target, json_string)

        final_json = json.dumps(json_array, indent=4 if self.pretty_printing else None)
        self.write_file(output_path, final_json)


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
