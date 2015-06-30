displayErrorMessage=function(errorCode, replacements) {
	var errorOptions = errorMessages[errorCode] || errorMessages['default'];
	swal(errorOptions(replacements));
}

getErrorMessage=function(errorCode, replacements) {
	var errorOptions = errorMessages[errorCode] || errorMessages['default'];
	return errorOptions(replacements);
}

errorMessages = {
	'default': function() {
		return {
			title: 'Yikes! Something went wrong',
			text: '',
			type: 'error'
		};
	},
	'channel-exists': function(replacements) {
		return {
			title: 'Channel name exists',
			text: 'Please consider joining the existing channel ' + replacements.channelButton + '<br>or create a different channel.',
			type: 'error'
		};
	},
	'unauthorized-access': function() {
		return {
			title: 'Yikes! Something went wrong',
			text: "We can't complete your request at the moment, are you still online?",
			type: 'error'
		};
	},
	'team-not-found': function() {
		return {
			title: 'Yikes! Something went wrong',
			text: "We can't find your team at the moment, are you still online?",
			type: 'error'
		};
	},
	'channel-not-found': function() {
		return {
			title: 'Yikes! Something went wrong',
			text: "We can't find the channel at the moment, are you still online?",
			type: 'error'
		};
	},
	'message-not-found': function() {
		return {
			title: 'Yikes! Something went wrong',
			text: "We can't find the message at the moment, are you still online?",
			type: 'error'
		};
	}
}