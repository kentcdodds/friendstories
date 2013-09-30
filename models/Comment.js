var CommentSchema = (function() {
  var extend = require('mongoose-schema-extend');
  
  var getSchema = function(options) {
    var schema = new Schema({
      comment: String,
      owners: [Schema.Types.ObjectId],
      votes: [options.schemas.Vote],
      flagReports: [options.schemas.flagReport]
    });

    var methods = {};
    schema.method(methods);
    
    return schema;
  };

  return {
    uriName: 'comments',
    setupResource: function(options) {
      this.schema = getSchema(options);
      this.model = options.mongoose.model('Comment', this.schema);
      return this;
    }
  };
})();

module.exports = CommentSchema;
