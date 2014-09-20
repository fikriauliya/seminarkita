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
});

Template.registrantsList.created = function() {
  this.filter = new ReactiveVar("");
}

Template.registrantsList.events({
  "input .filter":function(e){
    var currentValue = $(e.target).val();
    Template.instance().filter.set(currentValue);
  }
});


// // on create, initialize our filter as a ReactiveVar
// // need to meteor add reactive-var to use this
// Template.persons.created=function(){
//   this.filter=new ReactiveVar(20);
// };

// Template.persons.helpers({
//   // value of the filter to initialize the HTML input
//   filter:function(){
//     return Template.instance().filter.get();
//   },
//   // reactively return the persons who are older than the input value
//   personsFiltered:function(){
//     return Persons.find({
//       age:{
//         $gt:Template.instance().filter.get()
//       }
//     });
//   }
// });

// bind the value of the input to the underlying filter
// Template.persons.events({
//   "input .age":function(event,template){
//     var currentValue=template.find(".age").valueAsNumber;
//     template.filter.set(currentValue);
//   }
// });