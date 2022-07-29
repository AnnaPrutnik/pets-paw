export function arrayDivider<T>(array: T[], elements: number) {
  let newArray = [];
  for (let i = 0; i < array.length; i += elements) {
    newArray.push(array.slice(i, i + elements));
  }
  return newArray;
}
