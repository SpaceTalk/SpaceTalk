Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Messages.allow({
    insert: function (userId, doc) {
      if (userId && doc.channelId) {
        return true;
      }
    }
  });

  Meteor.publish('messages', function (channelId) {
    if (this.userId) {
      // TODO: checking if the user has access to these messages
      return Messages.find({ channelId: channelId });
    }
    this.ready();
  });
}
