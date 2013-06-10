var User = (function() {
  var util = require('../common/util');
  var roles = [
    'admin',
    'moderator',
    'user'
  ];
  
  return {
    uriName: 'users',
    modelName: 'User',
    getSchema: function(Schema, options) {
      var schema = new Schema({
        firstName: {
          type: String
        },
        lastName: {
          type: String
        },
        displayName: {
          type: String
        },
        twitterId: {
          type: String
        },
        googleId: {
          type: String
        },
        facebookId: {
          type: String
        },
        email: {
          type: String
        },
        favoriteStories: {
          type: [Schema.Types.ObjectId]
        },
        role: {
          type: String
        },
        lastLogin: {
          type: Date,
          default: Date.now
        }
      });
      
      schema.plugin(options.plugins.timestamps);

      var methods = util.addIsAndSetsToSchema(roles, 'role', schema, this);
      
      methods.getTotalPoints = function() {
        
      };

      methods.getStories = function() {
          
      };
      
      schema.method(methods);
      
      return schema;
    }
  }
})();

module.exports = User;
