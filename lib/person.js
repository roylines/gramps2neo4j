var Neo4j = require('node-neo4j');
var db = new Neo4j(process.env.NEO4J_HOST);
var person = {};

person.add = function(person, done) {
  return db.updateNodesWithLabelsAndProperties(labels(person), match(person), person, [], true, function(e, d) {
    if (e) {
      return done(e);
    }

    if (d.length > 0) {
      return done(e, d[0]);
    }

    return db.insertNode(person, labels(person), done);
  });
}

person.delete = function(person, done) {
  return db.deleteNodesWithLabelsAndProperties(labels(person), match(person), done);
}

function match(person) {
  return {
    id: person.id
  };
}

function labels(person) {
  return ['Person', person.gender === 'male' ? 'Male' : 'Female'];
}

module.exports = person;
