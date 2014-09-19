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
  this.route('attendancesList', {
    path: '/events/:_id/attendances',
    layoutTemplate: 'eventLayout',
    waitOn: function() { return [
      Meteor.subscribe('singleEvent', this.params._id),
      Meteor.subscribe('attendances', this.params._id)
    ]},
    data: function() { return {
      event: Events.findOne(this.params._id),
      attendances: Attendances.find({eventId: this.params._id})
    }}
  })
})