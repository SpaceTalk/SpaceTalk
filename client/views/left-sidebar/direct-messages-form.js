DirectMessagesForm = BlazeComponent.extendComponent({
  onRendered: function () {
    // placeholder
  },
  events: function () {
    return [{
      'click .show-form': function (event, template) {
        event.preventDefault();
        this.$("#userList").toggleClass("hidden");
      }
    }];
  }
}).register('directMessagesForm');
