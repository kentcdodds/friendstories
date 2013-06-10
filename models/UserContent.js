
var UserContent = (function() {

  return {
    getSchema: function(Schema, options) {
      var schema = new Schema({
        owners: {
          type: [Schema.Types.ObjectId]
        }
      });
      
      schema.plugin(options.plugins.timestamps);
      
      var methods = {
        getTotalPoints: function() {
          
        },
        getVotes: function() {
          
        },
        getFlagReports: function() {
          
        },
        getViews: function() {
          
        },
        getComments: function() {
          
        },
        getOwners: function() {
          
        }
      };

      schema.method(methods);
      
      return schema;
    }
  }
})();

module.exports = UserContent;
