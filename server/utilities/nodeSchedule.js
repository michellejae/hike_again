const schedule = require('node-schedule');
const { getTrailHeads } = require('./weatherData');
const { getTrailKeys } = require('./rainDataUpdate');

module.exports = {
    timedRain,
    timedWeather
}

function timedWeather(){
    cron.scheduleJob({ rule:'0, 0, 6,9,12,15 * * *'}, getTrailHeads)
  
  }
  
  function timedRain() {
    cron.scheduleJob({ rule:'0, 0, 6,9,12,15 * * *'}, getRainData)
  }