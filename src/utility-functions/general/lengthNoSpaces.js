export function lengthNoSpaces(str) {
  return str.replaceAll(/\s/g, "").length;
}

export function removeWhiteSpace(str, replacement) {
  let newString;
  if(!replacement){
    newString = str.replaceAll(/\s/g, "");
    return newString;
  } else {
    newString = str.replaceAll(/\s/g, "+");
    return newString;
  }
  
}
