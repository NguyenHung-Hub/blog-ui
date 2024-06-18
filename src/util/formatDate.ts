const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const formatDate = (date: string): string => {
  const newDate = new Date(date);

  return (
    "" +
    newDate.getDate() +
    " " +
    monthNames[newDate.getMonth()] +
    " " +
    newDate.getFullYear()
  );
};
const formatDateTime = (date: string): string => {
  const d = new Date(date);

  let str = "";
  str += d.getHours() < 10 ? `0${d.getHours()}:` : `${d.getHours()}:`;
  str += d.getMinutes() < 10 ? `0${d.getMinutes()}` : `${d.getMinutes()}`;
  str += "-";
  str += d.getDate() < 10 ? `0${d.getDate()}/` : `${d.getDate()}/`;
  str +=
    d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}/` : `${d.getMonth() + 1}/`;
  str += d.getFullYear() < 10 ? `0${d.getFullYear()}/` : `${d.getFullYear()}`;

  return str;
};
export { formatDateTime };
export default formatDate;
