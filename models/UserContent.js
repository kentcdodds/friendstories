
var UserContent = (function() {
  var Schema = require('mongoose').Schema;
  var types = {
    Comment: {
      votePoints: {
        up: 2,
        down: 1
      }
    },
    Story: {
      votePoints: {
        up: 15,
        down: 5
      }
    },
    StoryLine: {
      votePoints: {
        up: 2,
        down: 1
      }
    },
    FlagReports: {
      votePoints: {
        up: 0,
        down: 0
      }
    }
  };
  
  var getSchema = function(options) {
    var schema = new Schema({
      content: String,
      owners: [Schema.Types.ObjectId],
      comments: [Schema.Types.ObjectId],
      votes: [Schema.Types.ObjectId],
      flagReports: [Schema.Types.ObjectId]
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
    },
    types: types
  }
})();

module.exports = UserContent;
