function useAmountWords(inputString) {
  const trimmedString = inputString.trim();
  const wordsArray = trimmedString.split(/\s+/);
  const filteredWordsArray = wordsArray.filter(
    (word) => !/^[.,!?;:'"-]+$/.test(word)
  );
  return filteredWordsArray.length;
}

export { useAmountWords };
