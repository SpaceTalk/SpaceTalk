Users = Meteor.users

Users.helpers({
  avatar: function() {
    if (this.emails) {
      return Gravatar.imageUrl(this.emails[0].address);
    }
  },
  online: function() {
    if (this.status.online) {
      return "online";
    } else if (this.status.idle) {
      return 'idle';
    } else {
      return 'offline';
    }
  }
});
