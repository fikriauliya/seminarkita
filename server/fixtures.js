// Fixture data 
if (Events.find().count() == 0) {
  var adminId = Meteor.users.insert( {
    profile: { name: "Pahlevi Fikri Auliya"},
    password: "passw0rd"
  });

  admin = Meteor.users.findOne(adminId);

  Events.insert({
    title: "My First Event",
    description: "This is my first public event, sponsored by Google and Microsoft. There will be a lot of HACK! Enjoy!",
    userId: admin._id,
    userName: admin.profile.name,
    location: "Singapore",
    timeFrom: new Date(),
    timeTo: new Date() 
  })
}
