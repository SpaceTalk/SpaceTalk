Meteor.methods({
	'messages.delete': function (messageId) {
		check(messageId, String);
		if (!this.userId) {
	      	throw new Meteor.Error(401, 'Unauthorized access');
		}

		if (!Messages.findOne(messageId)) {
			throw new Meteor.Error(404, 'Message does not exist')
		}

		if(isOwner('Messages', messageId)) {
			Messages.remove(messageId);
		}
	}
});