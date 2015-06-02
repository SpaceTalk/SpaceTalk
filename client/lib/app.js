App = {
  channelInfo: {
    isVisible: new ReactiveVar(false),
    show: function () {
     App.channelInfo.isVisible.set(true);
    },
    hide: function () {
     App.channelInfo.isVisible.set(false);
    },
    toggle: function () {
      var currentVisiblity = App.channelInfo.isVisible.get();
      App.channelInfo.isVisible.set(!currentVisiblity);
    },
    pinnedMessages: {
      isOpen: new ReactiveVar(false),
      open: function () {
        console.log('channelInfo.pinnedMessages.open');
        App.channelInfo.pinnedMessages.isOpen.set(true);
      },
      close: function () {
        App.channelInfo.pinnedMessages.isOpen.set(false);
      }
    }
  }
};
