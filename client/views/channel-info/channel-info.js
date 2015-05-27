ChannelInfo = BlazeComponent.extendComponent({
  onCreated: function () {
  },

  onRendered: function () {
  },

  pinnedMessages: function () {
    if (currentChannel().pinnedMessageIds) {
      return Messages.find({
        _id: { $in: currentChannel().pinnedMessageIds } 
      });
    }
  },

  events: function () {
    return [
    {

    }
  ];
}
}).register('channelInfo');
