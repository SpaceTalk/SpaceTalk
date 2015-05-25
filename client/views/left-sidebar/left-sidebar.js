LeftSidebar = BlazeComponent.extendComponent({
  channels: function () {
    return Channels.find( { teamId: currentTeamId(), direct: {$ne: true} } );
  },
  directChannels: function() {
    return Channels.find( { teamId: currentTeamId(), direct: true } );
  },
  currentUser: function () {
    return Meteor.user();
  },
  activeChannelClass: function () {
    return currentChannelId() == this.currentData()._id ? 'active' : '';
  },
  events: function() {
    return [
      {
        'click .sign-out': function(event) {
          event.preventDefault();

          Meteor.logout(function (err) {
            if (!err) {
              FlowRouter.go('home');
            }
          });
        },

        'click .left-sidebar-user-show-dropdown': function(event) {
          event.preventDefault();

          this.$(".left-sidebar-user-dropdown").toggleClass("hidden");
        }
      }
    ]
  }
}).register('leftSidebar');
