export const ctoF = (c) => (c * 9) / 5 + 32;

export const mpsToMph = (mps) => (mps * 2.236936).toFixed(2);

export const kmToM = (km) => (km / 1.609).toFixed(1);

export const timeToAMPM = (time) => {
  let hours = time.split(":")[0];
  let minutes = time.split(":")[1];
  hours = hours % 12;
  hours = hours ? hours : 12;
  return hours + ":" + minutes;
};

export const degToCompass = (num) => {
  var val = Math.floor(num / 22.5 + 0.5);
  var arr = [
    "N",
    "NNE",
    "NE",
    "ENE",
    "E",
    "ESE",
    "SE",
    "S/SE",
    "S",
    "SSW",
    "SW",
    "WSW",
    "W",
    "WNW",
    "NW",
    "NNW",
  ];
  return arr[val % 16];
};

export const convertTime = (unixSeconds, timezone) => {
  const time = new Date((unixSeconds + timezone) * 1000)
    .toISOString()
    .match(/(\d{2}:\d{2})/);

  return time;
};
