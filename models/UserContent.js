
var UserContent = (function() {
  var Schema = require('mongoose').Schema;
  
  var getSchema = function(options) {
    var schema = new Schema({
      content: String,
      owners: [Schema.Types.ObjectId],
      comments: [Schema.Types.ObjectId],
      votes: [Schema.Types.ObjectId]
    });

    schema.plugin(options.plugins.timestamps);

    var methods = {
      getTotalPoints: function() {

      },
      getFlagReports: function() {

      },
      getOwners: function() {

      },
      getComments: function() {

      },
      getVotes: function() {

      }
    };

    schema.method(methods);

    return schema;
  }

  return {
    setupSchema: function(options) {
      this.schema = getSchema(options);
      return this.schema;
    }
  }
})();

module.exports = UserContent;
