export const shortenUrl = (url) => {
  const shortUrl = url.replace(
    /^(?:https?:\/\/)?(?:www\.)?(?:forum\.)?(?:tech\.)?(?:en\.)?/i,
    ""
  )
    .split("/")[0]
  return shortUrl.toString();
}