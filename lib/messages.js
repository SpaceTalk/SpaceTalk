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

if (Meteor.isServer) {
  Meteor.publish('messages', function (search) {
    if (this.userId) {
      // TODO: checking if the user has access to these messages
      const channel = Channels.findOne({ $or: [{ _id: search }, { slug: search }] });
      const channelId = channel ? channel._id : null;
      return Messages.find({ channelId: channelId });
    }
    this.ready();
  });
}
