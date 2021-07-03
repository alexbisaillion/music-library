export const getUTCDate = (humanDateTime: string): number => {
  const date = new Date(humanDateTime);
  date.setHours(date.getHours());
  return date.getTime() / 1000;
};
