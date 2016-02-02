angular.module("App", [
  'ui.router',
  'App.login',
  'App.signup',
  'App.createMap'
  ])
  .config(function($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('login',{
        url: '/login',
        templateUrl: 'templates/login.html',
        controller: 'LoginController',
        authenticate: false
      })
      .state('signup',{
        url:'/signup',
        templateUrl: 'templates/signup.html',
        controller: 'SignupController',
        authenticate: false
      })
      .state('createNewMap',{
        url:'/createNewMap',
        templateUrl: 'templates/createMap.html',
        controller: 'MapController',
        authenticate: true
      })
    $urlRouterProvider
      .otherwise('/login');
  })

  .run(function ($rootScope, $state, AppFactory) {
    $rootScope.$on("$stateChangeStart", function(event, toState){
      // debugger;
      console.log("+++ 34 app.js toState.authenticate: ", toState.authenticate)
      if (!toState.authenticate){
        return
      } else {
        event.preventDefault();
        if (AppFactory.authenticateFunction()) {
          toState.authenticate = false;
          $state.go(toState.name)
        };

      }

    });
});
