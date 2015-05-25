Channels = new Mongo.Collection('channels');
Channels.friendlySlugs();

Channels.helpers({
  otherUser: function() {
    otherNameId = _.reject(this.allowedUsers, function(u) {return u === Meteor.userId();})[0];
    return Meteor.users.findOne(otherNameId);
  },
  directChannelName: function() {
    user = this.otherUser();
    if (user) {
      return user.username;
    }
  },
  channelName: function() {
    if (this.direct) {
      return this.directChannelName();
    } else {
      return this.name;
    }
  },
});
