const handlers = {
  milliseconds: {
    //return one week or weeks number in millseconds
    weeks: (weeks) => (1000 * 60 * 60 * 24 * 7) * (weeks ? weeks : 1),
    //return one day or days number in millseconds
    days: (days) => (1000 * 60 * 60 * 24) * (days ? days : 1),
    //return one hour or hours number in millseconds
    hours: (hours) => (1000 * 60 * 60) * (hours ? hours : 1),
    //return one minute or mins number in millseconds
    minutes: (mins) => (1000 * 60) * (mins ? mins : 1),
    //return one second or secs number in millseconds
    seconds: (secs) => (1000) * (secs ? secs : 1),
  },
  dates: {
    //timeOffset = the hours of the coutry in UTC like +2 for EG, +3 for KSA
    getCountryTime: function (countryTimeOffset) {
      const d = new Date();
      const localTime = d.getTime();
      const localOffset = d.getTimezoneOffset() * 60000;
      const utc = localTime + localOffset;
      const Country = utc + (3600000 * countryTimeOffset);
      return new Date(Country).toLocaleString();
    },
    KsaTime: () => handlers.dates.getCountryTime(3), // UTC of Riyadh (Saudi Arabia) is +03.00
    EgTime: () => handlers.dates.getCountryTime(2), // UTC of Egypt is +02.00
  }
}
module.exports = { ...handlers }