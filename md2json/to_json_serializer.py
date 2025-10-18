import json

class Node:
    def __init__(self):
        self.children = []
        self.start_index = 0
        self.end_index = 0

    def accept(self, visitor):
        visitor.visit(self)

    def get_children(self):
        return self.children

    def clear_children(self):
        self.children.clear()

    def add_child(self, child):
        if isinstance(child, Node):
            self.children.append(child)
        elif isinstance(child, str):
            # Wrap a literal string in a Node
            text_node = Node()
            text_node.children.append(child)
            self.children.append(text_node)

    def set_start_index(self, index):
        self.start_index = index

    def set_end_index(self, index):
        self.end_index = index


class RootNode(Node):
    def __init__(self):
        super().__init__()
        self.references = []
        self.abbreviations = []

    def get_references(self):
        return self.references

    def get_abbreviations(self):
        return self.abbreviations


class HeaderNode(Node):
    def __init__(self, level):
        super().__init__()
        self.level = level

    def get_level(self):
        return self.level

    def get_start_index(self):
        return self.start_index

    def get_end_index(self):
        return self.end_index

    def set_end_index(self, index):
        self.end_index = index


class SuperNode(Node):
    def __init__(self, children=None):
        super().__init__()
        if children:
            self.children = children

    def get_start_index(self):
        return self.start_index

    def get_end_index(self):
        return self.end_index


# A very simple JSONPrinter – it simply concatenates string pieces.
class JSONPrinter:
    def __init__(self):
        self.result = []

    def append(self, s):
        self.result.append(s)

    def clear(self):
        self.result = []

    def getString(self):
        return ''.join(self.result)


class ToJSONSerializer:
    def __init__(self):
        self.references = {}
        self.abbreviations = {}
        self.printer = JSONPrinter()
        self.raw = []
        self.LEVEL = 1   # Assume top-level headers have level==1

    def to_json(self, ast_root):
        if ast_root is None:
            raise ValueError("astRoot cannot be None")
        # First, “refactor” the AST.
        ast_root = self.refactor_ast(ast_root)
        # Directly serialize the refactored AST without wrapping in an array.
        ast_root.accept(self)
        return self.printer.getString()

    def refactor_ast(self, node):
        # ----------------------------------------------------------
        # Use index‐based iteration so that each child is “consumed”
        # once. When a HeaderNode is found, we:
        #   (a) Wrap its original children in a SuperNode (“header text”);
        #   (b) Immediately consume subsequent non‐header nodes as a
        #       SuperNode (“header description”);
        #   (c) Then, if available, add any extra nodes (which belong to
        #       that header because they have lower level) to its children.
        # ----------------------------------------------------------
        original_children = node.get_children()[:]  # shallow copy
        new_children = []
        i = 0
        while i < len(original_children):
            current_node = original_children[i]
            new_children.append(current_node)
            i += 1

            if isinstance(current_node, HeaderNode):
                header_level = current_node.get_level()

                # (a) Wrap original header children into a “header text” SuperNode.
                original_header_children = current_node.get_children()[:]
                current_node.clear_children()
                header_text = SuperNode(original_header_children)
                header_text.set_start_index(current_node.start_index)
                header_text.set_end_index(current_node.end_index)
                current_node.add_child(header_text)

                # (b) Consume subsequent nodes that are NOT HeaderNodes into a header description.
                header_description = SuperNode()
                header_description.set_start_index(header_text.get_end_index())
                header_description.set_end_index(header_text.get_end_index())
                while i < len(original_children) and not isinstance(original_children[i], HeaderNode):
                    header_description.add_child(original_children[i])
                    header_description.set_end_index(original_children[i].end_index)
                    i += 1
                current_node.add_child(header_description)

                # (c) If the following nodes “belong” to this header (i.e. their header
                # level is higher/lower than the current one), then add them as extra children.
                while i < len(original_children):
                    if isinstance(original_children[i], HeaderNode) and header_level >= original_children[i].get_level():
                        break
                    current_node.add_child(original_children[i])
                    current_node.set_end_index(original_children[i].end_index)
                    i += 1

        # Replace the node’s children with the refactored ones.
        node.clear_children()
        for child in new_children:
            if isinstance(child, HeaderNode):
                node.add_child(self.refactor_ast(child))
            else:
                node.add_child(child)
        return node

    def visit(self, node):
        if isinstance(node, RootNode):
            self.visit_root_node(node)
        elif isinstance(node, HeaderNode):
            self.visit_header_node(node)
        elif isinstance(node, SuperNode):
            self.visit_super_node(node)
        else:
            self.visit_children(node)

    def visit_root_node(self, node):
        # Process any references or abbreviations (not detailed here)
        for ref_node in node.get_references():
            self.visit_children(ref_node)
            self.references[self.normalize(''.join(self.printer.result))] = ref_node
            self.printer.clear()
        for abbr_node in node.get_abbreviations():
            self.visit_children(abbr_node)
            abbr = ''.join(self.printer.result)
            self.printer.clear()
            abbr_node.get_expansion().accept(self)
            expansion = ''.join(self.printer.result)
            self.abbreviations[abbr] = expansion
            self.printer.clear()

        # Now print the children as a comma­‐separated JSON array.
        children = node.get_children()
        for i, child in enumerate(children):
            if i > 0:
                self.printer.append(', ')
            child.accept(self)

    def visit_header_node(self, node):
        level = node.get_level()
        # For top-level header nodes (level equals self.LEVEL)
        if level == self.LEVEL:
            self.printer.append('{')
            self.printer.append('"tag": ')
            node.get_children()[0].accept(self)  # Assuming first child is the tag
            self.printer.append(', "descr": ')
            node.get_children()[1].accept(self)  # Assuming second child is the description

            # Process Level 2 headers as dynamic fields
            level_2_headers = [child for child in node.get_children()[2:] if isinstance(child, HeaderNode) and child.get_level() == self.LEVEL + 1]
            if level_2_headers:
                for index, child in enumerate(level_2_headers):
                    self.printer.append(', ')
                    # Extract the string content from the Node for JSON serialization
                    field_name_node = child.get_children()[0].get_children()[0]
                    field_name = field_name_node.get_children()[0] if isinstance(field_name_node, Node) else field_name_node
                    self.printer.append(json.dumps(field_name))  # Field name
                    self.printer.append(': {')
                    self.printer.append('"plain": ')
                    child.get_children()[1].accept(self)  # Serialize the description
                    self.printer.append(', "childs": {')
                    self.printer.append('"0": [')
                    for sub_index, sub_child in enumerate(child.get_children()[1:], start=0):
                        if sub_index > 0:
                            self.printer.append(', ')
                        self.printer.append('[')
                        for sub_sub_index, sub_sub_child in enumerate(sub_child.get_children(), start=0):
                            if sub_sub_index > 0:
                                self.printer.append(', ')
                            self.printer.append('{')
                            self.printer.append('"content": ')
                            sub_sub_child.accept(self)
                            self.printer.append(', "plain": ')
                            sub_sub_child.accept(self)
                            self.printer.append(', "plainChilds": ""')
                            self.printer.append(', "childs": []')
                            self.printer.append('}')
                        self.printer.append(']')
                    self.printer.append(']')
                    self.printer.append('}')
                    self.printer.append('}')
            self.printer.append('}')
        else:
            # For nested header nodes, output similarly (simplified)
            self.printer.append('{')
            if len(node.get_children()) >= 2:
                self.printer.append('"description": ')
                node.get_children()[1].accept(self)
            else:
                self.printer.append('"description": []')
            self.printer.append('}')

    def visit_super_node(self, node):
        children = node.get_children()
        if children:
            if len(children) > 1:
                self.printer.append('[')
            for i, child in enumerate(children):
                if i > 0:
                    self.printer.append(', ')
                if isinstance(child, str):
                    self.printer.append(json.dumps(child))
                else:
                    child.accept(self)
            if len(children) > 1:
                self.printer.append(']')
        else:
            self.printer.append('[]')

    def visit_children(self, node):
        # For nodes whose children are not “pre‐wrapped”
        children = node.get_children()
        for i, child in enumerate(children):
            if i > 0:
                self.printer.append(', ')
            if isinstance(child, str):
                if i == 0 or child:
                    self.printer.append(json.dumps(child))
            else:
                child.accept(self)

    def normalize(self, string):
        return ''.join(c.lower() for c in string if c not in ' \n\t')

    def set_raw(self, raw):
        if isinstance(raw, str):
            self.raw = list(raw)
        else:
            self.raw = raw

    def get_level(self):
        return self.LEVEL

    def set_level(self, level):
        self.LEVEL = level
