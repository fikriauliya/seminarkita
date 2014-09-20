Router.configure({
  layoutTemplate: 'layout',
  loadingTemplate: 'loading',
})

Router.map(function(){
  this.route('home', {path: '/'});
  this.route('eventNew', {path: '/events/new'})
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
      event: Events.findOne(this.params._id),
    }}
  });
  this.route('registrantsList', {
    path: '/events/:_id/registrants',
    layoutTemplate: 'eventLayout',
    waitOn: function() { return [
      Meteor.subscribe('registrants', this.params._id),
      Meteor.subscribe('singleEvent', this.params._id)
    ]},
    data: function() { return {
      eventId: this.params._id,
      event: Events.findOne(this.params._id),
      registrants: Registrants.find({eventIds: {$elemMatch: { $in: [this.params._id]}}}, {sort: {name:1, phone:1, email:1}}),
      isModerator: function() {
        if (Meteor.user()) {
          return Events.find({_id: this.eventId, 'moderatorIds.registration': {$elemMatch: { $in: [Meteor.userId()]}}}).count() > 0;
        } else {
          return false;
        }}
    }},
    action: function() {
      if (this.ready()) {
        this.render();
      } 
    }
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


var requireLogin = function(pause) {
  if (! Meteor.user()) {
    if (Meteor.loggingIn())
      this.render(this.loadingTemplate);
    else
      this.render('accessDenied');
    
    pause();
  }
}

Router.onBeforeAction(requireLogin, {only: 'eventNew'});