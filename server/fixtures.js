// Fixture data 
if (Events.find().count() == 0) {
  var adminId = Meteor.users.insert( {
    profile: { name: "Pahlevi Fikri Auliya"},
    password: "passw0rd"
  });

  Events.insert({
    title: "My First Event",
    userId: adminId,
    location: "Singapore",
    timeFrom: new Date(),
    timeTo: new Date() 
  })
}
