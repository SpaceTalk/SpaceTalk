Meteor.publish('teamChannels', function (search) {
  check(search, String);
  if (this.userId) {
    var team = Teams.findOne({ $or: [{ _id: search }, { slug: search }] });
    var teamId = team && team._id;
    return Channels.find({ teamId: teamId, direct: { $ne: true } });
  }
  this.ready();
});
