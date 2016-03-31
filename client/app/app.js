'use strict';

// Declare app level module which depends on views, and components
angular.module('app', [

        // External modules
        'ngAnimate',
        'angularUtils.directives.dirPagination',
        'ngRoute',
        'ngMaterial',
        'ngCookies',
        'ngSanitize',
        'ngMessages',
        'pascalprecht.translate',// angular-translate
        'restangular',
        'ui.router',

        // common
        'app.common.constants',

        // App views
        'app.views.home',
        'app.views.login',

        // Components

        // Models
/*
        'app.models.case',
*/

        // Services
        'app.services.data-access',
        'app.services.language-service',
        'app.services.dialogs-service',
        'app.services.authentication.auth-service',
        'app.services.interceptors',

        // 3rd-Party Wrappers - We wrap 3rd party libraries that aren't angular modules in order
        // to keep the global window clean. Only these libraries are accessible through a single variable: window._thirdParty
        // more on the method: http://jameshill.io/articles/angular-third-party-injection-pattern/
        'app.vendors.momentjs',

        // Environment config module
        'config'

    ])
    .constant('LOCALES', {
        'locales': {
            'he_HE': 'עברית',
            'en_US': 'English'
        },
        'preferredLocale': 'he_HE'
    })
    .constant('APP_CONFIG', {
        homeRoute: '/login',
        apiBase : 'api/v1'
    })
    .config(['$urlRouterProvider', '$translateProvider', '$mdThemingProvider', 'RestangularProvider', 'APP_CONFIG','ENV',
        function ($urlRouterProvider, $translateProvider, $mdThemingProvider, RestangularProvider, APP_CONFIG, ENV) {
            //console.log("using server host: " + serverHost)
            RestangularProvider.setBaseUrl(APP_CONFIG.apiBase);
            $mdThemingProvider.theme('default')
                .primaryPalette('cyan')
                .accentPalette('orange');

            // i18n setup based on: https://scotch.io/tutorials/internationalization-of-angularjs-applications
            $translateProvider.useStaticFilesLoader({
                prefix: 'resources/locale-',// path to translations files
                suffix: '.json'// suffix, currently- extension of the translations
            });
            $translateProvider.preferredLanguage('he_HE');// is applied on first load // yak: todo: USE CONSTANT?
            $translateProvider.useLocalStorage();// saves selected language to localStorage
            // App routing is using ui-router module - https://github.com/angular-ui/ui-router
            $urlRouterProvider.otherwise(APP_CONFIG.homeRoute);

        }])
    .run(['moment', '$http', '$rootScope', 'AuthService', '$window', function (moment, $http, $rootScope, AuthService, $window) {

        facebookInit();
        moment.locale('he');

        function facebookInit() {

            $window.fbAsyncInit = function () {
                // Executed when the SDK is loaded
                FB.init({
                    appId: '751373294999903',
                    cookie: true,  // enable cookies to allow the server to access
                                   // the session
                    xfbml: true,  // parse social plugins on this page
                    version: 'v2.2' // use version 2.2
                });
                //AuthService.facebookAuthenticator.watchAuthenticationStatusChange();

            };
            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) return;
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/en_US/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));
        }
    }]);
