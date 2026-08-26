export const isRequired = (value) => value !== undefined && value !== null && String(value).trim() !== "";

export const isValidPhone = (value) => /^[6-9]\d{9}$/.test(value);

export const isValidPincode = (value) => /^\d{6}$/.test(value);

// TN IFSC-style pattern: 4 letters, a 0, then 6 alphanumeric chars
export const isValidIFSC = (value) => /^[A-Z]{4}0[A-Z0-9]{6}$/.test(value);

export const isValidAccountNumber = (value) => /^\d{9,18}$/.test(value);

export const isValidYear = (value) => /^(19|20)\d{2}$/.test(value);

export const isNumeric = (value) => /^\d+(\.\d+)?$/.test(value);

export const isInRange = (value, min, max) => {
  const num = Number(value);
  return !Number.isNaN(num) && num >= min && num <= max;
};