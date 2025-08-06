export const isValidUrl = (url) => {
  try {
    new URL(url); // throws error if URL is not valid
    return true;
  } catch {
    return false;
  }
};