
var UserContent = (function() {

  return {
    getSchema: function(Schema, options) {
      var schema = new Schema({
        owners: {
          type: [Schema.Types.ObjectId]
        },
        content: {
          type: String
        }
      });
      schema.plugin(options.plugins.timestamps);
      
      methods = {
        getTotalPoints: function() {
          
        },
        getVotes: function() {
          
        },
        getFlagReports: function() {
          
        },
        getViews: function() {
          
        },
        getComments: function() {
          
        }
      };
      
      return schema;
    }
  }
})();

module.exports = UserContent;
