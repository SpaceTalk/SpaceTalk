FlowRouter.route('/', {
  name: 'home',
  action: function () {
    FlowLayout.render('defaultLayout', {
      main: 'home'
    });
  }
});

// Define the teamRoutes group and prefix all these routes with the team slug
teamRoutes = FlowRouter.group({
  prefix: '/teams/:team',
  middlewares: [requiredLogin, teamExists],
  subscriptions: function (params) {
    this.register('teamChannels', Meteor.subscribe('teamChannels', params.team));
    this.register('users', Meteor.subscribe('users', params.team));
    this.register('teams', Meteor.subscribe('myTeams'));
  }
});

teamRoutes.notFound = {
  action: function () {
    FlowLayout.render('teamLayout', {
      main: 'notFound'
    });
  }
};

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
  },
  middlewares: [AccountsTemplates.ensureSignedIn]
});

FlowRouter.route('/contributors', {
  name: 'contributors',
  action: function () {
    FlowLayout.render('defaultLayout', {
      main: 'home'
    });
  }
});

function requiredLogin(path, next) {
  // this works only because the use of Fast Render
  var redirectPath = (!Meteor.userId()) ? "/" : null;
  next(redirectPath);
}

function teamExists(path, next) {
  const team = currentTeam();
  next();
}
