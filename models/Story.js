var extend = require('mongoose-schema-extend');
var util = require('../common/util');

var Story = (function() {
  var visibilities = [
    'public',
    'private',
    'users',
    'link'
  ];
  
  return {
    uriName: 'stories',
    modelName: 'Story',
    getSchema: function(Schema, options) {
      var schema = options.userContentSchema.extend({
        visibility: {
          type: String
        },
        title: {
          type: String
        }
      });
      
      var methods = util.addIsAndSetsToSchema(visibilities, 'visibility', schema, this);
      methods.getLines = function() {
        //TODO: Search for all StoryLines with this story's id.
      };
      
      schema.method(methods);
      
      return schema;
    }
  }
})();

module.exports = Story;
