'use strict';

angular.module('app.views.login', [])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('login', {
            url: "/login",
            templateUrl: 'views/login/login.html',
            controller: 'loginCtrl'
        });
    }])

    .controller('loginCtrl', ['$scope','AuthService', function ($scope, AuthService) {

        $scope.fbLogin = function(){

            AuthService.login("FACEBOOK");
        };

    }]);
