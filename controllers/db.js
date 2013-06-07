var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PizzaSchema = new Schema({
  author : {
    type : String,
  },
  color : {
    type : String
  },
  size : {
    type : Number
  },
  password : {   // You can hide it from read and write ! (cf after)
    type : String
  }
});

// You can optionally add a method to schema.methods that is executed based
// on the type of HTTP request with the names "query", "get", "put", "post", and "delete"
// The callback receives the affected entities as it's parameter.
PizzaSchema.methods.query = function(entities) {
  console.log("Queried:");
  console.log(entities);
};

PizzaSchema.methods.get = function(entity) {
  console.log("Got:")
  console.log(entity);
};

PizzaSchema.methods.put = function(entity) {
  console.log("Put:")
  console.log(entity);
};

PizzaSchema.methods.post = function(entity) {
  console.log("Posted:")
  console.log(entity);
};

PizzaSchema.methods.delete = function(entity) {
  console.log("Deleted:")
  console.log(entity);
};

exports.Pizza = mongoose.model('pizzas', PizzaSchema);