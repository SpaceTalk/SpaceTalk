Channels = new Mongo.Collection('channels');

if (Meteor.isServer) {
  Meteor.publish('channels', function() {
    return Channels.find();
  });
}
