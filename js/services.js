/**
 * ~,;#;#6 * Created by clay on 02/08/14.
 */

'use strict';

tabata.service('userService', [function(){
    var userData    = {};
    return {
        setUserData: function(data){
            userData = data;
        },
        getUserData: function () {
            return userData;
        }
    };
}]);


tabata.service('exerciseService', ['$resource', function($resource){
    var exerciseData    = {};
    return {
        setExerciseData: function(data){
            exerciseData = data;
        },
        getExerciseData: function () {
            return exerciseData;
        },
        getInitialData: function() {
            var getData = $resource('json/exercise.json');
            var user    = getData.get({}, function() {
                user.$save();
            });
            return user;
        }
    };
}]);

tabata.service('counterService', [function(){
    var aCounter = function(counter) {
        this.count = counter;
        this.increment = function(x) {
            this.count += x;
        };
        this.decrease = function(x) {
            if(this.count > 1){
                this.count -= x;
            }
        };
    }
    return {
        setInstance: function (counter) {
            return new aCounter(counter);
        }
    };
}]);
