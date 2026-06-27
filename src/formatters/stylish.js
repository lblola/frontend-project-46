const indentSize = 4;
const signOffset = 2;

const getIndent = (depth, offset = 0) => ' '.repeat(depth * indentSize + offset);

const stringify = (value, depth) => {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    return String(value);
  }

  const lines = Object.entries(value).map(([key, nestedValue]) => (
    `${getIndent(depth + 1)}${key}: ${stringify(nestedValue, depth + 1)}`
  ));

  return `{\n${lines.join('\n')}\n${getIndent(depth)}}`;
};

const formatNode = (node, depth) => {
  const indent = getIndent(depth, -signOffset);

  switch (node.type) {
    case 'added':
      return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;
    case 'removed':
      return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;
    case 'unchanged':
      return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;
    case 'changed':
      return [
        `${indent}- ${node.key}: ${stringify(node.oldValue, depth)}`,
        `${indent}+ ${node.key}: ${stringify(node.newValue, depth)}`,
      ].join('\n');
    case 'nested':
      return `${indent}  ${node.key}: {\n${formatStylish(node.children, depth + 1)}\n${getIndent(depth)}}`;
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const formatStylish = (diff, depth = 1) => diff.map((node) => formatNode(node, depth)).join('\n');

const stylish = (diff) => `{\n${formatStylish(diff)}\n}`;

export default stylish;
