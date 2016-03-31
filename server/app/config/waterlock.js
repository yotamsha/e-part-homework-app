
/**
 * waterlock
 *
 * defines various options used by waterlock
 * for more informaiton checkout
 *
 * http://waterlock.ninja/documentation
 */
module.exports.waterlock = {

  // Base URL
  //
  // used by auth methods for callback URI's using oauth and for password
  // reset links.
  baseUrl: process.env.BASE_URL || 'http://test.e-part-hw-app.herokuapp.com:1337/api/v1',

  // Auth Method(s)
  //
  // this can be a single string, an object, or an array of objects for your
  // chosen auth method(s) you will need to see the individual module's README
  // file for more information on the attributes necessary. This is an example
  // of the local authentication method with password reset tokens disabled.
  authMethod: [
    {
      name: "waterlock-facebook-auth",
      appId: "751373294999903",//process.env.APP_ID,
      appSecret: '98301ccd9cf768bb4be8fdf61af1d288',//process.env.APP_SECRET
      fieldMap: {
        // <model-field>: <facebook-field>,
        'firstName': 'first_name',
        'lastName': 'last_name',
        'gender': 'gender',
        'timezone': 'timezone',
        'email': 'email'
      }
    },

  ],
  pluralizeEndpoints: true,
  // JSON Web Tokens
  //
  // this provides waterlock with basic information to build your tokens,
  // these tokens are used for authentication, password reset,
  // and anything else you can imagine
  jsonWebTokens:{

    // CHANGE THIS SECRET
    secret: 'secretssss',
    expiry:{
      unit: 'days',
      length: '7'
    },
    audience: 'app name',
    subject: 'subject',

    // tracks jwt usage if set to true
    trackUsage: true,

    // if set to false will authenticate the
    // express session object and attach the
    // user to it during the hasJsonWebToken
    // middleware
    stateless: false,

    // set the name of the jwt token property
    // in the JSON response
    tokenProperty: 'token',

    // set the name of the expires property
    // in the JSON response
    expiresProperty: 'expires',

    // configure whether or not to include
    // the user in the respnse - this is useful if
    // JWT is the default response for succesfull login
    includeUserInJwtResponse: false
  },

  // Post Actions
  //
  // Lets waterlock know how to handle different login/logout
  // attempt outcomes.
  postActions: {
    login: {
      success: '/#/home',
      failure: 'default'
    },
    logout: {
      success: '/#/login',
      failure: 'default'
    }
  }
};
