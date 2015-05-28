ChannelInfoPinnedMessages = BlazeComponent.extendComponent({
  onCreated: function () {
  },

  onRendered: function () {
    var self = this;

    this.autorun(function () {
      if(App.channelInfo.pinnedMessages.isOpen.get()) {
        self.open();
      } else {
        self.close();
      }
    });
  },

  open: function () {
    var self = this;

    self.$('.channel-accordion-section').addClass('open');
  },

  close: function () {
    var self = this;

    self.$('.channel-accordion-section').removeClass('open');
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
