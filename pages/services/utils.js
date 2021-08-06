export const isPM = (time) => {
  let hours = time.split(":")[0];
  if (hours >= 12) {
    return "PM";
  } else {
    return "AM";
  }
};
