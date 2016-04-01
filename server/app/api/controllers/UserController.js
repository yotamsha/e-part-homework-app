/**
 * UserController.js
 *
 * @module      :: Controller
 * @description :: Provides the base user
 *                 actions used to make waterlock work.
 *
 * @docs        :: http://waterlock.ninja/documentation
 */

module.exports = require('waterlock').actions.user({

    session: function(req, res){
      if (req.session && req.session.user){
        return res.json(200, req.session.user);
      } else {
        return res.json(200, null);
      }
    }
});
