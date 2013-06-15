var mongoose = require('mongoose');
var logger = require('winston');

var db = (function() {
  
  var retObject;
  
  var loadSchemas = function() {
    var resources = [];
    resources.push(require('../models/User'));
    resources.push(require('../models/Story'));
    resources.push(require('../models/StoryLine'));
    resources.push(require('../models/Vote'));
    resources.push(require('../models/Comment'));
    resources.push(require('../models/FlagReport'));
    return resources;
  };
  
  var addToBridge = function(angularBridge) {
    var options = {
      plugins: {
        timestamps: require('mongoose-times')
      },
      mongoose: mongoose
    };
    var UserContentSchema = require('../models/UserContent').setupSchema(options);
    options.userContentSchema = UserContentSchema;
    for (var i = 0; i < retObject.resources.length; i++) {
      var resource = retObject.resources[i];
      resource.setupResource(options);

      setAngularBridgeMethods(resource.schema);
      
      if (angularBridge) {
        angularBridge.addResource(resource.uriName, resource.model);
      }
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
  
  retObject = {
    setupResources: function(angularBridge) {
      this.resources = loadSchemas();
      addToBridge(angularBridge);
    },
    connectMongoose: function() {
      mongoose.connect(process.env.OPENSHIFT_MONGODB_DB_URL);
    },
    getObjectsFromIds: function(resourceName, ids, callback) {
      if (!_.isArray(ids)) {
        ids = [ids];
      }
      var resource = this.resources[_.indexOf(this.resources, resourceName)];
      return resource.model.find({
        '_id': {
          $in: ids
        }
      }, function(err, docs) {
        if (err) {
          callback(err, null);
        } else {
          callback(null, docs);
        }
      });
    }
  };
  
  return retObject;
})();


module.exports = db;