/**
 * Created by yotam on 14/3/2016.
 */

/**
 * Model structure inspired by:
 * http://blog.shinetech.com/2014/02/04/rich-object-models-and-angular-js/
 */
angular.module('app.models.user', [])

    /**
     * This factory exposes a data access object for a User

     * Possible responsibilities:
     * Parse data before it is sent to server.
     * Parse data before it is presented to client.
     * Caching - if will be needed.
     * Define validations before save.
     */
    .factory('UserDao', ['Restangular', function (Restangular ) {
        var modelName = 'users';
        var collectionDAO = Restangular.all(modelName);

        /**
         * Maps a user object from server object to view model object.
         * if object is not valid, returns null.
         * @param user - server object
         * @returns {*}
         * @private
         */
        function _mapToVM(user) {
            if (user.auth){
                return {
                    id : user.id,
                    name : user.auth.name,
                    imgSrc : "https://graph.facebook.com/" + user.auth.facebookId + "/picture?type=large"
                }
            } else {
                return null;
            }

        }

        /**
         * Gets all users and maps them to view model objects.
         * @returns {*}
         * @private
         */
        function _getAll() {
            return collectionDAO
                .getList()
                .then(function (users) {
                    return _.reject(_.map(users,_mapToVM), function(obj){ return obj === null });
                });
        }

        return {
            getAll: _getAll
        };
    }]);