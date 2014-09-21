Template.registrantsList.helpers({
  filteredRegistrants: function() {
    return Registrants.find(
      {eventIds: {$elemMatch: { $in: [this.eventId]}}, name: {$regex: ".*" + Template.instance().filter.get() + ".*", $options: 'i'}}, 
      {sort: {name:1, phone:1, email:1}, limit: 100})
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
    if (Meteor.user()) {
      return this.event.userId == Meteor.userId();
    } else {
      return false;
    }
  },

  myEvents: function() {
    if (Meteor.user()) {
      Meteor.subscribe('myEvents', Meteor.userId());
      return Events.find({userId: Meteor.userId()});
    } else {
      return [];
    }
  },

  editId: function () { return Template.instance().editId.get(); },
  editName: function () { return Template.instance().editName.get(); },
  editPhone: function () { return Template.instance().editPhone.get(); },
  editEmail: function () { return Template.instance().editEmail.get(); },
});

Template.registrantsList.created = function() {
  this.filter = new ReactiveVar("");
  this.editId = new ReactiveVar("");
  this.editName = new ReactiveVar("");
  this.editPhone = new ReactiveVar("");
  this.editEmail = new ReactiveVar("");
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

  'click .editBtn': function(e) {
    Template.instance().editId.set(this._id);
    Template.instance().editName.set(this.name);
    Template.instance().editPhone.set(this.phone);
    Template.instance().editEmail.set(this.email);
    $('#editRegistrantModal').modal('show');
  },

  'submit #newForm': function(e) {
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
  },

  'submit #editForm': function(e) {
    e.preventDefault();

    var data = {
      _id: $(e.target).find('[name=_id]').val(),
      name: $(e.target).find('[name=name]').val(),
      phone: $(e.target).find('[name=phone]').val(),
      email: $(e.target).find('[name=email]').val(),
    }

    Meteor.call('update_registrant', data, function(error, id) {
      if (error) {
        console.log(error);
      } else {
      }
      $("#editRegistrantModal").modal('hide');
    });
  }
});