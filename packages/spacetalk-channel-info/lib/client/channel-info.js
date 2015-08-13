
SpaceTalk.channelInfo = {
  isVisible: new ReactiveVar(false),
  show: function () {
    SpaceTalk.channelInfo.isVisible.set(true);
  },
  hide: function () {
    SpaceTalk.channelInfo.isVisible.set(false);
  },
  toggle: function () {
    var currentVisiblity = SpaceTalk.channelInfo.isVisible.get();
    SpaceTalk.channelInfo.isVisible.set(!currentVisiblity);
  },
  pinnedMessages: {
    isOpen: new ReactiveVar(false),
    open: function () {
      SpaceTalk.channelInfo.pinnedMessages.isOpen.set(true);
    },
    close: function () {
      SpaceTalk.channelInfo.pinnedMessages.isOpen.set(false);
    }
  }
};
