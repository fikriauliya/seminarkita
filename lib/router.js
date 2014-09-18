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
    waitOn: function() { return Meteor.subscribe('singleEvent', this.params._id); },
    data: function() { return Events.findOne(this.params._id); }
  });
})