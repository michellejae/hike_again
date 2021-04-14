import angular from 'angular';
import ngRoute from 'angular-route';
//import NgMap from 'ngmap';


//import TrailCtrl from '../controller/trail.controller';
//import trailService from '../services/trailDataService';
import HomeCtrl from '../controller/home.controller'
import homeService from '../services/homeService'
import AllTrailCtrl from '../controller/allTrails.controller';
import allTrailsService from '../services/allTrailsService';


require('../sass/app.scss');

// class AppCtrl {
//   constructor() {
//     this.url = 'https://github.com/preboot/angular-webpack';
//   }
// }

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [ngRoute])
  //.controller('AppCtrl', AppCtrl)
  .controller('HomeCtrl', HomeCtrl)
  //.controller('TrailCtrl', TrailCtrl)
  .controller('AllTrailCtrl', AllTrailCtrl)
  .service('homeService', homeService)
  //.service('trailService', trailService)
  .service('allTrailsService', allTrailsService)

  .config(['$routeProvider', '$locationProvider', ($routeProvider, $locationProvider) => {
   $locationProvider.hashPrefix('');
    $routeProvider
      .when(`/`, {
        templateUrl: 'views/home.html',
        controller: 'HomeCtrl'
      })
      .when('/boop', {
        // if i try to go to this route directly in URL it will not work, must do #/boop unless i enable html5mode to true. 
        templateUrl: 'views/allTrails.html',
        controller: 'AllTrailCtrl'
      })
    //   .when(`/trail/:name`, {
    //     templateUrl: `views/trail.html`,
    //     controller: 'TrailCtrl'
    //   })
      .otherwise({
        templateUrl: `views/notFound.html`
      })
      $locationProvider.html5Mode({
        enabled: true,
        requireBase: true// if i do not type in false make sure to put a base in index file. read note in notion though
 });
  }])

export default MODULE_NAME;