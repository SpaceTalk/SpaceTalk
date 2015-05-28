PinnedMessage = BlazeComponent.extendComponent({
  user: function () {
    return Meteor.users.findOne({
      _id: this.currentData().userId
    });
  },

  isOwner: function () {
    return this.currentData().userId === Meteor.userId();
  },

  time: function (timestamp) {
    return moment(timestamp).format('h:mm a');
  },

  avatar: function () {
    var user = Meteor.users.findOne(this.currentData().userId);

    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  },

  events: function () {
    return [
    ];
  }
}).register('_pinnedMessage');
