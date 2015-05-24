Meteor.publish('teamChannels', function (search) {
  check(search, String);
  if (this.userId) {
    var team = Teams.findOne({ $or: [{ _id: search }, { slug: search }] });
    const teamId = team ? team._id : null;
    return Channels.find({ teamId: teamId });
  }
  this.ready();
});
