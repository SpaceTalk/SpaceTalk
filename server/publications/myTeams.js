Meteor.publish('myTeams', function () {
  if (this.userId) {
    //TODO: currently everyone is allowed in any team.. we probably dont want that
    return Teams.find();
  }
  this.ready();
});
