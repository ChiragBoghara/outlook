const getFormattedDate = (timestamp) => {
  const date = new Date(timestamp);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-indexed
  const year = date.getFullYear();
  const hours = date.getHours() % 12 || 12; // Converting to 12-hour format
  const minutes = String(date.getMinutes()).padStart(2, "0");
  const amPm = date.getHours() >= 12 ? "pm" : "am";

  return `${day}/${month}/${year} ${hours}:${minutes}${amPm}`;
};

export default getFormattedDate;