LeftSidebar = BlazeComponent.extendComponent({
  onCreated: function () {
    this.subscribe('channels');
    this.subscribe('allUserNames');
  },
  channels: function () {
    return Channels.find();
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
  currentUseravatar: function () {
    var user = Meteor.user();
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  },
  activeChannelClass: function () {
    var _id = currentRouteId();
    return _id == this.currentData()._id ? 'active' : '';
  },
}).register('leftSidebar');
