Messages = new Mongo.Collection('messages');

Messages.allow({
  insert: function (userId, doc) {
    if (userId && doc.channelId) {
      return true;
    }
  },
  update: function (userId, doc) {
    if (userId && doc.userId === userId) {
      return true;
    }
  }
});
