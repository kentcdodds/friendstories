var db = require('../controllers/db');
var chai = require('chai');
var _ = require('underscore');
var expect = chai.expect;

chai.Assertion.includeStack = true;

describe('test', function() {
  describe('test_of_tests', function() {
    it('should work just fine', function() {
      var foo = 'bar'
      var beverages = { tea: [ 'chai', 'matcha', 'oolong' ] };
      
      expect(foo).to.be.a('string');
      expect(foo).to.equal('bar');
      expect(foo).to.have.length(3);
      expect(beverages).to.have.property('tea').with.length(3);
    });
  });
});

describe('db', function() {
  it('should connect', function() {
    
  });
  describe('User', function() {
    it('should be able to create', function() {
      console.log('trying create');
      db.User.create({firstName: 'CoolKid'}, function(error, user) {
        console.log('here');
        if (error) {
          throw error;
        } else {
          console.log(JSON.stringify(user, null, 2));
          console.log(_.keys(user));
        }
        done();
      });
    });
  });
});