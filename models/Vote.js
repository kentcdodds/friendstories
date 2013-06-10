var extend = require('mongoose-schema-extend');

var StoryLine = (function() {

  return {
    uriName: 'votes',
    modelName: 'Vote',
    getSchema: function(Schema, options) {
      var schema = options.userContentSchema.extend({
        voteType: {
          type: Boolean
        },
        points: {
          type: Number
        },
        source: {
          type: Schema.Types.ObjectId
        },
        destination: {
          type: Schema.Types.ObjectId
        }
      });

      schema.plugin(options.plugins.timestamps);

      var methods = {
        isUp: function() {
          return this.voteType;
        },
        isDown: function() {
          return !this.voteType;
        }
      };

      schema.method(methods);

      return schema;
    }
  }
})();

module.exports = StoryLine;
