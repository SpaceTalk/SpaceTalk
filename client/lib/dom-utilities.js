DOM = {};
DOM.ChannelInfoBar = { 
  toggle: function () {
    console.log('DOM.ChannelInfoBar.toggle()');
    $('.channel-info').toggleClass('channel-info-out');
    $('.channel-content').toggleClass('channel-content-full');
    $('.channel-footer').toggleClass('channel-footer-full');
  },
  open: function () {
    $('.channel-info').removeClass('channel-info-out');
    $('.channel-content').removeClass('channel-content-full');
    $('.channel-footer').removeClass('channel-footer-full');

  },
  close: function () {
    $('.channel-info').addClass('channel-info-out');
    $('.channel-content').addClass('channel-content-full');
    $('.channel-footer').addClass('channel-footer-full');
  }
};
