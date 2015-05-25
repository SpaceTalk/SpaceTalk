Meteor.methods({
  'channels.pinMessage': function(channelId, messageId) {
    check(channelId, String);
    check(messageId, String);
    
    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check channel exists
    if (!Channels.findOne({ _id: channelId })) {
      throw new Meteor.Error(404, 'Channel does not exist');
    }

    // Check message exists
    if (!Messages.findOne({ _id: messageId })) {
      throw new Meteor.Error(404, 'Message does not exist');
    }
    
    return Channels.update(channelId,
      {
        $addToSet: {
          pinnedMessageIds: messageId
        }
      }); 
  }
});
