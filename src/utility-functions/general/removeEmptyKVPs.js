// Filter out KVP's with these values: undefined, null, ""
export function removeEmptyKVPs(obj) {
  const newObj = {};
  for (let key in obj) {
    const value = obj[key];
    if (value !== null && value !== undefined && value !== "") {
      newObj[key] = obj[key];
    }
  }
  return newObj;
}

// Removes every KVP with a falsy value
export function removeFalsyKVPs(obj) {
  const newObj = {};
  for (let key in obj) {
    const value = obj[key];
    if (value) {
      newObj[key] = value;
    }
  }
  return newObj;
}
