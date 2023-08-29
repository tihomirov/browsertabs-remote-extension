export function assertUnreachable(value: never): never {
  // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
  throw new Error(`Statement should be unreachable. Value: ${value}`);
}
