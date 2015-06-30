Meteor.methods({
  'channels.pinMessage': function(channelId, messageId) {

    check(channelId, String);
    check(messageId, String);
    
    // Check user authenticated
    if (!this.userId) {
      throw new Meteor.Error('unauthorized-access');
    }

    // Check channel exists
    if (!Channels.findOne({ _id: channelId })) {
      throw new Meteor.Error('channel-not-found');
    }

    // Check message exists
    if (!Messages.findOne({ _id: messageId })) {
      throw new Meteor.Error('message-not-found');
    }
    
    // Using Channels.direct to get around an issue with Collection Hooks
    // not allowing updates without a $set
    return Channels.direct.update(channelId,
      {
        $addToSet: {
          pinnedMessageIds: messageId
        }
      }
    ); 
  }
});
