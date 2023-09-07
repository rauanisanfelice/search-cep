export function isEmpty(value) {
  return value === '' || value === undefined || value === null;
}

export function isNotEmpty(value) {
  return value !== '' && value !== undefined && value !== null;
}

export function cleanCEP(string) {
  return string.length >= 8 ? string.slice(0, 8) : string.padEnd(8, '0');
}
