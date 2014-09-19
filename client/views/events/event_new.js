Template.eventNew.events({
  'submit form': function(e) {
    e.preventDefault();
    
    var data = {
      title: $(e.target).find('[name=title]').val(),
      description: $(e.target).find('[name=description]').val(),
      location: $(e.target).find('[name=location]').val()
    }
    
    Meteor.call('create_event', data, function(error, id) {
      if (error) {
        // display the error to the user
        // throwError(error.reason);
        console.log(error);
      } else {
        Router.go('eventPage', {_id: id});
      }
    });
  }
});