Meteor.methods({
  'channels.add': function (teamId, channelName, options) {
    check(teamId, String);
    check(options, Match.Optional({ direct: Boolean, allowedUsers: [String] }));

    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check team exist
    if (!Teams.findOne({ _id: teamId })) {
      throw new Meteor.Error(404, 'Team does not exist');
    }

    // Insert direct channel
    if (options && options.direct) {
      // Create the channel name like userId-userId
      var directChannelName = _.sortBy(options.allowedUsers, function (user) {
        return user;
      }).join("-");
      if (!Channels.findOne({ direct: true, teamId: teamId, allowedUsers: { $in: options.allowedUsers } })) {
        console.log("created direct channel");
        var directChannel = {
          direct: true,
          teamId: teamId,
          allowedUsers: options.allowedUsers,
          name: directChannelName
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

    //// Insert direct channel
    //if (options && options.direct) {
    //  name = _.sortBy(options.allowedUsers, function(s) {return s;}).join("+");
    //  var directChannel = {direct: true, teamId: teamId, name: name, allowedUsers: options.allowedUsers };
    //  if (!Channels.findOne({direct: true, teamId: teamId, name: name, allowedUsers: options.allowedUsers })) {
    //    return Channels.insert({name: name, teamId: teamId, direct: true, allowedUsers: options.allowedUsers});
    //  } else {
    //    return Channels.update({name: name}, {$set: {name: name, teamId: teamId, direct: true, allowedUsers: options.allowedUsers}});
    //  }
    //}

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

