var User = (function() {
  var logger = require('winston');

  return {
    name: 'users',
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
        priviledges: {
          type: [Schema.Types.ObjectId]
        },
        dateJoined: {
          type: Date,
          default: Date.now
        },
        lastLogin: {
          type: Date,
          default: Date.now
        }
      });
      
      schema.methods.getAllContent = function() {
      
      };

      schema.methods.getTotalPoints = function() {
        UserContent = this.getAllContent();
      };

      schema.plugin(options.plugins.timestamps);
      
      return schema;
    }
  }
})();

module.exports = User;
