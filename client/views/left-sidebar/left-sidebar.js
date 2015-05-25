LeftSidebar = BlazeComponent.extendComponent({
  channels: function () {
    return Channels.find( { teamId: currentTeamId() } );
  },
  allUsersExceptMe: function () {
    // TODO: add limit, autoscale to sidebar height
    return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
  },
  userStatusLabel: function () {
    var parent = this.currentData();
    var statusLabel = parent.status.online ? 'online' : parent.status.idle ? 'idle' : 'offline';
    return statusLabel;
  },
  currentUserAvatar: function () {
    var user = Meteor.user();
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  },
  activeChannelClass: function () {
    return currentChannelId() === this.currentData()._id ? 'active' : '';
  },
  events: function () {
    return [
      {
        'click .sign-out': function (event) {
          event.preventDefault();

          Meteor.logout(function (error) {
            if (!error) {
              FlowRouter.go('home');
            }
          });
        },

        'click .left-sidebar-user-show-dropdown': function (event) {
          event.preventDefault();

          this.$(".left-sidebar-user-dropdown").toggleClass("hidden");
        }
      }
    ];
  }
}).register('leftSidebar');
