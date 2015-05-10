Messages = new Mongo.Collection('messages');

if (Meteor.isServer) {
  Meteor.publish('messages', function(channel) {
    return Messages.find({_channel: channel});
  });
}
