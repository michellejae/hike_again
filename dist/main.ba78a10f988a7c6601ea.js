(self.webpackChunkhiking_redo=self.webpackChunkhiking_redo||[]).push([[179],{597:e=>{e.exports={database:{user:"hiker",password:"hike",database:"hikedb"},weather:{apiKey:"MRYVKG5TY5VFEEJZMX4F6RBMB",apiKey2:"5n6D86vKboDdYEPRWANeT2RHlThOp3LJ"},map:{key:"AIzaSyDNwvdAv0Mm1_MBi_r9nyYGZOkHPFShzLg"}}},765:(e,t,n)=>{"use strict";var a=n(695),r=n.n(a),i=n(944),l=n.n(i),o=n(564),s=n.n(o),c=n(597);const u=["$scope","$routeParams","trailService","NgMap",function(e,t,n){var a=t.name,r=(Array.prototype.slice.call(document.querySelectorAll("#menuToggle"),0),!0),i=!1;e.Metric=function(){return r=!1,i=!0},e.Imperial=function(){return i=!1,r=!0},e.onM=function(){return i},e.onI=function(){return r},e.burgerDrop=function(){var e=Array.prototype.slice.call(document.querySelectorAll("#menuToggle"),0);e.length>0&&e.forEach((function(e){e.addEventListener("click",(function(){var t=e.dataset.target,n=document.getElementById(t);e.classList.toggle("is-active"),n.classList.toggle("is-active")}))}))},n.getSingleTrail(a).then((function(t){e.trail=t})),e.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=".concat(c.map.key,"&callback=initMap")}];const h=["$http",function(e){var t={};this.getSingleTrail=function(n){var a=this;return e.get("/api/hikeNow/trail/".concat(n)).then((function(e){var n=e.data,a=(1.60934*n.weather.windSpeed).toFixed(2),r=(1.60934*n.length_m).toFixed(2),i=(.3048*n.elev_range).toFixed(2),l=(5*(n.weather.temp-32)/9).toFixed(0);return t.name=n.trailname,t.length_m=n.length_m,t.elev=n.elev_range,t.coordinates=n.coordinates,t.standard=n.standard,t.weather=n.weather,t.weather.temp=n.weather.temp.toFixed(0),t.weather.temp_c=l,t.rain=n.rain,t.weather.wind_kph=a,t.length_km=r,t.elev_range_m=i,t.sunrise=n.weather.sunrise,t.sunset=n.weather.sunset,n})).then((function(e){return a.setStatus(e),t}))},this.setStatus=function(e){return e.weather&&e.rain?(e.weather.windSpeed<24.9999&&e.rain.rainfall<.4999&&(t.status="GOOD"),(e.weather.windSpeed>=25&&e.weather.windSpeed<=46||e.rain.rainfall>=.5&&e.rain.rainfall<=1)&&(t.status="CAUTION"),e.weather.windSpeed>46&&e.rain.rainfall>1&&(t.status="DANGER"),e.windSpeed>73&&(t.status="HURRICANE"),e.weather.windSpeed<25&&e.rain.rainfall>1&&(t.status="CAUTION"),e.weather.windSpeed>46&&e.rain.rainfall<.4999&&(t.status="DANGER")):t.status="UNKNOWN",!0}}];const d=["$scope","homeService",function(e,t){t.fetchTrails(),e.trails=t.getTrails();var n=!0,a=!1;e.Metric=function(){return n=!1,a=!0},e.Imperial=function(){return a=!1,n=!0},e.onM=function(){return a},e.onI=function(){return n}}];const p=["$http",function(e){var t=[];this.getTrails=function(){return t},this.fetchTrails=function(){return e.get("/api/hikeNow").then((function(e){return e.data})).then((function(e){t.length&&(t.length=0),e.map((function(e){var n=(1.60934*e.length_m).toFixed(2),a={name:e.trailname,length:e.length_m,length_km:n,status:"GOOD"};t.push(a)}))})).catch((function(e){console.log(e)}))}}];var f=n(597);const m=["$scope","allTrailsService",function(e,t){console.log("allTrails Controller");var n=!0,a=!1;e.Metric=function(){return n=!1,a=!0},e.Imperial=function(){return a=!1,n=!0},e.onM=function(){return a},e.onI=function(){return n},t.fetchAllTrails(),e.trails=t.getAllTrails(),e.trailHeads=t.getTrailHeadCoordinates();var r=!1;e.selected=function(){return r},e.showInfo=function(t,n){e.selectedHike=e.trailHeads.filter((function(e){return e.trailname===n}))[0],r=!0,e.selected()},e.googleMapsUrl="https://maps.googleapis.com/maps/api/js?key=".concat(f.map.key,"&callback=initMap")}];const g=["$http",function(e){var t=[],n=[];this.getAllTrails=function(){return n},this.getTrailHeadCoordinates=function(){return t},this.fetchAllTrails=function(){var t=this;return e.get("/api/hikeNow/all").then((function(e){e.data.map((function(e){n.push(e)})),t.setTrailStatus(n)})).catch((function(e){console.log(e)}))},this.setTrailStatus=function(e){e.map((function(e){var t=(1.60934*e.length_m).toFixed(2);e.length_km=t,e.weather&&e.rain?(e.weather.windSpeed<25&&e.rain.rainfall<.4999&&(e.status="GOOD"),(e.weather.windSpeed>=25&&e.weather.windSpeed<=46||e.rain.rainfall>=.5&&e.rain.rainfall<=1)&&(e.status="CAUTION"),e.weather.windSpeed>46&&e.rain.rainfall>1&&(e.status="DANGER"),e.weather.windSpeed<25&&e.rain.rainfall>1&&(e.status="CAUTION"),e.weather.windSpeed>46&&e.rain.rainfall<.4999&&(e.status="DANGER")):e.status="UNKNOWN"})),this.setTrailHeads(e)},this.setTrailHeads=function(e){e.map((function(e){t.push({id:e.id,trailname:e.trailname,status:e.status,length_m:e.length_m,length_km:e.length_km,coordinates:e.coordinates})}))}}];n.e(203).then(n.bind(n,203));r().module("app",[l(),s()]).controller("HomeCtrl",d).controller("TrailCtrl",u).controller("AllTrailCtrl",m).service("homeService",p).service("trailService",h).service("allTrailsService",g).config(["$routeProvider","$locationProvider",function(e,t){t.hashPrefix(""),e.when("/",{templateUrl:"views/home.html",controller:"HomeCtrl"}).when("/all",{templateUrl:"views/allTrails.html",controller:"AllTrailCtrl"}).when("/trail/:name",{templateUrl:"views/trail.html",controller:"TrailCtrl"}).otherwise({templateUrl:"views/notFound.html"}),t.html5Mode({enabled:!0,requireBase:!0})}])}},e=>{"use strict";e.O(0,[216],(()=>{return t=765,e(e.s=t);var t}));e.O()}]);