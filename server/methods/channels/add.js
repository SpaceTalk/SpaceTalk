Meteor.methods({
  'channels.add': function (teamId, channelName, options) {
    check(teamId, String);
    check(options, Match.Optional({ direct: Boolean, allowedUsers: [String] }));

    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check team exist
    if (!Teams.find(teamId).count()) {
      throw new Meteor.Error(404, 'Team does not exist');
    }

    // Insert direct channel
    if (options && options.direct) {
      // Create the channel name like userId-userId
      if (!Channels.find({ direct: true, teamId: teamId, allowedUsers: { $all: options.allowedUsers } }).count()) {
        var directChannel = {
          direct: true,
          teamId: teamId,
          allowedUsers: options.allowedUsers,
          name: null
        };

        return Channels.insert(directChannel);
      } else {
        return 1;
      }
    }

    check(channelName, String);

    // Get rid of extra spaces in names, lower-case it
    // (like Slack does), and trim it
    channelName = channelName.replace(/\s{2,}/g, ' ').toLowerCase().trim();

    // Insert the new channel
    if (!Channels.findOne({ teamId: teamId, name: channelName })) {
      return Channels.insert({
        teamId: teamId,
        name: channelName
      });
    } else {
      throw new Meteor.Error(422, 'Channel name exists');
    }
  }
});

