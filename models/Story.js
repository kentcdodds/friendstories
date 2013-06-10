var extend = require('mongoose-schema-extend');
var util = require('../common/util');

var Story = (function() {
  var visibilities = {
    PUBLIC: 'public',
    PRIVATE: 'private',
    USERS: 'users',
    LINK: 'link'
  };
  
  var getVisibilityMehtods = function() {
    var methods = {};
    var self = this;
    for (var i = 0; i < visibilities.length; i++) {
      var visibility = visibilities[i];
      var capitalizedVisibility = util.capitaliseFirstLetter(visibility);
      methods['is' + capitalizedVisibility] = function() {
        return self.visibility === visibility;
      }
      methods['set' + capitalizedVisibility] = function() {
        this.visibility = visibility;
        return self;
      }
    }
    return methods;
  };
  
  return {
    name: 'stories',
    modelName: 'Story',
    getSchema: function(Schema, options) {
      var schema = options.userContentSchema.extend({
        visibility: {
          type: String
        }
      });
      
      var methods = getVisibilityMehtods();
      methods.getLines = function() {
        //TODO: Search for all StoryLines with this story's id.
      };
      
      schema.method(methods);
      
      return schema;
    }
  }
})();

module.exports = Story;
