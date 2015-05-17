Channel = BlazeComponent.extendComponent({
  onCreated: function() {
    var self = this;
    // Listen for changes to reactive variables (such as FlowRouter.getParam()).
    self.autorun(function() {
      var channel = currentRouteId();
      channel && self.subscribe('messages', channel, function() {
        scrollDown();
      });
    });
  },
  onRendered: function() {

    // Observe the changes on the messages for this channel
    Messages.find({
      _channel: currentRouteId()
    }).observeChanges({
      // When a new message is added
      added: function(id, doc) {
        // Trigger the scroll down method which determines whether to scroll down or not
        scrollDown();
      }
    });

    $('article').css({
      'padding-bottom': $('footer').outerHeight()
    });
  },
  messages: function() {
    var _id = currentRouteId();
    return Messages.find({
      _channel: _id
    });
  },
  channel: function() {
    var _id = currentRouteId();
    return Channels.findOne({
      _id: _id
    });
  },
  events: function() {
    return [{
      'keydown .message-input': function(event) {
        if (event.keyCode == 13 && !event.shiftKey) { // Check if enter was pressed (but without shift).
          event.preventDefault();
          var _id = currentRouteId();
          var value = this.find('textarea').value;
          // Markdown requires double spaces at the end of the line to force line-breaks.
          value = value.replace("\n", "  \n");
          this.find('.message-input').value = ''; // Clear the textarea.
          Messages.insert({
            _channel: _id, // Channel reference.
            message: value,
            _userId: Meteor.userId(), // Add userId to each message.
            timestamp: new Date() // Add a timestamp to each message.
          });
          // Restore the autosize value.
          this.$('.message-input').css({
            height: 37
          });
          window.scrollTo(0, document.body.scrollHeight);
        }
        $('article').css({
          'padding-bottom': $('footer').outerHeight()
        });
      }
    }];
  }
}).register('Channel');

/**
 * Scrolls down the page when the user is a at or nearly at the bottom of the page
 */
var scrollDown = function() {
  // Check if the innerHeight + the scrollY position is higher than the offsetHeight - 200
  if ((window.innerHeight + window.scrollY) >= (Number(document.body.offsetHeight) - 200)) {
    // Scroll down the page
    window.scrollTo(0, document.body.scrollHeight);
  }
}
