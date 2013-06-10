var _ = require('underscore');

var util = (function() {
  return {
    capitaliseFirstLetter: function(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    addIsAndSetsToSchema: function(variables, variableName, schema, context) {
      var methods = {};
      for (var i = 0; i < variables.length; i++) {
        var variable = variables[i];
        var capitalizedVisibility = this.capitaliseFirstLetter(variable);
        methods['is' + capitalizedVisibility] = function() {
          return context[variableName] === variable;
        }
        methods['set' + capitalizedVisibility] = function() {
          this[variableName] = variable;
          return context;
        }
      }
      return methods;
    }
  }
})();

module.exports = util;
