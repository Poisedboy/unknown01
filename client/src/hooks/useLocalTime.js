function useLocalTime(string) {
  const dateObject = new Date(string);

  const year = dateObject.getFullYear();
  const month = dateObject.getMonth() + 1;
  const day = dateObject.getDate();
  const hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  return `${month} ${day}, ${year} | ${hours}:${minutes}`;
}

export { useLocalTime };
