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
    getTrailKeys
}

// fetch all keys from Trails but not duplicates
// function getTrailKeys() {
//     return new Trail()
//     .fetchAll({columns: ['rain']})
//     .then(result => {
//         result = result.toJSON()
//         const mySet = new Set(result.rain)
//         let keys = [...mySet]
       
//     }).catch(err => console.log('err on getting keys', err))
// }


function getTrailKeys() {
    const keySet = new Set()
    return new Trail()
    .fetchAll()
    .then(result => {
        result = result.toJSON()
        result.map(trail => {
            keySet.add(trail.rain)
        })
        console.log(keySet)
    }).catch(err => console.log('err on getting keys', err))

    
}





    // get last 1hr rain data for each key

  async function getWeatherData(key) {
      
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