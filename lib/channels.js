Channels = new Mongo.Collection('channels');
Channels.friendlySlugs();

Channels.helpers({
  directChannelName: function() {
    otherNameId = _.reject(this.allowedUsers, function(u) {return u === Meteor.userId();})[0];
    user = Meteor.users.findOne(otherNameId);
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

Channels.allow({
  insert: function (userId, doc) {
    if (userId) {
      // Shouldn't this be locked down now that we are using a method?
      return true;
    }
  }
});
