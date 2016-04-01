'use strict';

angular.module('app.views.home', [])

    .config(['$stateProvider', function ($stateProvider) {
        $stateProvider.state('home', {
            url: "/home",
            templateUrl: 'views/home/home.html',
            controller: 'homeCtrl',
            resolve : {
                user : ['AuthService','$location','$q', function(AuthService, $location, $q){
                    var deferred = $q.defer();
                    AuthService.isAuthenticated().then(function(){
                        deferred.resolve();
                    }, function(){
                        // Not authenticated
                        $location.path('/login');
                        //deferred.reject();
                    });
                    return deferred.promise;
                }]
            }
        });
    }])
    .controller('homeCtrl', ['$scope', 'AuthService', 'UserDao', 'SiteDao', '$q',
        function ($scope, AuthService, UserDao, SiteDao, $q) {

            function _getSiteOwner(users, ownerId) {
                return _.findWhere(users, {id: ownerId}).name;
            }

            /**
             * Get relevant users and sites data.
             * @private
             */
            function _getData() {
                $q.all([UserDao.getAll(), SiteDao.getAll()]).then(function (results) {
                    $scope.vm.users = results[0];
                    $scope.vm.sites = results[1];
                    for (var i = 0; i < $scope.vm.sites.length; i++) {
                        if ($scope.vm.sites[i].owner) {
                            $scope.vm.sites[i].ownerName = _getSiteOwner($scope.vm.users, $scope.vm.sites[i].owner.id);
                        }
                    }
                });
            }

            /**
             * Init controller view model.
             * @private
             */
            function _init() {
                $scope.vm = {};
                $scope.vm.newSite = {};
                $scope.vm.loggedUser = AuthService.model().userSession.auth;
                $scope.vm.sites = [];
                $scope.vm.users = [];
                _getData();
            }

            /**
             * Creates a new site url in the server. if successful, add to view model.
             */
            $scope.saveSiteUrl = function () {
                SiteDao.create($scope.vm.newSite).then(
                    function (response) {
                        // success
                        var siteToAdd = response;
                        siteToAdd.ownerName = _getSiteOwner($scope.vm.users, response.owner);
                        siteToAdd.owner = {
                            id : response.owner
                        };

                        $scope.vm.sites.unshift(siteToAdd);
                        $scope.vm.newSite = {};
                        $scope.siteForm.$setPristine();
                        $scope.siteForm.$setUntouched()
                    }, function (response) {
                        // error
                        $scope.vm.errorMsg = response.data.error;
                    });
            };

            $scope.logout = function () {
                AuthService.logout();
            };
            /**
             * Mark a user model as selected, and clears selection from the rest.
             * @param user
             */
            $scope.userSelected = function (user) {
                $scope.vm.selecteUserId = user.id;
                for (var i = 0; i < $scope.vm.users.length; i++){
                    if ($scope.vm.users[i].id === user.id){
                        $scope.vm.users[i].selected = true;
                    } else {
                        $scope.vm.users[i].selected = false;
                    }
                }
            };
            /**
             *
             * @param site
             * @returns {*|boolean} true if site's owner is selected.
             */
            $scope.isSelected = function (site) {
               return $scope.vm.selecteUserId && site.owner && (site.owner.id === $scope.vm.selecteUserId)
            };


            _init();

        }
    ]);