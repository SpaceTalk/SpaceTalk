Meteor.publish('teamDirectChannels', function (search) {
  check(search, String);
  if (this.userId) {
    var team = Teams.findOne({ $or: [{ _id: search }, { slug: search }] });
    var teamId = team ? team._id : null;
    return Channels.find({ teamId: teamId, direct: true, allowedUsers: { $in: [this.userId] } });
  }
  this.ready();
});
