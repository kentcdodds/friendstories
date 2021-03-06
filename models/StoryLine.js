var StoryLine = (function() {
  var extend = require('mongoose-schema-extend');
  
  var getSchema = function(options) {
    var schema = options.userContentSchema.extend({
    });

    var methods = {};
    schema.method(methods);
    
    return schema;
  };
  
  return {
    uriName: 'storylines',
    setupResource: function(options) {
      this.schema = getSchema(options);
      this.model = options.mongoose.model('StoryLine', this.schema);
      return this;
    }
  };
})();

module.exports = StoryLine;
