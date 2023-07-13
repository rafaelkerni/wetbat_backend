export const removeTimestamps = (object: any) => {
  const { created_at, updated_at, ...rest } = object;

  return rest;
};
