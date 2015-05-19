Teams = new Meteor.Collection('teams');
Teams.friendlySlugs();

Teams.allow({
  insert: function (userId, doc) {
    if (userId && doc._channel) {
      return true;
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('myTeams', function () {
    if (this.userId) {
      //TODO: currently everyone is allowed in any team.. we probably dont want that
      return Teams.find();
    }
    this.ready();
  });
}
