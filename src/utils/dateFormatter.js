export const dateFormatter = (date) =>
  date.toISOString().substring(0, 10).split("-").reverse().join("/");
