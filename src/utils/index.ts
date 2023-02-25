export const formatValue = (value: string): string => {
  return value
    .replace(/[^\w\s]/gi, "")
    .toLowerCase()
    .replace(/\s+/g, "-");
};
