Meteor.methods({
  'channels.add': function (teamId, channelName, options) {
    check(teamId, String);
    check(options, Match.Optional({ direct: Boolean, allowedUsers: [String] }));

    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error('unauthorized-access');
    }

    // Check team exist
    if (!Teams.findOne({ _id: teamId })) {
      throw new Meteor.Error('team-not-found');
    }

    // Insert direct channel
    if (options && options.direct) {
      // Create the channel name like userId-userId
      if (!Channels.findOne({ direct: true, teamId: teamId, allowedUsers: { $all: options.allowedUsers } })) {
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
      throw new Meteor.Error('channel-exists');
    }
  }
});

