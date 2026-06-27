const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const formatValue = (value) => {
  if (isObject(value)) {
    return '[complex value]';
  }

  if (typeof value === 'string') {
    return `'${value}'`;
  }

  return String(value);
};

const formatNode = (node, ancestry) => {
  const property = [...ancestry, node.key].join('.');

  switch (node.type) {
    case 'added':
      return `Property '${property}' was added with value: ${formatValue(node.value)}`;
    case 'removed':
      return `Property '${property}' was removed`;
    case 'changed':
      return `Property '${property}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`;
    case 'nested':
      return formatPlain(node.children, [...ancestry, node.key]);
    case 'unchanged':
      return null;
    default:
      throw new Error(`Unknown node type: ${node.type}`);
  }
};

const formatPlain = (diff, ancestry = []) => (
  diff
    .flatMap((node) => formatNode(node, ancestry))
    .filter(Boolean)
    .join('\n')
);

export default formatPlain;
