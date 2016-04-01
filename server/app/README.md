# app

a [Sails](http://sailsjs.org) application

## Install app:
* run npm install in client folder.
* run npm install in server/app folder.

## Start app (development):

* Add to your hosts file.
* set BASE_URL=http://test.e-part-hw-app.herokuapp.com:1337/api/v1
* run sails lift.
* go to http://test.e-part-hw-app.herokuapp.com:1337/


## Deploy to Heroku:
* run grunt release in client folder.
* git subtree push --prefix server/app heroku master
