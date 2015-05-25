Meteor.methods({
  'channels.add': function(teamId, channelName) {
    check(teamId, String);
    check(channelName, String);

    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check team exist
    if (!Teams.findOne({ _id: teamId })) {
      throw new Meteor.Error(404, 'Team does not exist');
    }

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
  },

  'channels.updateTopic': function (id, topic) {
    check(id, String);
    check(topic, String);

    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check team exist
    if (!Channels.findOne({ _id: id })) {
      throw new Meteor.Error(404, 'Channel does not exist');
    }

    Channels.update(id, {
      $set: {topic: topic}
    });
  }
});
