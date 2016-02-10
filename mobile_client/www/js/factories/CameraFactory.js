angular.module('app.PhotoFactory', [])
  .factory('Photo', photo);

function photo($http, $q, $ionicPopup) {

  var url;
  // url = 'http://localhost:8000';
  url = 'http://still-sands-90078.herokuapp.com'
  // url = 'http://makertrails.herokuapp.com'

  var storeImage = function(locationId, userId, imageData) {
    $http({
        method: 'POST',
        url: url + '/photos',
        data: {
          locationId: locationId,
          userId: userId,
          photoData: imageData
        }
      })
      .then(function(photoAdded) {
        $ionicPopup.alert({
          title: 'Photo added'
        })
      },
      function (err) {
        $ionicPopup.alert({
          title: 'Photo failed'
        })
      }
      )
  };

  var retrievePhotos = function (locationId) {
    return $http({
      method: 'GET',
      url: url + '/photos?locationId=' + locationId
    })
    .then(function (locationPhotos) {
      return locationPhotos
    },
    function (err) {
      $ionicPopup.alert({
          title: 'Photo didn\'t load'
        })
    }
    )

  };

  return {
    storeImage: storeImage,
    retrievePhotos: retrievePhotos
  }
}

