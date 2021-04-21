const MAPKEY = 'AIzaSyAUGGgPrTK8muD5nJNGD0Twq9ZXGby8u7k';
const TrailCtrl = [`$scope`,`$routeParams`, `trailService`, `NgMap`,
function ($scope, $routeParams, trailService ) {

  let nameParams = $routeParams.name;
  //let navBarBurger = document.querySelector('#menuToggle')
  let navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('#menuToggle'), 0);
  //console.log(navBarBurger)
  
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

  $scope.burgerDrop = function () {
    let navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('#menuToggle'), 0);
    if(navbarBurgers.length > 0) {
      navbarBurgers.forEach(element => {
        element.addEventListener('click', function() {
          let target = element.dataset.target;
          let $target = document.getElementById(target);
          element.classList.toggle('is-active');
          $target.classList.toggle('is-active');
        })
      });
    }
  }

  // $scope.burgerDrop = function () {
  //   navBarBurger.addEventListener('click', function() {
  //     this.classList.toggle('is-active')
  //   })
  // }

  trailService.getSingleTrail(nameParams)
  .then(updatedTrail => {
    $scope.trail = updatedTrail
  })

  $scope.googleMapsUrl=`https://maps.googleapis.com/maps/api/js?key=${MAPKEY}&callback=initMap`;

  
}]

export default TrailCtrl

