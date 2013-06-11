var Story = (function() {
  var extend = require('mongoose-schema-extend');
  var util = require('../common/util');
  var Schema = require('mongoose').Schema;
  
  var visibilities = [
    'public',
    'private',
    'users',
    'link'
  ];
  
  var getSchema = function(options) {
    var schema = options.userContentSchema.extend({
      visibility: {
        type: String,
        enum: visibilities
      },
      views: [Schema.Types.ObjectId],
      storyLines: [Schema.Types.ObjectId]
    });

    var methods = util.addIsAndSetsToSchema(visibilities, 'visibility', schema, this);
    methods.getLines = function() {
      //TODO: Search for all StoryLines with this story's id.
    };

    schema.method(methods);
    return schema;
  };
  
  return {
    uriName: 'stories',
    setupResource: function(options) {
      this.schema = getSchema(options);
      this.model = options.mongoose.model('Story', this.schema);
    }
  };
})();

module.exports = Story;
