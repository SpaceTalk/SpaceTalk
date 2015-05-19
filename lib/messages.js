Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Messages.allow({
    insert: function (userId, doc) {
      if (userId && doc.channelId) {
        return true;
      }
    }
  });

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
