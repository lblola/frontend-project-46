const isObject = (value) => value !== null && typeof value === 'object' && !Array.isArray(value);

const buildDiff = (data1, data2) => {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();

  return keys.map((key) => {
    const hasKey1 = Object.hasOwn(data1, key);
    const hasKey2 = Object.hasOwn(data2, key);

    if (!hasKey1) {
      return { key, type: 'added', value: data2[key] };
    }

    if (!hasKey2) {
      return { key, type: 'removed', value: data1[key] };
    }

    if (isObject(data1[key]) && isObject(data2[key])) {
      return { key, type: 'nested', children: buildDiff(data1[key], data2[key]) };
    }

    if (data1[key] === data2[key]) {
      return { key, type: 'unchanged', value: data1[key] };
    }

    return {
      key,
      type: 'changed',
      oldValue: data1[key],
      newValue: data2[key],
    };
  });
};

export default buildDiff;
