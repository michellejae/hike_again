const allTrailService = ['$http', function ($http) {
  const trailHeads = [];
  const allTrails = [];

  this.getAllTrails = function () {
    return allTrails;
  }

  this.getTrailHeadCoordinates = function () {
    return trailHeads;
  }

  this.fetchAllTrails = function () {
    return $http.get('/api/hikeNow/fakeData/all')
    .then(data => {
      data.data.map(element => {
        allTrails.push(element);
      })
      this.setTrailStatus(allTrails);
    })
    .catch(err => {
      console.log(err)
    })
  }

  this.setTrailStatus = function (arr) {
    arr.map(element => {
      let km = (element.length_m * 1.60934).toFixed(2);
      element.length_km = km;
      if(element.weather && element.rain ){
        if(element.weather.windSpeed < 25 && element.rain.rainfall < .4999) {
          element.status = 'GOOD';
        }
        if(element.weather.windSpeed >= 25 && element.weather.windSpeed <= 46 || element.rain.rainfall >= .5 && element.rain.rainfall <= 1) {
          element.status = 'CAUTION';
        }
        if(element.weather.windSpeed > 46 && element.rain.rainfall > 1) {
          element.status = 'DANGER';
        }
        if(element.weather.windSpeed < 25 && element.rain.rainfall >1){
          element.status = 'CAUTION'
        }
        if(element.weather.windSpeed > 46 && element.rain.rainfall <.4999){
          element.status = 'DANGER'
        }
      }else{
        element.status = 'UNKNOWN';
      }
    })
    this.setTrailHeads(arr);
  }

  this.setTrailHeads = function (arr) {
    arr.map(element => {
      trailHeads.push({
        id: element.id,
        trailname: element.trailname,
        status: element.status,
        length_m: element.length_m,
        length_km: element.length_km,
        coordinates: element.coordinates
      });
    });
  }

}];

export default allTrailService;