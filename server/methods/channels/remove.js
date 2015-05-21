Meteor.methods({
  'channels.remove': function(channelId) {
    check(channelId, String);
    
    Messages.remove({channelId: channelId});
    Channels.remove({_id: channelId});
  }
});
