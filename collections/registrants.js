Registrants = new Meteor.Collection('registrants');

Meteor.methods({
  create_registrant: function(attr) {
    var selectedEvent = Events.findOne(attr.eventId);
    //TODO: authenticate user

    // pick out the whitelisted keys
    var registrant = _.extend(_.pick(attr, 'name', 'phone', 'email'), {
      ownerId: selectedEvent.userId,
      eventIds: [selectedEvent._id],
      attendedEventIds: [selectedEvent._id]
    }); 
    
    var registrantId = Registrants.insert(registrant);
    
    return registrantId;
  },

  import_registrants: function (attr) {
    Registrants.update({eventIds: {$elemMatch: {$in: [attr.importFromEventId]}}}, {$addToSet: {eventIds: attr.importToEventId}}, {multi: true});
  }
});
