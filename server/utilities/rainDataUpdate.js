const fetch = require(`node-fetch`);

const Trail = require('../db/models/Trails');
const weatherConfig = require(`../../config/config.js`);
const WEATHERAPIKEY = weatherConfig.weather.apiKey;
const WEATHERAPIKEYTWO = weatherConfig.weather.apiKey2;

let lat;
let long;

const rainAPI = `http://dataservice.accuweather.com/currentconditions/v1/`

module.exports = {
    getTrailKeys
}

global.hikeNow = {};
global.hikeNow.rain = {};


function getTrailKeys() { 
    const keySet = new Set()
    return new Trail()
    .fetchAll()
    .then(result => {
        result = result.toJSON()
        result.map(trail => {
            keySet.add(trail.rain)
        })
        singleOutKeys(keySet)
    }).catch(err => console.log('err on getting keys', err))
}

function singleOutKeys(set){
    let keyArr = [...set]
    keyArr.forEach(key => {
       getRainData(key)
    })
}


    // get last 1hr rain data for each key and save to global.hikenow.rain
  async function getRainData(key) {
       const rainAPIEndpoint = `${rainAPI}${key}?apikey=${WEATHERAPIKEYTWO}&details=true`
    try {
        const value = await fetch(rainAPIEndpoint)

        const weather = await value.json()
       
        weather.forEach(element => {
            let time = Date(element.LocalObservationDateTime)
            let rain = element.Precip1hr.Imperial.Value
        
            global.hikeNow.rain[key] = {
                key: key,
                rainfall: rain,
                observationTime: time
            }
            
        })

        console.log(global.hikeNow.rain)
    } catch (error) {
        console.log('ERR', error)
    }

  }