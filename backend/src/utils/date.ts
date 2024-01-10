const valuesToFormatDate: string[] = ["dtContrato", "dtVctPre"];

export const isToFormatDate = (value: string) =>
  valuesToFormatDate.includes(value);

export const formatDate = (value: string) => {
  const year = parseInt(value.substring(0, 4), 10);
  const month = parseInt(value.substring(4, 6), 10) - 1;
  const day = parseInt(value.substring(6, 8), 10);

  const dateObject = new Date(year, month, day);

  const dateFormat = new Intl.DateTimeFormat("pt-BR", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
  });

  return dateFormat.format(dateObject);
};
