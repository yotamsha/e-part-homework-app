/**
 * SiteController
 *
 * @description :: Server-side logic for managing sites
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var cheerio = require('cheerio');
var request = require('request');
module.exports = {
	create : function(req, res){
/*    var http = require('http');
    // var urlOpts = {host: 'www.nodejs.org', path: '/', port: '80'};
    var re = /(<\s*title[^>]*>(.+?)<\s*\/\s*title)>/gi;
    http.get(req.body.url, function (response) {
      response.on('data', function (chunk) {
        var str=chunk.toString();
        var match = re.exec(str);
        if (match && match[2]) {
          console.log(match[2]);
          res.json(200, {title : match[2]});
        }
      });
    });*/
    request(req.body.url, function (error, response, body)
    {
      if (!error && response.statusCode == 200)
      {
        var $ = cheerio.load(body);
        var title = $("title").text();
        var newSite = {
          url : req.body.url,
          title : title,
          owner : req.session.user.id
        };
        Site.create(newSite).then(function(response){
          res.json(201, response);
        },function(){
          res.json(500, {error : "Could not save the new site data."});

        });

      } else {
        res.json(500, {error : 'Could not get title.' });

      }
    })
  }
};

