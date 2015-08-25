var person = require('../lib/person');
require('chai').should();
var Lab = require('lab');
var lab = exports.lab = Lab.script();

function testAdd(who, done) {
  return person.add(who, function(e, d) {
    d.id.should.equal(who.id);
    d.gender.should.equal(who.gender);
    d._id.should.be.above(1);
    return done(e, d);
  });
}

function testDelete(who, done) {
  return person.delete(who, function(e, d) {
    d.should.equal(1);
    return done(e, d);
  });
}

lab.experiment('person', function() {
  lab.experiment('add', function() {
    lab.test('can add a male person, first time', function(done) {
      var who = {
        id: 'IDM',
        gender: 'male'
      };
      testAdd(who, done);
    });
    lab.test('can add a male person, second time', function(done) {
      var who = {
        id: 'IDM',
        gender: 'male'
      };
      testAdd(who, done);
    });
    lab.test('can add a female person, first time', function(done) {
      var who = {
        id: 'IDF',
        gender: 'female'
      };
      testAdd(who, done);
    });
    lab.test('can delete a male', function(done) {
      var who = {
        id: 'IDM',
        gender: 'male'
      };
      testDelete(who, done);
    });
    lab.test('can delete a female', function(done) {
      var who = {
        id: 'IDF',
        gender: 'female'
      };
      testDelete(who, done);
    });
  });
});
