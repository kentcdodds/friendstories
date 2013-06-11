var mongoose = require('mongoose');
var logger = require('winston');

var db = (function() {
  var resources = [];
  
  var loadSchemas = function() {
    resources.push(require('../models/User'));
    resources.push(require('../models/Story'));
    resources.push(require('../models/StoryLine'));
    resources.push(require('../models/Vote'));
    resources.push(require('../models/Comment'));
  };
  
  var addToBridge = function(angularBridge) {
    var timestamps = require('mongoose-times');
    var options = {
      plugins: {
        timestamps: timestamps
      },
      mongoose: mongoose
    };
    var UserContentSchema = require('../models/UserContent').setupSchema(options);
    options.userContentSchema = UserContentSchema;
    for (var i = 0; i < resources.length; i++) {
      var resource = resources[i];
      resource.setupResource(options);

      setAngularBridgeMethods(resource.schema);
      angularBridge.addResource(resource.uriName, resource.model);
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
    },
    getObjectsFromId: function(resourceName, id) {
      if (!_.isArray(id)) {
        id = [id];
      }
      var resource = resources[_.indexOf(resources, resourceName)];
      resource.getSchema()
    }
  }
})();


module.exports = db;