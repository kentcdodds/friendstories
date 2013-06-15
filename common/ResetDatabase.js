var _ = require('underscore');
var dropCollections = false;

var ResetDatabase = (function() {
  var mongoose = require('mongoose');
  
  var db = require('../controllers/db');
  var i = 0;
  
  var deleteDatabase = function() {
    console.log('Dropping Collections');
    for (i = 0; i < db.resources.length; i++) {
      var resource = db.resources[i];
      var callback = function(err) {
        var collectionName = resource.uriName;
        if (err) {
          console.warn('Error dropping ' + collectionName);
          console.warn(err);
        } else {
          console.log('Dropped ' + collectionName + ' successfaully');
        }
      }
      mongoose.connection.collections[resource.uriName].drop(callback);
    }
  };
  
  var loadDatabase = function() {
    console.log('Loading mocks...');
    var models = require('../test/integration/Mocks').models;
    var keys = _.keys(models);
    console.log('Saving mocks...');
    for (i = 0; i < keys.length; i++) {
      var key = keys[i];
      var modelMocks = models[key];
      for (var j = 0; j < modelMocks.length; j++) {
        var model = modelMocks[j];
        if (!(key === 'Votes' && _.isUndefined(model.points))) {
          model.save();
        }
      }
    }
    console.log('Mocks saved!');
  };
  
  if (dropCollections) {
    deleteDatabase();
  } else {
    loadDatabase();
  }
  return {
    deleteDatabase: deleteDatabase,
    loadDatabase: loadDatabase
  }
})();

module.exports = ResetDatabase;
