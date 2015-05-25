Meteor.methods({
  'channels.add': function(teamId, channelName, options) {
    console.log(options)
    check(teamId, String);
    check(channelName, String);
    check(options, Match.Optional({direct: Boolean, allowedUsers: [String]}));

    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check team exist
    if (!Teams.findOne({_id: teamId})) {
      throw new Meteor.Error(404, 'Team does not exist');
    }

    // Insert direct channel
    if (options && options.direct) {
      name = _.sortBy(options.allowedUsers, function(s) {return s;}).join("+");
      if (!Channels.findOne({teamId: teamId, name: name})) {
        return Channels.insert({name: name, teamId: teamId, direct: true, allowedUsers: options.allowedUsers});
      } else {
        return Channels.update({name: name}, {$set: {name: name, teamId: teamId, direct: true, allowedUsers: options.allowedUsers}});
      }
    }
    // Insert the new channel
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
