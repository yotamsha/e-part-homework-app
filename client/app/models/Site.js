/**
 * Created by yotam on 14/3/2016.
 */

/**
 * Model structure inspired by:
 * http://blog.shinetech.com/2014/02/04/rich-object-models-and-angular-js/
 */
angular.module('app.models.site', [])

    /**
     * This factory exposes a data access object for a User

     * Possible responsibilities:
     * Parse data before it is sent to server.
     * Parse data before it is presented to client.
     * Caching - if will be needed.
     * Define validations before save.
     */
    .factory('SiteDao', ['Restangular', function (Restangular ) {
        var modelName = 'sites';
        var collectionDAO = Restangular.all(modelName);

        /**
         *
         * @param server site object
         * @returns {*} view model mapping of the server side site object.
         * @private
         */
        function _mapToVM(site) {
            if (site){
                return {
                    url : site.url,
                    title : site.title,
                    owner : site.owner,
                }
            } else {
                return null;
            }

        }

        /**
         *
         * @returns {*} all sites collection, mapped to view model objects
         * @private
         */
        function _getAll() {
            return collectionDAO
                .getList()
                .then(function (users) {
                    return _.reject(_.map(users,_mapToVM), function(obj){ return obj === null });
                });
        }

        function _create(site) {
            return collectionDAO.post(site);

        }
        return {
            getAll : _getAll,
            create : _create
        };
    }]);