var mongoose = require('mongoose');
var logger = require('winston');

var db = (function() {
  var resources = [];
  
  var loadSchemas = function() {
    resources.push(require('../models/User'));
    resources.push(require('../models/Story'));
//    resources.push(require('../models/StoryLine'));
//    resources.push(require('../models/Vote'));
//    resources.push(require('../models/StoryState'));
//    resources.push(require('../models/Comment'));
//    resources.push(require('../models/Privilege'));
  };
  
  var addToBridge = function(angularBridge) {
    var Schema = mongoose.Schema;
    var timestamps = require('mongoose-times');
    var options = {
      plugins: {
        timestamps: timestamps
      }
    };
    var UserContentSchema = require('../models/UserContent').getSchema(mongoose.Schema, options);
    options.userContentSchema = UserContentSchema;
    for (var i = 0; i < resources.length; i++) {
      var resource = resources[i];
      var schema = resource.getSchema(Schema, options);

      setAngularBridgeMethods(schema);
      var model = mongoose.model(resource.modelName, schema);

      angularBridge.addResource(resource.name, model);
    }
  };
  
  var setAngularBridgeMethods = function(schema) {
    schema.methods.query = function(entities) {
      logger.info("Queried:");
      logger.info(entities);
    };

    schema.methods.get = function(entity) {
      logger.info("Got:");
      logger.info(entity);
    };

    schema.methods.put = function(entity) {
      logger.info("Put:");
      logger.info(entity);
    };

    schema.methods.post = function(entity) {
      logger.info("Posted:");
      logger.info(entity);
    };

    schema.methods.delete = function(entity) {
      logger.info("Deleted:");
      logger.info(entity);
    };
  };
  
  return {
    setupResources: function(angularBridge) {
      loadSchemas();
      addToBridge(angularBridge);
    }
  }
})();


module.exports = db;