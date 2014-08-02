/**
 * Created by clay on 02/08/14.
 */

'use strict';

tabata.config(['$routeProvider',
    function($routeProvider) {
        $routeProvider.
            when('/', {
                templateUrl: 'views/login.html',
                controller: 'loginCtrl'
            }).
            when('/exercise', {
                templateUrl: 'views/exercise.html',
                controller: 'exerciseCtrl'
            }).
            when('/timing', {
                templateUrl: 'views/timing.html',
                controller: 'timingCtrl'
            }).
            otherwise({
                redirectTo: '/'
            });
    }]);
