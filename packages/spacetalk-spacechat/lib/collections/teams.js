SpaceChat.Teams = new Meteor.Collection('spacechat.teams');
SpaceChat.Teams.friendlySlugs();

SpaceChat.Teams.allow({
  insert: function (userId, doc) {
    if (userId && doc.channelId) {
      return true;
    }
  }
});
