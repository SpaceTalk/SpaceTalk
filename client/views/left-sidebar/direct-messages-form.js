DirectMessagesForm = BlazeComponent.extendComponent({
  onRendered: function () {
    // placeholder
  },
  allUsersExceptMe: function () {
    // TODO: add limit, autoscale to sidebar height
    return Meteor.users.find({ _id: { $ne: Meteor.userId() } });
  },
  events: function () {
    return [{
      'click .show-form': function (event, template) {
        event.preventDefault();
        this.$("#userList").toggleClass("hidden");
      },
      'click .createDirectChannel': function(event) {
        event.preventDefault();
        var options = {direct: true, allowedUsers: [Meteor.userId(), this.currentData()._id]};
        Meteor.call('channels.add', currentTeamId(), name, options, function(err, res) {
          // TODO: Figure out why this seems to redirect to the new channel
        });
      }
    }];
  }
}).register('directMessagesForm');
