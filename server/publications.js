Meteor.publish('events', function() {
  return Events.find({});
});
Meteor.publish('singleEvent', function(id) {
  return id & Events.find(id)
});
