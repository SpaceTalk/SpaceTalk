FlowRouter.route('/', {
  name: 'home',
  action: function () {
    FlowLayout.render('layout', {
      main: 'home'
    });
  }
});

FlowRouter.route('/channel/:_id', {
  name: 'channel',
  action: function () {
    FlowLayout.render('layout', {
      main: 'channel'
    });
  },
  middlewares: [AccountsTemplates.ensureSignedIn]
});

FlowRouter.route('/sign-out', {
  name: 'logOut',
  action: function () {
    Meteor.logout(function (error) {
      if (!error) {
        FlowRouter.go('home');
      } else {
        // What do we do if we can't log out?
      }
    });
  }
});
