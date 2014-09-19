// Fixture data 
if (Events.find().count() == 0) {
  var adminId = Meteor.users.insert( {
    profile: { name: "Pahlevi Fikri Auliya"},
    password: "passw0rd"
  });

  var admin = Meteor.users.findOne(adminId);

  var firstEventId = Events.insert({
    title: "My First Event",
    description: "This is my first public event, sponsored by Google and Microsoft. There will be a lot of HACK! Enjoy!",
    userId: adminId,
    userName: admin.profile.name,
    location: "Singapore",
    timeFrom: new Date(),
    timeTo: new Date(),
  })

  var secondEventId = Events.insert({
    title: "My Second Event",
    description: "This is my second public event, sponsored by Google and Microsoft. There will be a lot of HACK! Enjoy!",
    userId: adminId,
    userName: admin.profile.name,
    location: "Singapore",
    timeFrom: new Date(),
    timeTo: new Date(),
  })

  for (var i = 0; i <= 500; i++) {
    Registrants.insert({
      name: "User #" + i.toString(),
      email: "email" + i.toString() + "@email.com",
      phone: 91234567,
      ownerId: adminId,
      eventIds: [firstEventId, secondEventId],
      attendedEventIds: [i % 2 == 0 ? firstEventId : secondEventId] 
    });
  };
}