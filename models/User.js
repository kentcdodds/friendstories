var User = (function() {
  var util = require('../common/util');
  var Schema = require('mongoose').Schema;
  
  var roles = [
    'admin',
    'moderator',
    'user'
  ];
  
  var getSchema = function(options) {
    var schema = new Schema({
      firstName: {
        type: String,
        trim: true
      },
      lastName: {
        type: String,
        trim: true
      },
      displayName: {
        type: String,
        trim: true
      },
      twitterId: String,
      googleId: String,
      facebookId: String,
      email: {
        type: String,
        trim: true
      },
      favoriteStories: [Schema.Types.ObjectId],
      role: {
        type: String,
        enum: roles
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
  };
  
  return {
    uriName: 'users',
    setupResource: function(options) {
      this.schema = getSchema(options);
      this.model = options.mongoose.model('User', this.schema);
    }
  }
})();

module.exports = User;
