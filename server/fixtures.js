// Fixture data 
if (Meteor.users.find().count() == 0) {
  Accounts.createUser({
    email: 'pahlevi.fikri.auliya@gmail.com',
    password: "passw0rd"
  });
  Accounts.createUser({
    email: 'irmadetiarini@gmail.com',
    password: "passw0rd"
  });

  var admin = Meteor.users.findOne({emails: {$elemMatch: {address: "pahlevi.fikri.auliya@gmail.com"}}});
  var irma = Meteor.users.findOne({emails: {$elemMatch: {address: "irmadetiarini@gmail.com"}}});

  var firstEventId = Events.insert({
    title: "My First Event",
    description: "This is my first public event, sponsored by Google and Microsoft. There will be a lot of HACK! Enjoy!",
    userId: admin._id,
    userName: admin.emails[0].address,
    location: "Singapore",
    timeFrom: new Date(),
    timeTo: new Date(),
    moderatorIds: {
      registration: [admin._id, irma._id]
    }
  })

  var secondEventId = Events.insert({
    title: "My Second Event",
    description: "This is my second public event, sponsored by Google and Microsoft. There will be a lot of HACK! Enjoy!",
    userId: admin._id,
    userName: admin.emails[0].address,
    location: "Singapore",
    timeFrom: new Date(),
    timeTo: new Date(),
    moderatorIds: {
      registration: [admin._id, irma._id]
    }
  })

  for (var i = 0; i <= 500; i++) {
    Registrants.insert({
      name: "User #" + i.toString(),
      email: "email" + i.toString() + "@email.com",
      phone: 91234567,
      ownerId: admin._id,
      eventIds: [firstEventId, secondEventId],
      attendedEventIds: [i % 2 == 0 ? firstEventId : secondEventId] 
    });
  };
}