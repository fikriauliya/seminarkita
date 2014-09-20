Template.registrant.helpers({
  attending: function(){
    return _.include(this.attendedEventIds, Template.parentData(2).eventId) ? "checked" : ""
  },
  isModerator: function() {
    return Template.parentData(2).isModerator();
  }
});

Template.registrant.events({
  'change .attending': function(e) {
    if (e.target.checked) {
      Registrants.update({
        _id: this._id
      }, {
        $addToSet: {attendedEventIds: Template.parentData(2).eventId},
      });
    } else {
      Registrants.update({
        _id: this._id
      }, {
        $pull: {attendedEventIds: Template.parentData(2).eventId},
      });
    }
  }
})