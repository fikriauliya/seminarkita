Router.configure({
  layoutTemplate: 'layout'
})

Router.map(function(){
  this.route('home', {path: '/'});
  this.route('events_list', {
    path: '/events',
    waitOn: function() { 
      return Meteor.subscribe('events');
    },
    data: function() {
      return Events.find();
    }
  });
})