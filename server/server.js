Meteor.startup(function() {
  if ( Teams.find().count() === 0 ) {
    const teamId = Teams.insert({
      name: 'public'
    });
    console.log("--------------------------");
    console.log("inserted the default team.");

    Channels.insert({
      name: 'general',
      teamId: teamId
    });
    console.log("--------------------------");
    console.log("inserted the default channel.");

  }

  if( Meteor.users.find().count() === 0 ) {
    Accounts.createUser({
      email: "admin@spacetalk.com",
      password: "admin",
      username: "admin"
    });
    console.log("--------------------------");
    console.log("inserted the default user");
    console.log("username: admin | password: admin | email: admin@spacetalk.com");
  }
});
