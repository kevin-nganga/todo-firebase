'use strict';

/**
 * @ngdoc service
 * @name todoFirebaseApp.authentication
 * @description
 * # authentication
 * Service in the todoFirebaseApp.
 */
angular.module('todoFirebaseApp')
  .factory('authentication',['$rootScope','$state','$firebaseAuth','$firebaseObject','FIREBASE_URL',
    function ($rootScope,$state,$firebaseAuth,$firebaseObject,FIREBASE_URL) {

      var ref = new Firebase(FIREBASE_URL);
      var auth = $firebaseAuth(ref);

      /*Detecting Authentication events*/
      auth.$onAuth(function(authUser){
        if(authUser){
          var userRef = new Firebase(FIREBASE_URL + 'users/' + authUser.uid);
          var userObj = $firebaseObject(userRef);
          $rootScope.currentUser = userObj;
        } else {
          $rootScope.currentUser = '';
        }
      });

      var myObject = {

        /*Handle login*/
        login: function(user){
          auth.$authWithPassword({
            email: user.email,
            password: user.password
          }).then(function(regUser){
            $state.go('todo');
          }).catch(function(error){
            $rootScope.message = error.message;
          })
        }, /*login*/

        logout: function(){
          return auth.$unauth();
        }, // logout

        /*Controlling authentication on pages*/
        requireAuth: function(){
          return auth.$requireAuth();
        }, // requireAuth

        /*Handle registration*/
        registration: function(user){
          auth.$createUser({
            email: user.email,
            password: user.password
          }).then(function(regUser){

            /* Add user account details to user table */
            var regRef = new Firebase(FIREBASE_URL + 'users')
              .child(regUser.uid).set({
                date: Firebase.ServerValue.TIMESTAMP,
                regUser: regUser.uid,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email
              }); /*user info*/

            /*log user in after registration*/
            myObject.login(user);
          }).catch(function(error){
            $rootScope.message = error.message;
          })
        }, /*registration*/

        /*Handle register new task item*/
        addTodo: function(user){

        } /*new task Item*/

      }; /*myObject*/

      return myObject;

  }]);
