'use strict';

angular.module('app.views.home', [])

    .config(['$stateProvider', function($stateProvider) {
            $stateProvider.state('home', {
                url : "/home",
                templateUrl: 'views/home/home.html',
                controller: 'homeCtrl'
            });
    }])
    .controller('homeCtrl', ['$scope','AuthService','UserDao','SiteDao','$q',
        function ($scope,AuthService, UserDao, SiteDao, $q) {
            var vm = this;

            function _getSiteOwner(users,ownerId){
                return _.findWhere(users,{id : ownerId}).name;
            }
            function _getData() {
                $q.all([UserDao.getAll() , SiteDao.getAll()]).then(function(results){
                    $scope.vm.users = results[0];
                    $scope.vm.sites = results[1];
                    for (var i = 0; i < $scope.vm.sites.length; i++){
                        if ($scope.vm.sites[i].owner){
                            $scope.vm.sites[i].ownerName = _getSiteOwner($scope.vm.users,$scope.vm.sites[i].owner.id);
                        }
                    }
                });
            }
            function _init(){
                $scope.vm = {};
                $scope.vm.newSite = {};
                $scope.vm.sites = [];
                $scope.vm.users = [];
                _getData();
            }

            $scope.saveSiteUrl = function(){
                SiteDao.create($scope.vm.newSite).then(
                    function(response){
                        // success
                        response.ownerName =  _getSiteOwner($scope.vm.users,response.owner);
                        $scope.vm.newSite = {};
                        $scope.vm.sites.unshift(response);
                        $scope.siteForm.$setPristine();
                        $scope.siteForm.$setUntouched()
                    }, function(){
                        // error
                    });
            };

            _init();

        }
    ]);