export const flattenModel = <T,>(model: T, keysToBeFlattened: (keyof T)[]) => {
  const keysNotToBeFlattened = (Object.keys(model)).filter(key => !keysToBeFlattened.includes(key as keyof T));
  let flattenedModel = keysNotToBeFlattened.reduce((objSoFar, keyNotToBeFlattened) => ({
      ...objSoFar,
      keyNotToBeFlattened: model[keyNotToBeFlattened],
  }), {})
  return keysToBeFlattened.reduce((objSoFar, keyToBeFlattened) => ({
      ...objSoFar,
      ...(model[keyToBeFlattened] as Object)
  }), flattenedModel);
}