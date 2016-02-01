var _ = require("underscore");
var session = require('express-session');

exports.formatProgress = function(locations, progresses) {
  for (var i=0; i < locations.length; i++) {
    var progress = _.findWhere(progresses, {location_id: locations[i].id});
    locations[i].dataValues.visited = progress.visited;
    locations[i].dataValues.progress_id = progress.id;
  }
  return locations
}

//create session
exports.createSession = function(request, response, isUser, callback) {
  console.log("+++ 15 utils.js Create")
  request.session.regenerate(function() {
    request.session.user = isUser.id
    callback(request.session.user)
  })
}

// Login Checks
var isLoggedIn = function(request) {
  return request.session ? !!request.session.user : false;
}

var isLoggedOut = function(request) {
  return !!(request.session ? !!request.session.user : false);
}

// Reroute based on Auth status
exports.checkUser = function(request, response, next) {
  console.log("+++ 32 utils.js HELLO")
  if (isLoggedIn(request)) {
    console.log("+++ 33 utils.js In")
    next();
  } else {
    console.log("+++ 36 utils.js Out")
    response.redirect('/#/login')
  }
}

exports.logout = function (request, response, callback) {
  request.session.destroy();
  request.session = null;
  if(!request.session){
    callback(true);
  }
}
