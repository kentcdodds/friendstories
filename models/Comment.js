var extend = require('mongoose-schema-extend');

var StoryLine = (function() {

  return {
    uriName: 'comments',
    modelName: 'Comment',
    getSchema: function(Schema, options) {
      var schema = options.userContentSchema.extend({
        content: {
          type: String
        }
      });

      var methods = {};

      schema.method(methods);

      return schema;
    }
  }
})();

module.exports = StoryLine;
