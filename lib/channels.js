Channels = new Mongo.Collection('channels');
Channels.friendlySlugs();

Channels.allow({
  insert: function (userId, doc) {
    if (userId) {
      return true;
    }
  }
});
