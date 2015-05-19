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
  prefix: '/:team',
  middlewares: [requiredLogin, teamExists],
  subscriptions: function (params) {
    this.register('teamChannels', Meteor.subscribe('teamChannels', params.team));
    this.register('teamUsers', Meteor.subscribe('teamUsers', params.team));
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

function requiredLogin(path, next) {
  // this works only because the use of Fast Render
  var redirectPath = (!Meteor.userId()) ? "/" : null;
  next(redirectPath);
}

function teamExists(path, next) {
  const team = currentTeam();
  next();
}
