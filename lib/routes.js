FlowRouter.route('/', {
  name: 'home',
  subscriptions: function() {
    this.register('teams', Meteor.subscribe('myTeams'));
  },
  action: function () {
    FlowLayout.render('defaultLayout', {
      main: 'home'
    });
  }
});

// Define the teamRoutes group and prefix all these routes with the team slug
teamRoutes = FlowRouter.group({
  prefix: '/teams/:team',
  middlewares: [AccountsTemplates.ensureSignedIn],
  subscriptions: function (params) {
    this.register('teamChannels', Meteor.subscribe('teamChannels', params.team));
    this.register('teamDirectChannels', Meteor.subscribe('teamDirectChannels', params.team));
    this.register('users', Meteor.subscribe('users', params.team));
    this.register('teams', Meteor.subscribe('myTeams'));
  }
});

teamRoutes.route('/', {
  name: 'teamHome',
  action: function () {
    FlowLayout.render('teamLayout', {
      main: 'teamHome'
    });
  }
});

teamRoutes.route('/channels/:channel', {
  name: 'channel',
  action: function () {
    FlowLayout.render('teamLayout', {
      main: 'channel'
    });
  }
});

FlowRouter.route('/contributors', {
  name: 'contributors',
  action: function () {
    FlowLayout.render('defaultLayout', {
      main: 'home'
    });
  }
});

FlowRouter.notFound = {
  action: function () {
    FlowLayout.render('teamLayout', {
      main: 'notFound'
    });
  }
};
