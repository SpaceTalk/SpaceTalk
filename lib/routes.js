FlowRouter.route('/', {
  name: 'home',
  action: function () {
    FlowLayout.render('layout', {
      aside: 'home'
    });
  }
});

FlowRouter.route('/channel/:_id', {
  name: 'channel',
  action: function () {
    FlowLayout.render('layout', {
      header: 'channelHeader',
      body: 'channel',
      aside: 'home',
      footer: 'messageForm'
    });
  }
});