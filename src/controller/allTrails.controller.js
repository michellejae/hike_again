const MAPKEY = require('../../config/config');
const AllTrailsCtrl = ['$scope','allTrailsService', function ($scope, allTrailsService){
    console.log('allTrails Controller')

  let t = true;
  let f = false;

  $scope.Metric = function () {
    f = true;
    t = false;
    return f;
  }
  
  $scope.Imperial = function () {
    t = true;
    f = false;
    return t;
  }

  $scope.onM = function () {
    return f;
  }

  $scope.onI = function () {
    return t;
  }

  //Load All Trails
  allTrailsService.fetchAllTrails();

  //Set Trails To Scope
  $scope.trails = allTrailsService.getAllTrails();
  //Set trailHeads to scope var to plot markers
  $scope.trailHeads = allTrailsService.getTrailHeadCoordinates();

  //Display or not to display
  let b = false;
  $scope.selected = function () {
    return b;
  }

  //Set selectedHike to scope to display selected marker
  $scope.showInfo = function (event,name) {
    $scope.selectedHike = $scope.trailHeads.filter(function(c){
      return c.trailname === name;
    })[0];
    b = true;
    $scope.selected();
  };

  //Google Map
  $scope.googleMapsUrl=`https://maps.googleapis.com/maps/api/js?key=${MAPKEY.map.key}&callback=initMap`;

}];

export default AllTrailsCtrl;