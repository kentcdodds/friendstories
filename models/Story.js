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
      viewers: [Schema.Types.ObjectId],
      storyLines: [Schema.Types.ObjectId],
      annonymousViewCount: {
        type: Number,
        default: 0
      }
    });

    var methods = util.addIsAndSetsToSchema(visibilities, 'visibility', schema, this);
    methods.getLines = function(callback) {
      db.getObjectsFromIds('StoryLine', this.storyLines, callback);
    };

    schema.method(methods);
    return schema;
  };
  
  return {
    uriName: 'stories',
    setupResource: function(options) {
      this.schema = getSchema(options);
      this.model = options.mongoose.model('Story', this.schema);
      return this;
    },
    visibilities: visibilities
  };
})();

module.exports = Story;
