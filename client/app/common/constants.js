/**
 * Created by yotam on 13/2/2016.
 */
angular.module('app.common.constants', [])

    .constant('AUTH_EVENTS', {
        notAuthenticated: 'auth-not-authenticated',
        notAuthorized: 'auth-not-authorized',
        authenticationCompleted: 'auth-completed'
    });
