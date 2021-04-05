const fetch = require(`node-fetch`);
const { DateTime } = require("luxon");

const Trail = require('../db/models/Trails');
const weatherConfig = require(`../../config/config.js`);
const WEATHERAPIKEY = weatherConfig.weather.apiKey;
const WEATHERAPIKEYTWO = weatherConfig.weather.apiKey2;

let lat;
let long;
//const weatherAPI = `https://api.openweathermap.org/data/2.5/onecall?`;
const newWeatherAPI = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search`

module.exports = {
    getTrailHeads
}

// fetch all trails from DB and store the coordinates in an array 
function getTrailHeads() {
    let trailCoords = [];
    let names = []
    return new Trail()
    .fetchAll()
    .then(result => {
        result = result.toJSON()
        result.map(element => {
            names.push(element.trailname)
            trailCoords.push(element.coordinates);
        })
        fireWeatherAPI(trailCoords, names);
    })
}

// function getTrailHeads(){
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
function fireWeatherAPI (arr, arr2) {
    let lat;
    let long;
    let name;
    arr.map((element, i) => {
      name = arr2[i]
      lat = element[1];
      long = element[0];
     getWeatherData(lat, long, name);
    });
  };


  async function getWeatherData(lat, long, name) {
      
      const newWeatherAPIEndpoint = `${newWeatherAPI}?apikey=${WEATHERAPIKEYTWO}%20&q=${lat}%2C${long}`
    try {
        const value = await fetch(newWeatherAPIEndpoint)
       // console.log('fired weather API');
        const weather = await value.json()
       
        console.log(weather.Key, 'booooooop', name)
        // let hourly = weather.hourly
        // hourly.forEach(hour =>{
            
        //     // let dt = DateTime.fromMillis(hour.dt)
        //     // //dt.toLocaleString(DateTime.DATE_SHORT);
        //     // console.log(dt.c)
            
        // })
       // console.log(weather.hourly.rain)
    } catch (error) {
        console.log('ERR', error)
    }

  }