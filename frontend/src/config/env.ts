export const validateRequiredEnvVariablePresent = (
  envVariable: string,
  value: string | undefined
) => {
  if (value === undefined) {
    throw new Error(
      `The required environment variable '${envVariable}' was not set`
    );
  }
};
