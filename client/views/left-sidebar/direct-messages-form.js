DirectMessagesForm = BlazeComponent.extendComponent({
  onRendered: function () {
    // placeholder
  },
  events: function () {
    return [{
      'submit form': function (event) {
        // placeholder
        event.preventDefault();
      },
      'click .show-form': function (event) {
        // placeholder
        event.preventDefault();
      }
    }];
  }
}).register('directMessagesForm');
