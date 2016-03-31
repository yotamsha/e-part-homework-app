'use strict';

angular.module('app.views.home', ['app.vendors.momentjs'])

    .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('home', {
                url : "/home",
                templateUrl: 'views/home/home.html',
                controller: 'homeCtrl'
            });
    }])

    .controller('homeCtrl', ['$scope','AuthService',
        function ($scope,AuthService) {
            var vm = this;
            $scope.logout = function(){
                AuthService.logout();
            };
        }
    ]);
