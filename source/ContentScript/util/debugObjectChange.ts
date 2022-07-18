export const debugObjectChange = (name: string) => {
  let lastValue: unknown;
  return (value: unknown) => {
    console.debug(`${name} value change`, lastValue !== value);
    lastValue = value;
  }
}