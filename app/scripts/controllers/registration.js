'use strict';

/**
 * @ngdoc function
 * @name todoFirebaseApp.controller:RegistrationCtrl
 * @description
 * # RegistrationCtrl
 * Controller of the todoFirebaseApp
 */
angular.module('todoFirebaseApp')
  .controller('registrationCtrl', function ($scope, authentication) {

    $scope.register = function(){
      authentication.registration($scope.user);
    }

  });
