var nureechFactory = angular.module('nureechFactory', []);

nureechFactory.factory('auth', [
  '$http',
  '$window',
  function($http, $window) {
  var auth = {};
  var tokenId = 'nureech-token';

  auth.saveToken = function(token) {
    $window.localStorage[tokenId] = token;
  };

  auth.getToken = function() {
    return $window.localStorage[tokenId];
  };

  auth.isLoggedIn = function() {
    var token = auth.getToken();

    if (token) {
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };

  auth.currentUser = function() {
    if (auth.isLoggedIn()) {
      var token = auth.getToken();
      var payload = JSON.parse($window.atob(token.split('.')[1]));

      return payload.username;
    }
  };

  auth.register = function(user) {
    return $http.post('/register', user).success(function(data) {
      auth.saveToken(data.token);
    });
  };

  auth.logIn = function(user) {
    return $http.post('/login', user).success(function(data) {
      auth.saveToken(data.token);
    });
  };

  auth.logOut = function() {
    $window.localStorage.removeItem(tokenId);
  };

  return auth;
}]);

nureechFactory.factory('reeches', [
  '$http',
  'auth',
  function($http, auth) {
    var o = {
      reeches: []
    };
    o.getAll = function() {
      return $http.get('/reeches').success(function(data) {
        angular.copy(data, o.reeches);
      });
    };
    o.get = function(id) {
      return $http.get('/reeches' + id).then(function(res) {
        return res.data;
      });
    };
    o.create = function (reech) {
      return $http.post('/reeches', reech, {
        headers: {Authorization: 'Bearer ' + auth.getToken()}
      })
      .success(function(data) {
        o.reeches.push(data);
      });
    };

    return o;
}]);
