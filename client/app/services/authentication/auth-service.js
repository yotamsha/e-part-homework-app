/**
 * Created by yotam on 29/1/2016.
 */
'use strict';
/**
 * This service is responsible for handling the user session functionality.
 */
angular.module('app.services.authentication.auth-service', [])
    .service('AuthService', ['Restangular', '$rootScope', '$cookieStore', '$http',
        '$q', 'APP_CONFIG', '$location',
        function (Restangular, $rootScope, $cookieStore, $http, $q, APP_CONFIG, $location) {
            var authModel = {
                isAuthenticated: false,
                userSession: null,
                isLoading: true
            };

            /**
             * Gets user session from the server, and stores it in app memory
             * @returns {*} a promise, which is resolved if there's a user session, and rejected
             * otherwise.
             */
            function _loadUserCredentials() {
                var deferred = $q.defer();
                if (authModel.userSession) {
                    deferred.resolve(authModel.userSession);
                } else {
                    $http.get(APP_CONFIG.apiBase + "/users/session")
                        .success(function (user) {
                            if (user) {
                                _storeUserCredentials( user);
                                deferred.resolve(authModel.userSession);
                            } else {
                                deferred.reject();
                            }

                        }).error(function () {
                        deferred.reject();
                    });
                }
                return deferred.promise;

            }
            /**
             * Stores a user in app memory.
             * @param user
             */
            function _storeUserCredentials(user) {
                console.log("storing user", user);
                authModel.userSession = user;
                authModel.isAuthenticated = true;
            }
            /**
             * Removes the session from app memory.
             */
            function _destroyUserCredentials() {
                authModel.isAuthenticated = false;
                authModel.userSession = null;
            }
            /**
             * Checks if the user is authenticated and
             * @returns {*}
             */
            function _isAuthenticated() {
                var deferred = $q.defer();
                if (authModel.userSession) {
                    deferred.resolve(authModel.userSession);
                } else {
                    _loadUserCredentials()
                        .then(function (user) {
                            deferred.resolve(user);
                        }, function () {
                            // error or not authenticated
                            deferred.reject();
                        })
                }
                return deferred.promise;
            };
            /**
             * logs out the user, erases the session in both client and server. Upon success,
             * redirect to login page.
             */
            function _logout () {
                return $http.post(APP_CONFIG.apiBase + "/auths/logout").then(function (result) {
                    // success
                    console.log("logout response", result);
                    _destroyUserCredentials();
                    $location.path("/login");
                }, function (error) {
                    // error
                    console.log("logout error", error);

                });
                //destroyUserCredentials();
            }

            return {
                loadUserCredentials: _loadUserCredentials,
                isAuthenticated: _isAuthenticated,
                logout: _logout,
                model: function () {
                    return authModel;
                },
            };
        }]);
