ChannelInfoPinnedMessages = BlazeComponent.extendComponent({
  onCreated: function () {
  },

  onRendered: function () {
    var self = this;

    this.autorun(function () {
      console.log(App.channelInfo.pinnedMessages.isOpen.get());
      console.log(self.$('input[type="checkbox"]').prop('checked'));

      if(App.channelInfo.pinnedMessages.isOpen.get()) {
        self.$('input[type="checkbox"]').prop('checked', true)
      } else {
        self.$('input[type="checkbox"]').prop('checked', false)
      }
    });
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
      'change input[type="checkbox"]': function (event) {
        console.log(event.target);
        console.log($(event.target).prop('checked'));
        App.channelInfo.pinnedMessages.isOpen.set(!$(event.target).prop('checked'));
      }

    }
  ];
}
}).register('channelInfoPinnedMessages');
