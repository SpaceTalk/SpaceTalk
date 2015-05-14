if (Meteor.isClient) {
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });
}
else {
  Meteor.publish("allUserNames", function () {
    if (this.userId) { // We should only send data to logged in users.
      return Meteor.users.find({}, {fields: {'profile.username': 1, 'emails': 1}});
    }
  });
}
