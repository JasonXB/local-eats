export function removeEmptyKVPs(obj) {
  const newObj = {};
  for (let key in obj) {
    // Only add KVP's whose values aren't equal to falsys
    if (obj[key]) newObj[key] = obj[key];
  }
  return newObj;
}
