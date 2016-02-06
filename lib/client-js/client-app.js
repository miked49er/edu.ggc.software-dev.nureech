var app = angular.module('nureech', [
  'ui.router',
  'ngtimeago',
  'nureechFactory',
  'nureechCtrls'
]);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    $stateProvider
      .state('home', {
        url: '/home',
        templateUrl: '/templates/home.html',
        controller: 'mainCtrl',
        resolve: {
          postPromise: ['reeches', function(reeches) {
            return reeches.getAll();
          }]
        }
      })
      .state('reeches', {
        url: '/reeches/{id}',
        templateUrl: '/templates/reech.html',
        controller: 'reechesCtrl',
        resolve: {
          reech: ['$stateParams', 'reeches', function($stateParams, reeches) {
            return reeches.get($stateParams.id);
          }]
        }
      })
      .state('login', {
        url: '/login',
        templateUrl: '/templates/login.html',
        controller: 'authCtrl',
        onEnter: ['$state', 'auth', function($state, auth) {
          if (auth.isLoggedIn()) {
            $state.go('home');
          }
        }]
      })
      .state('register', {
        url: '/register',
        templateUrl: '/templates/register.html',
        controller: 'authCtrl',
        onEnter: ['$state', 'auth', function($state, auth) {
          if (auth.isLoggedIn()) {
            $state.go('home');
          }
        }]
      });

      $urlRouterProvider.otherwise('home');
  }
]);
