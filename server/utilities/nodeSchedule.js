const cron = require('node-schedule');
const { getTrailHeads } = require('./weatherData');
const { getTrailKeys } = require('./rainDataUpdate');

module.exports = {
    timedRain,
    timedWeather
}

function timedWeather(){
  console.log('timed weather')
    cron.scheduleJob({ rule:'0, 0, 6,9,12,15 * * *'}, getTrailHeads)
  
  }
  
  function timedRain() {
    console.log('time rain')
    cron.scheduleJob({ rule:'0, 0, 6,9,12,15 * * *'}, getTrailKeys)
  }