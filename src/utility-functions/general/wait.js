export const wait = (timeToDelay) =>
  new Promise((resolve) => setTimeout(resolve, timeToDelay * 1000));
