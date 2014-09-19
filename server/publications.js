Meteor.publish('events', function() {
  return Events.find({});
});
Meteor.publish('singleEvent', function(id) {
  return id && Events.find(id);
});
Meteor.publish('registrants', function(id) {
  return id && Registrants.find({eventIds: {$elemMatch: { $in: [id]}}}, {sort: {name:1, phone:1, email:1}});
});
