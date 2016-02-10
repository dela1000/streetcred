angular.module('app.LocationInfoController', ['ionic.rating'])
.controller('LocationInfoController', function($scope, $stateParams, Photo, LocationInfoFactory, LoginFactory, Reviews, $cordovaCamera, $ionicModal){

  $scope.mapID = $stateParams.currentMap;
  $scope.currentLocation = $stateParams.currentLocation;
  $scope.userID = LoginFactory.userId();
  $scope.submitNewReview = {};
  $scope.rating = {};
  $scope.rating.rate = 3;
  $scope.rating.max = 5;

  $scope.$on('$ionicView.enter', function($scope){
    retrievePhotos();
    retrieveReviews();
    locationInfo();
  });

  function locationInfo(){
    LocationInfoFactory.locationInfo($scope.currentLocation)
    .then(function(data){
      console.log(data)
      $scope.mapData = data;
    }, function(err){
      console.log(err);
    })
  };

  $scope.takePicture = function() {
    var options = {
      quality : 100,
      destinationType : Camera.DestinationType.DATA_URL,
      sourceType : Camera.PictureSourceType.CAMERA,
      allowEdit : true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 300,
      targetHeight: 300,
      popoverOptions: CameraPopoverOptions,
      saveToPhotoAlbum: true,
      correctOrientation:true
    };

    $cordovaCamera.getPicture(options)
    .then(function(imageData) {
      var imgURI = "data:image/jpeg;base64," + imageData;
      Photo.storeImage($scope.currentLocation, $scope.userID, imgURI)
      $scope.locationPhotos.push({"link": imgURI})
    }, function(err) {
        // An error occured. Show a message to the user
    });
  }

  function retrievePhotos() {
    Photo.retrievePhotos($scope.currentLocation)
    .then(function (locationPhotos) {
      $scope.locationPhotos = locationPhotos.data
    })
  }

  function retrieveReviews () {
    Reviews.retrieveReviews($scope.currentLocation, $scope.userID) // the "1" needs to become the locationId
    .then(function (locationReviews) {
      $scope.locationReviews = locationReviews.data.map(function(item){
        item.createdAt = moment(item.createdAt).format('MMMM Do YYYY, h:mm a');
        return item;
      })
      $scope.locationReviews.sort(function(a, b){
        if(a.updatedAt < b.updatedAt){
          return 1;
        }
        if(a.updatedAt > b.updatedAt){
          return -1
        }
        return 0;
      });
    })
  }

  $scope.submitReview = function(){
    $scope.currentLocation = $stateParams.currentLocation;
    Reviews.submitReview($scope.submitNewReview.text, $scope.currentLocation, $scope.userID, $scope.rating.rate)
    .then(function () {
      console.log($scope.rating.rate, '$scope.rating.rate')
      $scope.submitNewReview.text = '';
      $scope.rating.rate = 3;
      retrieveReviews();
    })
  };

  //gallery functions
  function createImageGalleryModal() {
    $ionicModal.fromTemplateUrl('templates/imageGalleryModal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    })
    .then(function(modal) {
      $scope.modal = modal;
      $scope.modal.show();
    })
  }

  $scope.showImageGallery = function(index) {
    $scope.activeSlide = index;
    createImageGalleryModal();
  };

  $scope.closeImageGallery = function() {
    $scope.modal.hide();
    $scope.modal.remove();
  };
});
