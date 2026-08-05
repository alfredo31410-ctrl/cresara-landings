export function normalizePhone(countryCode: string, phone: string) {
  const code = countryCode.replace(/[^\d+]/g, "").replace(/^00/, "+");
  const digits = phone.replace(/\D/g, "");
  if (!/^\+\d{1,4}$/.test(code) || digits.length < 6 || digits.length > 14) return null;
  return `${code}${digits}`;
}
