Meteor.startup(function() {
  if ( Teams.find().count() === 0 ) {
    Teams.insert({
      name: 'default',
      slug: 'default'
    });
    console.log("--------------------------");
    console.log("inserted the default team.");
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