export default function nullThrows<T>(data: T, message: string = 'Expected value to be non-null'): NonNullable<T> {
  if (data == null) {
    throw new Error(message);
  }
  return data as NonNullable<T>;
}
