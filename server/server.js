//MODULES
const express = require('express');
const app = express();

//const fakeGoodData = require('./utilities/fakeGoodData');
//const fakeAllData = require('./utilities/fakeData/fakeAllData');
const { getTrails } = require('./routes/trails');
const Trail = require(`./db/models/Trails`);
// const { getRainData} = require ('./utilities/rainData.js');
const { getTrailHeads} = require('./utilities/weatherData.js');
const { updateTrailsWithRainKey } = require('./utilities/updateTrailsTableOnDb');
const { getTrailKeys } = require('./utilities/rainDataUpdate');



//CONSTANTS
const PORT = process.env.PORT  || 3000;


//APPLICATIONS
app.use(express.json());
app.use(express.urlencoded({extended: false }));


//app.use(express.static(path.join(__dirname, '..', 'pubic')));
app.get('/api/hikeNow/all', (req, res) => {
  return new Trail()
  .fetchAll()
  .then(allTrails => {
    allTrails = allTrails.toJSON()
    
   // when returning to postman use this 
   return res.json(allTrails)
  })
})

app.get('/api/hikeNow/fakeData', (req, res) => {
    return res.json(fakeGoodData)
  })

  

app.get('/', (req, res) => {
    res.send('BOOOOP')
  })
  
  // when i'm ready to connect to front end. not sure why i need this and app.use(express.static)
//   app.get('/*', (req, res)=>{
//     let options = {
//       root: path.join(__dirname, '..', 'pubic')
//     };
//     res.sendFile('index.html', options);
//   })


app.listen(PORT, () => {
    console.log(`SERVER IS LISTENING ON ${PORT}`);
   
    // IN THEORY WE SHOULD ONLY UPDATE THESE ONCE
    // put trails in db
     //getTrails();
    // add rain stations to trails db
    //updateTrailsWithRainKey()
  

    // fire off rain api and save to global variable
   // getRainData();
  
    // fire off weather api and save to global variable
    // getTrailKeys();
   
    // functions used when app is deployed to have set times to fire off weather and rain api's
   // timedRain();
    //timedWeather();
  
    // additional function for the total rain data per station over 24 hours
     // getRainTotalData();
  });

  