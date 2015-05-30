Meteor.methods({
	'messages.delete': function (messageId) {
		check(messageId, String);
    var message = Messages.findOne(messageId);

		if (!this.userId) {
	      	throw new Meteor.Error(401, 'Unauthorized access');
		}

		if (!message) {
			throw new Meteor.Error(404, 'Message does not exist');
		}

		if(isOwner('Messages', messageId)) {
      Meteor.call('channels.unpinMessage', message.channelId, messageId);
			Messages.remove(messageId);
       
		}
	}
});
