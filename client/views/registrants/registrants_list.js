Template.registrantsList.helpers({
  filteredRegistrants: function() {
    return Registrants.find(
      {eventIds: {$elemMatch: { $in: [this.eventId]}}, name: {$regex: ".*" + Template.instance().filter.get() + ".*", $options: 'i'}}, 
      {sort: {name:1, phone:1, email:1}})
  },

  totalRegistrantsCount: function() {
    return Registrants.find({eventIds: {$elemMatch: { $in: [this.eventId]}}}).count();
  },

  totalAttendedRegistrantsCount: function() {
    return Registrants.find({attendedEventIds: {$elemMatch: { $in: [this.eventId]}}}).count();
  },

  filter: function() {
    return Template.instance().filter.get();
  },

  isOwner: function() {
    return this.event.userId == Meteor.userId();
  },

  myEvents: function() {
    return Events.find({userId: Meteor.userId()});
  }
});

Template.registrantsList.created = function() {
  this.filter = new ReactiveVar("");
}

Template.registrantsList.events({
  "input .filter":function(e){
    var currentValue = $(e.target).val();
    Template.instance().filter.set(currentValue);
  },

  'click #importBtn': function(e){
    var data = {
      importFromEventId: $('#eventListDropDown').val(),
      importToEventId: this.eventId
    }

    Meteor.call('import_registrants', data, function(error, id){
      if (error) {
        console.log(error);
      } else {
        console.log("Imported");
      }
    })
    
  },

  'submit form': function(e) {
    e.preventDefault();
    
    var data = {
      name: $(e.target).find('[name=name]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      email: $(e.target).find('[name=email]').val(),
      eventId: this.eventId
    }

    var filter = Template.instance().filter;

    Meteor.call('create_registrant', data, function(error, id) {
      if (error) {
        console.log(error);
      } else {
        filter.set('');

        $(e.target).find('[name=phone]').val('')
        $(e.target).find('[name=email]').val('')
      }
      $('#newRegistrantModal').modal('hide');
    });
  }
});