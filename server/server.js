Meteor.startup(function() {

  if (Meteor.users.find().count() === 0) {
    Accounts.createUser({
      email: 'admin@spacetalk.com',
      password: 'admin',
      username: 'admin'
    });

    Accounts.createUser({
      email: 'user@spacetalk.com',
      password: 'user',
      username: 'user'
    });

    console.log('--------------------------');
    console.log('inserted the default user');
    console.log('username: admin | password: admin | email: admin@spacetalk.com');
    console.log('username: user | password: user | email: user@spacetalk.com');
  }

  if (Teams.find().count() === 0) {
    var teamId = Teams.insert({
      name: 'public'
    });
    console.log('--------------------------');
    console.log('inserted the default team.');

    const aUser = Meteor.users.findOne({ username: 'admin'});
    console.log('User the user with id : '+ aUser._id);
    Channels.insert({
      name: 'general',
      teamId: teamId,
      createdBy: aUser._id,
      timestamp: new Date()
    });
    console.log('--------------------------');
    console.log('inserted the default channel by the administrator.');

  }

});
