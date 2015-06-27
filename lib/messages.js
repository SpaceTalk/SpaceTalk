Messages = new Mongo.Collection('messages');

Messages.helpers({
  /*
   * Grabs the urls out of the messages and returns them back in an array.
   */
  'messageUrls': function () {
    var urls = [];

    // If the message is not empty
    if (this.message) {
      // An huge ass regex to grab the url out of a string (see: http://blogs.lse.ac.uk/lti/2008/04/23/a-regular-expression-to-match-any-url/)
      urls = this.message.match(/([A-Za-z]{3,9}):\/\/([-;:&=\+\$,\w]+@{1})?([-A-Za-z0-9\.]+)+:?(\d+)?((\/[-\+~%/\.\w]+)?\??([-\+=&;%@\.\w]+)?#?([\w]+)?)?/g);
    }

    return urls;
  }
});

Messages.before.insert(function (userId, message) {
  message.timestamp = new Date();
  message.userId = userId;
});

Messages.before.update(function (userId, doc, fieldNames, modifier, options) {
  modifier.$set = modifier.$set || {};
  // Add modifiedTimestamp field only when message content really changed
  if (modifier.$set.message != doc.message) {
    modifier.$set.modifiedTimestamp = new Date();
  }
  //The message owner can't update userId and timestamp
  if (!_.isEmpty(_.intersection(fieldNames, ['userId', 'timestamp']))) {
    throw new Meteor.Error('default', 'You are not allowed to update some fields');
  }

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
  },
  remove: function (userId, doc) {
    if (userId && doc.userId === userId) {
      return true;
    }
  }
});
