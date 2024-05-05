export default function getObjectValues<T extends Record<string, any>>(
  obj: T
): Array<NonNullable<T[keyof T]>> {
  const values: Array<T[keyof T]> = [];

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      values.push(obj[key]);
    }
  }

  return values;
}
