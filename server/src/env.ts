export const getRequiredEnv = (propertyName: string) => {
  const value = process.env[propertyName];
  if (value == null) {
    throw new Error(`${propertyName} must be set as an environment variable, but it was not`);
  }
  return value;
}