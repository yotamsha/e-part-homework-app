# ep-hw-app

## Install app:
* run npm install in client folder.
* run npm install in server/app folder.

## Start app (development):

* Add test.e-part-hw-app.herokuapp.com to your hosts file. (required for Facebook integration)
* set BASE_URL=http://test.e-part-hw-app.herokuapp.com:1337/api/v1
* run sails lift.
* go to http://test.e-part-hw-app.herokuapp.com:1337/


## Deploy to Heroku:
* run grunt release in client folder.
* git subtree push --prefix server/app heroku master

### See live app  - [e-part-hw-app.herokuapp.com] (http://e-part-hw-app.herokuapp.com)
