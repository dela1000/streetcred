angular.module('App.login', [])
  .controller('LoginController', function($scope, $http, $state, AppFactory){
    $scope.login = function(){
      // $state.go('createNewMap');
      AppFactory.login($scope.username, $scope.password)
    }
  });
