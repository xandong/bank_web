export const NormalizeCurrencyBR = (value: string) => {
  return value.replace(/[\D]/g, "0,00").replace(/(\d*)(\d{2})/, "$1,$2");
};
