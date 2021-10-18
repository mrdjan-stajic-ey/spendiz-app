export enum Currency {
  USD,
  EUR,
  RSD,
}

const CurrencyText = {
  [Currency.USD]: '$',
  [Currency.EUR]: '€',
  [Currency.RSD]: 'RSD',
};

const getMoney = (amount: number, currency?: Currency): string => {
  if (!currency) {
    return `${amount}${Currency.EUR}`;
  }
  return `${amount}${CurrencyText[currency]}`;
};

export default getMoney;
