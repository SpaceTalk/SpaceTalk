LeftSidebar = BlazeComponent.extendComponent({
  channels: function () {
    return Channels.find( { teamId: currentTeamId() } );
  },
  allUsersExceptMe: function () {
    // TODO: add limit, autoscale to sidebar height
    return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
  },
  userStatusLabel: function (userId) {
    var thisUser = Meteor.users.findOne({ _id: userId });
    var label = thisUser.status.online ? 'online' : 'offline';
    label = thisUser.status.idle ? 'idle' : label;
    return label;
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
