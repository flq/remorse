export function delay(millisecs, value = null) {
  return new Promise((res, rej) => {
    setTimeout(() => res(value), millisecs);
  });
}
