var nureechCtrls = angular.module('nureechCtrls', []);

nureechCtrls.controller('mainCtrl', [
  '$scope',
  'reeches',
  'auth',
  function($scope, reeches, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;

    $scope.reeches = reeches.reeches;

    $scope.nuReech = function() {

      if (!$scope.body || $scope.body === '') { return; }
      else {
        reeches.create({
          body: $scope.body
        });
        $scope.body = '';
      }
    };


  }
]);

nureechCtrls.controller('authCtrl', [
  '$scope',
  '$state',
  'auth',
  function($scope, $state, auth) {
    $scope.user = {};

    $scope.register = function() {
      auth.register($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('home');
      });
    };

    $scope.logIn = function() {
      auth.logIn($scope.user).error(function(error) {
        $scope.error = error;
      }).then(function() {
        $state.go('home');
      });
    };
  }
]);

nureechCtrls.controller('navCtrl', [
  '$scope',
  'auth',
  function($scope, auth) {
    $scope.isLoggedIn = auth.isLoggedIn;
    $scope.currentUser = auth.currentUser;
    $scope.logOut = auth.logOut;
  }
]);
