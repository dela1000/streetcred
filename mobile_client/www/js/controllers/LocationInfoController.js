angular.module('app.LocationInfoController', [])
.controller('LocationInfoController', function($scope, $stateParams, LocationInfoFactory){
  // $scope.currentLocation = 1;
  $scope.$on('$ionicView.enter', function($scope){
    console.log('inside event callback')
    console.log('$stateParams.currentLocation', $stateParams.currentLocation)
    $scope.mapID = $stateParams.currentMap; //mapid
    $scope.currentLocation = $stateParams.currentLocation;
    locationInfo();
  })
  function locationInfo(){
    // console.log("inside locaitoninfo")
    // console.log($scope.currentLocation, "$scope.currentLocation")
    LocationInfoFactory.locationInfo($scope.currentLocation)
    .then(function(data){
      console.log(data)
      $scope.mapData = data;
    }, function(err){
      console.log(err);
    })
  }
});