/**
 * Created by clay on 02/08/14.
 */

'use strict';

tabata.controller('loginCtrl',['$scope', 'userService', '$log', '$location', function($scope,userService,$log,$location){

    $scope.userForm = function(form) {

        if(form.$valid) {
            userService.setUserData($scope.login);
            $location.path('exercise');
        } else {
            $scope.submitted = true;
        }
    };

}]);

tabata.controller('exerciseCtrl',['$scope', 'exerciseService', '$location', '$log', function($scope,exerciseService,$location,$log){

    $scope.exercises = exerciseService.getExerciseData();
    exerciseService.getInitialData();
    if($scope.exercises.length <= 0 || typeof $scope.exercises.length === 'undefined') {
        $scope.exercises = exerciseService.getInitialData();
    }
    $scope.addExercise  = function() {
        $scope.exercises.exercises.push({name:''});
    }
    $scope.removeExercise = function(exercise) {
        $scope.exercises.exercises.splice(exercise, 1);
    }
    $scope.$watch('exercises.exercises', function(data) {
        if(data.length <= 0 || typeof data.length === 'undefined') {
            $scope.isExercise = false;
        } else {
            $scope.isExercise = true;
        };
    }, true);
    $scope.exerciseForm = function(form) {

        if(form.$valid) {
            exerciseService.setExerciseData($scope.exercises.exercises);
            $location.path('timing');
        } else {
            $scope.submitted = true;
        }

    }
}]);

tabata.controller('timingCtrl',['$scope', '$log','counterService', 'userService', 'exerciseService', function($scope,$log,counterService,userService,exerciseService){
    $scope.exerciseDuration = counterService.setInstance(25);
    $scope.exerciseBreak    = counterService.setInstance(10);
    $scope.exerciseRepeat   = counterService.setInstance(2);
    $scope.userData         = userService.getUserData();
    $scope.exercisesData    = exerciseService.getExerciseData();
    $scope.name             = $scope.userData.name + ' ' + $scope.userData.surname;
    $scope.email            = $scope.userData.email;
    $scope.totalTime        = $scope.exerciseDuration.count*$scope.exercisesData.length*$scope.exerciseRepeat.count;
    $scope.totalTimeMin     = decimalPlaces($scope.totalTime/60);
    $scope.$watch('exerciseDuration', function(newVal, oldVal){
        $scope.totalTime    = $scope.exerciseDuration.count*$scope.exercisesData.length*$scope.exerciseRepeat.count;
        $scope.totalTimeMin = decimalPlaces($scope.totalTime/60);
    }, true);
    $scope.$watch('exerciseRepeat', function(newVal, oldVal){
        $scope.totalTime    = $scope.exerciseDuration.count*$scope.exercisesData.length*$scope.exerciseRepeat.count;
        $scope.totalTimeMin = decimalPlaces($scope.totalTime/60);
    }, true);
    function decimalPlaces(totalTime){
        return parseFloat(totalTime).toFixed(2);
    };
}]);