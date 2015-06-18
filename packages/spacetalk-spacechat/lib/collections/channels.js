SpaceChat.Channels = new Mongo.Collection('spacechat.channels');

SpaceChat.Channels.friendlySlugs();

SpaceChat.Channels.before.insert(function (userId, channel) {
  channel.timestamp = new Date();
  if (userId) {
    channel.createdBy = userId;
  }
});

SpaceChat.Channels.allow({
  update: function (userId, doc) {
    if (userId) {
      return true;
    }
  }
});

SpaceChat.Channels.helpers({
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
  }
});
