export const formatCurrency = (value: number, currency: string = "JPY"): string =>
  new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
  }).format(value);
