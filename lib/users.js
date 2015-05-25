Users = Meteor.users

Users.helpers({
  avatar: function() {
    if (!_.isEmpty(this.emails)) {
      return Gravatar.imageUrl(this.emails[0].address);
    }
  },
  online: function() {
    if (this.status) {
      if (this.status.online) {
        return "online";
      } else if (this.status.idle) {
        return 'idle';
      } else {
        return 'offline';
      }
    }
  }
});
