LeftSidebar = BlazeComponent.extendComponent({
  channels: function () {
    return Channels.find( { teamId: currentTeamId() } );
  },
  currentUserAvatar: function () {
    var user = Meteor.user();
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  },
  activeChannelClass: function () {
    return currentChannelId() == this.currentData()._id ? 'active' : '';
  },
  events: function() {
    return [
      {
        'click .sign-out': function(event) {
          event.preventDefault();

          Meteor.logout();
          FlowRouter.go('home');
        }
      }
    ]
  }
}).register('leftSidebar');
