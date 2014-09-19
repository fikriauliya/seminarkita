Meteor.publish('events', function() {
  return Events.find({});
});
Meteor.publish('singleEvent', function(id) {
  return id && Events.find(id);
});
Meteor.publish('attendances', function(id) {
  return id && Attendances.find({eventId: id});
});
