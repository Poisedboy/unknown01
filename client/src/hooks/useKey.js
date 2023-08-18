function useKey() {
  const randomNumber = Math.floor(Math.random() * 10000); // Generate a random number between 0 and 9999
  const fourDigitString = randomNumber.toString().padStart(4, "0"); // Convert to string and pad with zeros if necessary
  return fourDigitString;
}

export { useKey };
