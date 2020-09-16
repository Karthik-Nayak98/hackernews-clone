export const getTime = unixTime => {
  const currentTime = Date.now();
  unixTime = new Date(unixTime).getTime();
  const milliSeconds = currentTime - unixTime;

  // Getting the unix time w.r.t GMT 00:00
  const dateObj = new Date(milliSeconds - 360 * 60 * 1000);

  const hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();

  if (hours > 24) return `${hours / 24} days ago`;
  else if (hours > 0 && minutes < 50) return `${hours} hours ago`;
  else if (minutes > 0) return `${minutes} minutes ago`;
  else return `1 minute ago`;
};


export const getDays = unixTime => {
  var months_arr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const date = new Date(unixTime * 1000);
  const year = date.getFullYear();
  const month = months_arr[date.getMonth()]
  const day = date.getDate();

  return `${month} ${day}, ${year} `

}