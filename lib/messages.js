Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Messages.allow({
    insert: function (userId, doc) {
      if (userId && doc._channel) {
        return true;
      }
    },
    update: function (userId, doc) {
      if (userId && doc._userId === userId) {
        return true;
      }
    }
  });

  Meteor.publish('messages', function (channel) {
    if (this.userId) {
      return Messages.find({_channel: channel});
    }
    this.ready();
  });
}
