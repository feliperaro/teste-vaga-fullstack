const valuesToFormatCurrency: string[] = [
  "vlTotal",
  "vlPresta",
  "vlMora",
  "vlMulta",
  "vlOutAcr",
  "vlIof",
  "vlDescon",
  "vlAtual",
];

export const isToFormatCurrency = (value: string) =>
  valuesToFormatCurrency.includes(value);

export const formatCurrency: Function = (value: string) => {
  const currencyFormat = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
  return currencyFormat.format(Number(value));
};
