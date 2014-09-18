// Fixture data 
if (Events.find().count() == 0) {
  var adminId = Meteor.users.insert( {
    profile: { name: "Pahlevi Fikri Auliya"},
    password: "passw0rd"
  });

  admin = Meteor.users.findOne(adminId);

  Events.insert({
    title: "My First Event",
    userId: admin._id,
    userName: admin.profile.name,
    location: "Singapore",
    timeFrom: new Date(),
    timeTo: new Date() 
  })
}
