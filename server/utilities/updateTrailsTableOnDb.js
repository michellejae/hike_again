const fetch = require(`node-fetch`);


const Trail = require('../db/models/Trails');
const weatherConfig = require(`../../config/config.js`);

const WEATHERAPIKEYTWO = weatherConfig.weather.apiKey2;

let lat;
let long;
let name;

const rainAPI = `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search`

module.exports = {
    updateTrailsWithRainKey
}

//IN THEORY WE ONLY RUN THIS ONCE, SIMLIAR TO GET TRAILS FUNCTION

// fetch all trails from DB and grab the coords and the name
function updateTrailsWithRainKey() {
    return new Trail()
    .fetchAll()
    .then(trails => {
        trails = trails.toJSON()
        trails.map(element => {
           name = element.trailname 
           long = element.coordinates[0]
           lat = element.coordinates[1]
           fireRainAPI(lat, long, name)
        })
    })
}

// call the rainAPI with each trails coords and get it's location key
async function fireRainAPI(lat, long, name){
    const newRainAPIEndpoint = `${rainAPI}?apikey=${WEATHERAPIKEYTWO}%20&q=${lat}%2C${long}`
    try {
        const value = await fetch(newRainAPIEndpoint)
        console.log('fired rain api to update rain in db')
        const data = await value.json()
        const key = data.Key
        //make sure to use await or it will fire before each key is grabbed
       await updateRainInDatabase(key, name)
        
    } catch (error) {
        console.log('ERR', error)
    }
}
// save each key with it's correstponding trail name to the db
async function updateRainInDatabase(key, name) {
    try {
        await Trail.where({trailname: name})
        .save({rain: key}, {patch:true})
        .catch(err => console.log(err))
    } catch (error) {
        console.log('anothererr', error)
    }

}





// probably did not need this but ahd it from OG project, but each set of coords in trailCoords
// are in an array so just mapping through to grab each element
// function fireWeatherAPI (arr, arr2) {
//     let lat;
//     let long;
//     let name;
//     arr.map((element, i) => {
//       name = arr2[i]
//       lat = element[1];
//       long = element[0];
//      getWeatherData(lat, long, name);
//     });
//   };


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