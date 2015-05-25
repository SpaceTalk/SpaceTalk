ChannelInfo = BlazeComponent.extendComponent({
  onCreated: function () {
  },

  onRendered: function () {
  },

  pinnedMessages: function () {
    return Messages.find({
      _id: { $in: currentChannel().pinnedMessageIds } 
    });
  },

  events: function () {
    return [
    {

    }
  ];
}
}).register('channelInfo');
