Meteor.methods({
	'messages.delete': function (messageId) {
		check(messageId, String);
    var message = Messages.findOne(messageId);

		if (!this.userId) {
	      	throw new Meteor.Error('unauthorized-access');
		}

		if (!message) {
			throw new Meteor.Error('message-not-found');
		}

		if(isOwner('Messages', messageId)) {
      Meteor.call('channels.unpinMessage', message.channelId, messageId);
			Messages.remove(messageId);
       
		}
	}
});
