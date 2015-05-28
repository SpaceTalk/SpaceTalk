LeftSidebar = BlazeComponent.extendComponent({
  channels: function () {
    return Channels.find( { teamId: currentTeamId(), direct: {$ne: true} } );
  },
  directChannels: function() {
    return Channels.find( { teamId: currentTeamId(), direct: true } );
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
          var self = this;
          event.preventDefault();

          self.$(".left-sidebar-user-dropdown").toggleClass("hidden");
          self.$(".left-sidebar-user-show-dropdown").toggleClass("visible");

          $(window).bind('mouseup.left-sidebar-user-dropdown', function(e) {
            if (!self.$(e.target).closest('.left-sidebar-user')[0]) {
              self.$(".left-sidebar-user-dropdown").addClass("hidden");
              self.$(".left-sidebar-user-show-dropdown").removeClass("visible");
            }
            $(window).unbind('mouseup.left-sidebar-user-dropdown');
          });
        }
      }
    ];
  }
}).register('leftSidebar');
