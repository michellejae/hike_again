const fetch = require(`node-fetch`);


const Trail = require('../db/models/Trails');
const weatherConfig = require(`../../config/config.js`);
const WEATHERAPIKEY = weatherConfig.weather.apiKey;


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
    global.hikeNow.weather = {};
    let trailCoords = [];
    return new Trail()
    .fetchAll()
    .then(result => {
        result = result.toJSON()
        result.map(element => {
            trailCoords.push(element.coordinates);
        })
        fireWeatherAPI(trailCoords)
    })
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

// probably did not need this but ahd it from OG project, but each set of coords in trailCoords
// are in an array so just mapping through to grab each element
function fireWeatherAPI (arr) {
    let lat;
    let long;
    arr.map((element) => {
      long = element[0];
      lat = element[1];
      getWeatherData(lat, long);
    });
  };


  async function getWeatherData(lat, long) {
      const newWeatherAPIEndpoint = `${weatherAPI}${lat}%2C%20${long}?unitGroup=us&key=${WEATHERAPIKEY}&include=current`
    try {
        const value = await fetch(newWeatherAPIEndpoint)
       // console.log('fired weather API');
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
        console.log(global.hikeNow.weather)
    } catch (error) {
        console.log('ERR', error)
    }

  }