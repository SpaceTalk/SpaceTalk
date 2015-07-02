Meteor.publish('users', function () {
  if (this.userId) { // We should only send data to logged in users.
    return Meteor.users.find({}, { fields: { 'username': 1, 'emails': 1, 'status': 1 } });
  }
  this.ready();
});
