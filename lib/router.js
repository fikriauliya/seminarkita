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
    data: function() { 
      return Events.findOne(this.params._id); }
  });
  this.route('registrantsList', {
    path: '/events/:_id/registrants',
    layoutTemplate: 'eventLayout',
    waitOn: function() { return [
      Meteor.subscribe('singleEvent', this.params._id),
      Meteor.subscribe('registrants', this.params._id)
    ]},
    data: function() { return {
      event: Events.findOne(this.params._id),
      registrants: Registrants.find({eventId: this.params._id})
    }}
  })
})