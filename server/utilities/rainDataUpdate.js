const fetch = require(`node-fetch`);
const { DateTime } = require("luxon");

const Trail = require('../db/models/Trails');
const weatherConfig = require(`../../config/config.js`);
const WEATHERAPIKEY = weatherConfig.weather.apiKey;
const WEATHERAPIKEYTWO = weatherConfig.weather.apiKey2;

let lat;
let long;

const rainAPI = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search`

module.exports = {
    getTrailHeads
}

// fetch all trails from DB and store the coordinates in an array 
function getTrailHeads() {

    return new Trail()
    .fetchAll()
    .then(result => {
        result = result.toJSON()
        result.map(element => {
            names.push(element.trailName)
            trailCoords.push(element.coordinates);
        })
        fireWeatherAPI(trailCoords, names);
    })
}





    // get last 1hr rain data for eacy key

  async function getWeatherData(lat, long, name) {
      
      const newWeatherAPIEndpoint = `${newWeatherAPI}?apikey=${WEATHERAPIKEYTWO}%20&q=${lat}%2C${long}`
    try {
        const value = await fetch(newWeatherAPIEndpoint)
       // console.log('fired weather API');
        const weather = await value.json()
       
        
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