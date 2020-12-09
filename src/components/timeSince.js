function timeSince(dateObject) {
  let day = 86400000,
    hour = 3600000,
    minute = 60000;
  let diff = Date.now() - dateObject.getTime();
  let result = "";
  return helper(diff);

  function helper(diff) {
    let days = diff / day,
      hours = diff / hour,
      minutes = diff / minute;

    if (days >= 1) {
      diff = diff % day;
      result += `${Math.floor(days)} days, `;
      helper(diff);
    } else if (hours >= 1) {
      diff = diff % hour;
      result += `${Math.floor(hours)} hours, `;
      helper(diff);
    } else if (minutes >= 1) {
      diff = diff % minute;
      result += `${Math.floor(minutes)} minutes`;
      helper(diff);
    }
    if (!result) result = "less than a minute";
    return result + " ago";
  }
}

export default timeSince;
