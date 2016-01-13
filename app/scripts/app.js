'use strict';

/**
 * @ngdoc overview
 * @name todoFirebaseApp
 * @description
 * # todoFirebaseApp
 *
 * Main module of the application.
 */
angular
  .module('todoFirebaseApp', [
    'firebase',
    'ui.router',
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])

  .constant('FIREBASE_URL','https://mytodofirebase.firebaseio.com/')

  /*detect authentication on pages*/

  .run(['$rootScope','$state', function($rootScope,$state){
    $rootScope.$on('$stateChangeError', function(event,next,previous,error){
      if(error == 'AUTH_REQUIRED'){
        $rootScope.message = 'Sorry you must log in to access that page';
        $state.go('#/login');
      } // AUTH REQUIRED
    }); // event info
  }]) // run

  .config(function ($stateProvider, $urlRouterProvider) {

    $urlRouterProvider.otherwise('login');

    $stateProvider
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'loginCtrl'
      })
      .state('register', {
        url: '/register',
        templateUrl: 'views/registration.html',
        controller: 'registrationCtrl'
      })
      .state('todo', {
        url: '/todo',
        templateUrl: 'views/todo.html',
        controller: 'todoCtrl',
        resolve: {
          currentAuth: function(authentication){
            return authentication.requireAuth();
          } // currentAuth
        } // resolve
      })

  });
