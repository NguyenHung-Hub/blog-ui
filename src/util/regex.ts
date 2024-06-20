export function isValidUrl(url: string) {
  const regex =
    /^(https?|ftp):\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,6}(?:\/[^<>]*)?$/i;
  return regex.test(url);
}
