Meteor.methods({

  'spacechat.channels.updateTopic': function (id, topic) {
    check(id, String);
    check(topic, String);

    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check channel exists
    if (!SpaceChat.Channels.findOne({ _id: id })) {
      throw new Meteor.Error(404, 'Channel does not exist');
    }

    SpaceChat.Channels.update(id, {
      $set: {topic: topic}
    });
  },

  'spacechat.channels.updatePurpose': function (id, purpose) {
    check(id, String);
    check(purpose, String);

    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check channel exists
    if (!SpaceChat.Channels.findOne({ _id: id })) {
      throw new Meteor.Error(404, 'Channel does not exist');
    }

    return SpaceChat.Channels.update(id, {
      $set: {purpose: purpose}
    });
  }
});
