angular.module('App')
  .factory('AppFactory', function($http, $state){
    var login = function(username, password){
      console.log("+++ 4 authFactory.js Login")
      return $http ({
        method: 'POST',
        url: 'http://localhost:8000/login',
        data: {
          username: username,
          password: password
        }
      })
      .then(function(success){
        console.log("+++ 14 authFactory.js Success: ", success)
        if (success.status === 200) {
          $state.go('createNewMap') // THIS WILL REDIRECT TO HOME
        };
      }, function(err){
        console.log(err);
      })
    };
    var signup = function(username, password, email){
      return $http ({
        method: 'POST',
        url: '/signup',
        data: {
          username: username,
          password: password,
          email: email
        }
      })
      .then(function(success){
        $state.go('createNewMap') // THIS WILL REDIRECT TO HOME
      }, function(err){
        console.log(err);
      })
    };
    return{
      login: login,
      signup: signup
    }
  })
