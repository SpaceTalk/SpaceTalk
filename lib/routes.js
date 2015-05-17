FlowRouter.route('/', {
  name: 'home',
  action: function () {
    FlowLayout.render('layout');
  }
});

FlowRouter.route('/channel/:_id', {
  name: 'channel',
  action: function () {
    FlowLayout.render('layout', {
      main: 'channel'
    });
  }
});
