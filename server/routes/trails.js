const Trail = require(`../db/models/Trails`);
const fetch = require(`node-fetch`);

const singelHikingAPI = `https://opendata.arcgis.com/datasets/cf7b203f7f1a4d00ac1e126665ba8ac1_34.geojson?where=island%20%3D%20'Oahu'%20AND%20trailname%20%3D%20'Ualakaa%20Trail'`

const hikingApi = `https://opendata.arcgis.com/datasets/cf7b203f7f1a4d00ac1e126665ba8ac1_34.geojson?where=island%20%3D%20'Oahu'`;

module.exports = {
    getTrails
}

async function getTrails() {
    try {
        const value = await fetch(hikingApi);
        console.log('fired trails API')
        const json = await value.json();
        const features = json.features

        features.forEach(element => {
           // function to save data to DB
            saveTrailsToDb(element, element.properties.trailname)
        })
        
    } catch (error) {
        console.log('ERR', error)
    }
}

function saveTrailsToDb(element) {
    // check which trails have three nested arrays in the coordinates property
    // if so, when data gets saved to DB below we grab one more [0]
   let coords = Array.isArray(element.geometry.coordinates[0][0])

      
    return new Trail ({
        district: element.properties.district,
        length_m: element.properties.length_mi,
        elev_range: element.properties.elev_range,
        climat: element.properties.climate,
        tspt_type: element.properties.tspt_type,
        feature: element.properties.features,
        amenitie: element.properties.amenities,
        use_rest: element.properties.use_rest,
        hazard: element.properties.hazards,
        trailname: element.properties.trailname,
        coordinates: coords ? JSON.stringify(element.geometry.coordinates[0][0]) : JSON.stringify(element.geometry.coordinates[0]),
        weather: coords ? JSON.stringify(element.geometry.coordinates[0][0][0]) : JSON.stringify(element.geometry.coordinates[0][0]),
        rain: 0,
        standard: element.properties.standard
      }).save()
}

