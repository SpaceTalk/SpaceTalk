LeftSidebar = BlazeComponent.extendComponent({
  channels: function () {
    return Channels.find();
  },
  currentUserAvatar: function () {
    var user = Meteor.user();
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  },
  activeChannelClass: function () {
    return currentChannelId() == this.currentData()._id ? 'active' : '';
  }
}).register('leftSidebar');
