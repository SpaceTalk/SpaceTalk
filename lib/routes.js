FlowRouter.route('/', {
  name: 'home',
  action: function () {
    FlowLayout.render('layout');
  }
});

FlowRouter.route('/:teamId', {
  name: 'team',
  action: function () {
    FlowLayout.render('layout');
  }
});


FlowRouter.route('/:team/channels/:channel', {
  name: 'channel',
  action: function () {
    FlowLayout.render('layout', {
      main: 'channel'
    });
  }
});
