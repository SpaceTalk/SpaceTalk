Meteor.methods({
  'channels.add': function(teamId, channelName) {
    check(teamId, String);
    check(channelName, String);

    if (!Channels.findOne({teamId: teamId, name: channelName})) {
      return Channels.insert({
        teamId: teamId,
        name: channelName
      });
    } else {
      throw new Meteor.Error(422, 'Channel name exists');
    }
  }
});
