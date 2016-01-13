'use strict';

/**
 * @ngdoc function
 * @name todoFirebaseApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the todoFirebaseApp
 */
angular.module('todoFirebaseApp')
  .controller('todoCtrl', function ($scope, authentication, $rootScope, $firebaseAuth, $firebaseArray, FIREBASE_URL ) {

    var ref = new Firebase(FIREBASE_URL);
    var auth = new $firebaseAuth(ref);

    auth.$onAuth(function(authUser){
      if(authUser){
        var todoRef = new Firebase(FIREBASE_URL + 'users/' + $rootScope.currentUser.$id + '/todo');
        var todoInfo = $firebaseArray(todoRef);

        $scope.todoList = todoInfo;

        $scope.newTask = function() {
          todoInfo.$add({
            task: $scope.newTodoList,
            date: Firebase.ServerValue.TIMESTAMP
          }).then(function(){
            $rootScope.newTodoList = '';
          })
        }; // add new todoList

        $scope.deleteTask = function(key){
          todoInfo.$remove(key);
        }; // delete task


      }  // authUser
    }); // check user authentication
  }); // controller
