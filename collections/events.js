Events = new Meteor.Collection('events');

Meteor.methods({
  create_event: function(attr) {
    var user = Meteor.user();
      
    // ensure the user is logged in
    if (!user)
      throw new Meteor.Error(401, "You need to login to cretae new event");
    
    // ensure the post has a title
    if (!attr.title)
      throw new Meteor.Error(422, 'Please fill in a headline');
        
    // pick out the whitelisted keys
    var event = _.extend(_.pick(attr, 'title', 'description', 'location'), {
      userId: user._id, 
      userName: user.emails[0].address, 
      timeFrom: new Date(),
      timeTo: new Date(),
    }); 
    
    var eventId = Events.insert(event);
    
    return eventId;
  },
});