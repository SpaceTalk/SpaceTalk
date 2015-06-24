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
}