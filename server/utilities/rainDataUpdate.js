const fetch = require(`node-fetch`);

const Trail = require('../db/models/Trails');
const WEATHERAPIKEYTWO = process.env.WEATHER_TWO


let lat;
let long;

const rainAPI = `http://dataservice.accuweather.com/currentconditions/v1/`

module.exports = {
    getTrailKeys
}

global.hikeNow = {};
global.hikeNow.rain = {};

// fetch all trails and get all rain keys (there are a lot of duplicates)
function getTrailKeys() { 
    console.log('rain data')
    const keySet = new Set()
    return new Trail()
    .fetchAll()
    .then(result => {
        result = result.toJSON()
        result.map(trail => {
            keySet.add(trail.rain) // add each key to a set, since there are duplicates only one of each will be added
        })
      singleOutKeys(keySet)
    }).catch(err => console.log('rainData: err on getting keys from DB', err))
}

function singleOutKeys(set){
    let keyArr = [...set] // turn set back into array so i can loop through and call the rain api to get data
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
    } catch (error) {
        console.log('rainApi: error on calling rainAPI', error)
    }

  }