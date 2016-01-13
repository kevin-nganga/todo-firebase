'use strict';

/**
 * @ngdoc function
 * @name todoFirebaseApp.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the todoFirebaseApp
 */
angular.module('todoFirebaseApp')
  .controller('loginCtrl', function ($scope, authentication) {

    $scope.login = function(){
      authentication.login($scope.user);
    }

    $scope.logout = function(){
      authentication.logout();
    }

  });
