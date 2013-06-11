var StoryLine = (function() {
  var extend = require('mongoose-schema-extend');
  var Schema = require('mongoose').Schema;

  var getSchema = function(options) {
    var schema = options.userContentSchema.extend({
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
      getVoter: function() {
 
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
    }
  }
})();

module.exports = StoryLine;
