Message = BlazeComponent.extendComponent({
  onCreated: function () {
    this.isEditing = new ReactiveVar(false);
  },

  _focus: function () {
    var input = this.find('.form-message-input');
    input.focus();

    if (input.setSelectionRange) {
      var len = input.value.length * 2;
      input.setSelectionRange(len, len);
    } else {
      $(input).val($(input).val());
    }

    input.scrollTop = 999999;
  },

  _removeTrailingNewLine: function (content) {
    return content.replace(/\s+$/g, '');
  },

  user: function () {
    return Meteor.users.findOne({
      _id: this.currentData().userId
    });
  },

  isOwner: function () {
    return this.currentData().userId === Meteor.userId();
  },

  time: function (timestamp) {
    return moment(timestamp).format('h:mm a');
  },

  avatar: function () {
    var self = this,
        previous = self.previousMessage(),
        current = self.currentData();
    var user = Meteor.users.findOne(this.currentData().userId);

    if (user && user.emails) {
      if (!previous || previous.userId != current.userId) {
        return Gravatar.imageUrl(user.emails[0].address);
      }
    }
  },

  previousMessage: function() {
    var self = this,
        current = self.currentData();

    return Messages.findOne({
      channelId: currentChannelId(),
      timestamp: {$lt: current.timestamp}
    }, {sort: {timestamp: -1}, limit:1});
  },

  isNewAuthor: function() {
    var self = this,
        previous = self.previousMessage(),
        current = self.currentData();

    if (previous && previous.userId == current.userId) {
      return false;
    }
    return true;
  },

  toggleEditMode: function () {
    var self = this;

    var toggled = !self.isEditing.get();
    self.isEditing.set(toggled);

    Tracker.flush();
    if (toggled) {
      $(document.body).bind('mouseup', function() {
        if (!$(event.target).is(self.$('.form-message-input'))) {
          self.isEditing.set(false);
        }
      });
      self._focus();
    }
  },

  events: function () {
    return [
      {
        'click .edit': function (event) {
          event.preventDefault();
          this.toggleEditMode();
        },

        'keydown .edit-box': function (event) {
          if (event.keyCode === 27 && !event.shiftKey) { // esc to cancel
            event.preventDefault();
            this.toggleEditMode();
          } else if (event.keyCode === 13 && !event.shiftKey) { // enter to save
            event.preventDefault();

            var content = this.find('.form-message-input').value;
            Messages.update(this.currentData()._id, {
              $set: { message: content }
            });

            this.toggleEditMode();
          }
        }
      }];
  }
}).register('message');
