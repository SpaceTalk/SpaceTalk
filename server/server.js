Meteor.startup(function() {

  if (Meteor.users.find().count() === 0) {

    console.log('--------------------------');
    console.log('inserted the default user(s)');

    var usernames = ['admin', 'user', 'user1', 'user2', 'user3', 'user4', 'user5'];

    usernames.forEach(function(username) {
      Accounts.createUser({
        email: username + '@spacetalk.com',
        password: username,
        username: username
      });

      console.log('username: ' +  username + ' | password: ' + username +' | email: ' + username + '@spacetalk.com');
    });
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
