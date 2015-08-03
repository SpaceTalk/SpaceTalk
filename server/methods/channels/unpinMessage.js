Meteor.methods({
  'channels.unpinMessage': function(channelId, messageId) {

    check(channelId, String);
    check(messageId, String);
    
    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error(401, 'Unauthorized access');
    }

    // Check channel exists
    if (!Channels.find(channelId).count()) {
      throw new Meteor.Error(404, 'Channel does not exist');
    }

    // Check message exists
    if (!Messages.find(messageId).count()) {
      throw new Meteor.Error(404, 'Message does not exist');
    }

    // Using Channels.direct to get around an issue with Collection Hooks
    // not allowing updates without a $set
    return Channels.direct.update(channelId,
      {
        $pull: {
          pinnedMessageIds: messageId
        }
      }
    ); 
  }
});
