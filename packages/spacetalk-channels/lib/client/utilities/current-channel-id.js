currentChannelId = function () {
  var channel = currentChannel();
  return channel ? channel._id : null;
};
