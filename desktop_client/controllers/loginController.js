angular.module('App.login', [])
  .controller('LoginController', function($scope, $http, AppFactory){
    $scope.login = function(){
      console.log("+++ 4 loginController.js Here")
      AppFactory.login($scope.username, $scope.password)
    }
  });
