var extend = require('mongoose-schema-extend');
var util = require('../common/util');

var StoryLine = (function() {

  var lineTypes = [
    'normal',
    'starter'
  ];
  
  return {
    uriName: 'storylines',
    modelName: 'StoryLine',
    getSchema: function(Schema, options) {
      var schema = options.userContentSchema.extend({
        content: {
          type: String
        },
        lineType: {
          type: String
        },
        stories: {
          type: [Schema.Types.ObjectId] 
        }
      });

      var methods = util.addIsAndSetsToSchema(lineTypes, 'lineType', schema, this);
      
      methods.getStories = function() {
        //TODO: Get all stories from story ids array.
      };

      schema.method(methods);

      return schema;
    }
  }
})();

module.exports = StoryLine;
