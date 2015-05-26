Messages = new Mongo.Collection('messages');

Messages.before.insert(function (userId, message) {
  message.timestamp = new Date();
  message.userId = userId;
});

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
