Template.registrantsList.helpers({
  totalRegistrantsCount: function() {
    return this.registrants.count();
  },
  totalAttendedRegistrantsCount: function() {
    return Registrants.find({attendedEventIds: {$elemMatch: { $in: [this.eventId]}}}).count();
  }
});