Teams = new Meteor.Collection('teams');
Teams.friendlySlugs();

Teams.allow({
  insert: function (userId, doc) {
    if (userId && doc._channel) {
      return true;
    }
  }
});
