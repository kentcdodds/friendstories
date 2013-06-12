var StoryLine = (function() {
  var extend = require('mongoose-schema-extend');
  var Schema = require('mongoose').Schema;
  var db = require('../controllers/db');

  var getSchema = function(options) {
    var schema = new Schema({
      voteType: Boolean,
      points: Number,
      voter: Schema.Types.ObjectId
    });

    schema.plugin(options.plugins.timestamps);

    var methods = {
      isUp: function() {
        return this.voteType;
      },
      isDown: function() {
        return !this.voteType;
      },
      getVoter: function(callback) {
        db.getObjectsFromIds('User', this.voter, callback);
      },
      setPointsFor: function(type) {
        var type = require('./UserContent').types[type];
        if (type) {
          if (this.isUp()) {
            this.points = type.votePoints.up;
          } else {
            this.points = type.votePoints.down;
          }
        }
      }
    };

    schema.method(methods);

    return schema;
  };
  
  return {
    uriName: 'votes',
    setupResource: function(options) {
      this.schema = getSchema(options);
      this.model = options.mongoose.model('Vote', this.schema);
      return this;
    }
  }
})();

module.exports = StoryLine;
