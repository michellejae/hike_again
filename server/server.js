//MODULES
const express = require('express');
const app = express();
const path = require('path');

const fakeGoodData = require('./utilities/fakeData/fakeGoodData');
const fakeAllData = require('./utilities/fakeData/fakeAllData');
const fakeSingleData = require('./utilities/fakeData//fakeSingleData');
const Trail = require(`./db/models/Trails`);
const { getTrails } = require('./routes/trails');
const { getTrailHeads} = require('./utilities/weatherData.js');
const { updateTrailsWithRainKey } = require('./utilities/updateTrailsTableOnDb');
const { getTrailKeys } = require('./utilities/rainDataUpdate');


 
//CONSTANTS
const PORT = process.env.PORT  || 3000;


//APPLICATIONS
app.use(express.json());
app.use(express.urlencoded({extended: false }));


app.use(express.static(path.join(__dirname, '..', 'src/public')));

// read through the all trails request to understand how i'm sending data to FE
app.get('/api/hikeNow/trail/:name', (req, res) => {
  let name = req.params.name
  return new Trail()
  .where({trailname: name})
  .fetch()
  .then(singleTrail => {
    singleTrail = singleTrail.toJSON()
    return singleTrail
  }).then(finalSingleTrail => {
    const trailWeather = global.hikeNow.weather[finalSingleTrail.weather]
    finalSingleTrail.weather = trailWeather
    const rainWeather = global.hikeNow.rain[finalSingleTrail.rain]
    finalSingleTrail.rain = rainWeather
    return res.json(finalSingleTrail)
  }).catch(err =>{
    console.log(err)
  })
})



app.get('/api/hikeNow/all', (req, res) => {
  return new Trail()
  .fetchAll()
  .then(allTrails => {
    allTrails = allTrails.toJSON()
    return allTrails
  }).then(trails => {
    //loop through all the trails to play with data
     trails.forEach(trail => {    
       // using the weather property on each trail (which is the longitude) grab the weather for 
       // that corresponding longitude property on  global.hikNow.weather, save it to trailWeather
      const trailWeather = global.hikeNow.weather[trail.weather]
      // change the trail.weather property to be the weather details you just saved to trailWeather
      trail.weather = trailWeather
      // same thing as above just with rain ID vs longitude
      const rainWeather = global.hikeNow.rain[trail.rain]
      trail.rain = rainWeather
      // return each trail with update rain and weather details (this does not SAVE to db)
      return trail
    })
    return trails
  }).then(allTrails => { 
    // send all trails to FE with updated weather and rain
    return res.json(allTrails)
  }).catch(err => {
    console.log(err)
  })
})  

app.get('/api/hikeNow/fakeData/trail/:name', (req, res) => {
  let name = req.params.name
  return res.json(fakeSingleData)
  })

  app.get('/api/hikeNow/fakeData/all', (req, res) => {
    return res.json(fakeAllData)
  })
// home page only shows good trails, and this is the call from home on FE
app.get('/api/hikeNow/fakeData', (req, res) => {
  return res.json(fakeGoodData)
})

// app.get('/', (req, res) => {
//     res.send('BOOOOP')
//   })
  
  app.get('/*', (req, res)=>{
    let options = {
      root: path.join(__dirname, '..', 'public')
    };
    res.sendFile('index.html', options);
  })


app.listen(PORT, () => {
    console.log(`SERVER IS LISTENING ON ${PORT}`);
   
    // IN THEORY WE SHOULD ONLY UPDATE THESE ONCE
    // put trails in db
    //getTrails();
    // add rain stations to trails db
    //updateTrailsWithRainKey()
  

    // fire off weahter api and save to global variable
   // getTrailHeads();
  
    // fire off rain api and save to global variable
    //getTrailKeys();
   
    // functions used when app is deployed to have set times to fire off weather and rain api's
   // timedRain();
    //timedWeather();
  
    // additional function for the total rain data per station over 24 hours
     // getRainTotalData();
  });

  