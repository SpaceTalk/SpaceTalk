FlowRouter.route('/contributors', {
  name: 'contributors',
  subscriptions: function() {
    this.register('contributors', Meteor.subscribe('projectContributors'));
  },
  action: function () {
    FlowLayout.render('defaultLayout', {
      main: 'contributors'
    });
  }
});
