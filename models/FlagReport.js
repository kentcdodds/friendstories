var FlagReport = (function() {
  var extend = require('mongoose-schema-extend');
  var util = require('../common/util');

  var flagTypes = [
    'language',
    'hate',
    'pornographic',
    'other'
  ];
  var flagDescriptions = {
    language: 'Inappropriate language',
    hate: 'Religious intolerance, racism, or other hate speech',
    pornographic: 'Pornographic in nature',
    other: 'Otherwise offensive'
  }
  
  var getSchema = function(options) {
    var schema = options.userContentSchema.extend({
      flagType: String
    });

    var methods = util.addIsAndSetsToSchema(flagTypes, 'flagType', schema, this);
    schema.method(methods);

    return schema;
  };

  return {
    uriName: 'flagreports',
    setupResource: function(options) {
      this.schema = getSchema(options);
      this.model = options.mongoose.model('FlagReport', this.schema);
      return this;
    },
    flagTypes: flagTypes,
    flagDescriptions: flagDescriptions
  };
})();

module.exports = FlagReport;
