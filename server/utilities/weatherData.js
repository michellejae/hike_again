const fetch = require(`node-fetch`);


const Trail = require('../db/models/Trails');
const WEATHERAPIKEY = process.env.WEATHER_ONE


let lat;
let long;
 

 const weatherAPI = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;

module.exports = {
    getTrailHeads
}

global.hikeNow = {};
//global.hikeNow.weather = {};

// fetch all trails from DB and store the coordinates in an array 
function getTrailHeads() { 
    console.log('weather data')
    global.hikeNow.weather = {};
    return new Trail()
    .fetchAll()
    .then(result => {
        result = result.toJSON()
        result.map(element => {
            long = element.coordinates[0]
            lat = element.coordinates[1]
            getWeatherData(lat, long)
        })
    }).catch(err => console.log('weatherData: err on getting lat/long', err))
}

// use when first testing api responses and don't want to call all 46 trails each time
// function getTrailHeads(){
//     global.hikeNow.weather = {};
//     let tn = `Manoa Falls Trail`;
//     return new Trail()
//     .where({trailname: tn})
//     .fetch()
//     .then(singleTrail =>{
//         singleTrail = singleTrail.toJSON()
//         return singleTrail
//     }).then(coords => {
//         long = coords.coordinates[0]
//         lat = coords.coordinates[1]
//         getWeatherData(lat, long)
//     })
// }

// fire off weather api to get data per the lat and long of each trail, save it to the global.weather based on each long
  async function getWeatherData(lat, long) {
      const newWeatherAPIEndpoint = `${weatherAPI}${lat}%2C%20${long}?unitGroup=us&key=${WEATHERAPIKEY}&include=current`
    try {
        const value = await fetch(newWeatherAPIEndpoint)
        const weather = await value.json()
    
        global.hikeNow.weather[weather.longitude] = {
            longitude: weather.longitude,
            observationTime: Date(weather.currentConditions.datetimeEpoch),
            summary: weather.currentConditions.conditions,
            weatherIcon: weather.currentConditions.icon,
            temp: weather.currentConditions.temp,
            realFeel: weather.currentConditions.feelslike,
            humidity: weather.currentConditions.humidity,
            windSpeed: weather.currentConditions.windspeed,
            windGust: weather.currentConditions.windgust,
            windDirections: weather.currentConditions.winddir,
            sunrise: weather.currentConditions.sunrise,
            sunset: weather.currentConditions.sunset
        }
       // console.log(global.hikeNow.weather)
    } catch (error) {
        console.log('weatehrData: calling weather API', error)
    }

  }