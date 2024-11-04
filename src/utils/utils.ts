export const formatCurrency = (amount: number, options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'NGN',
    currencyDisplay: 'narrowSymbol',
    maximumFractionDigits: 0,
    ...options,
  }).format(amount);
};
