Router.configure({
  layoutTemplate: 'layout'
})

Router.map(function(){
  this.route('home', {path: '/'});
  this.route('eventsList', {
    path: '/events',
    waitOn: function() { return Meteor.subscribe('events'); },
    data: function() { return Events.find(); }
  });
  this.route('eventPage', {
    path: '/events/:_id',
    layoutTemplate: 'eventLayout',
    waitOn: function() { return Meteor.subscribe('singleEvent', this.params._id); },
    data: function() { return {
      eventId: this.params._id,
      event: Events.findOne(this.params._id) 
    }}
  });
  this.route('registrantsList', {
    path: '/events/:_id/registrants',
    layoutTemplate: 'eventLayout',
    waitOn: function() { return [
      Meteor.subscribe('registrants', this.params._id)
    ]},
    data: function() { return {
      eventId: this.params._id,
      registrants: Registrants.find({eventId: this.params._id}),
    }}
  });
  this.route('questionsList', {
    path: '/events/:_id/questions',
    layoutTemplate: 'eventLayout',
    data: function() { return {
      eventId: this.params._id
    }}
  });
  this.route('feedbacksList', {
    path: '/events/:_id/feedbacks',
    layoutTemplate: 'eventLayout',
    data: function() { return {
      eventId: this.params._id
    }}
  });
})