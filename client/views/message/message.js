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
      if (!previous || previous.userId != current.userId
        || moment(current.timestamp).diff(previous.timestamp) >= 120000) {
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

    if (previous && previous.userId == current.userId
      && moment(current.timestamp).diff(previous.timestamp) < 120000) {
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
      self.$('textarea').autosize();
      $(document.body).bind('mouseup.edit-message', function() {
        if (!$(event.target).is(self.$('.form-message-input'))) {
          self.isEditing.set(false);
          $(document.body).unbind('mouseup.edit-message');
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
          var self = this;
          if (event.keyCode === 27 && !event.shiftKey) { // esc to cancel
            event.preventDefault();
            self.toggleEditMode();
          } else if (event.keyCode === 13 && !event.shiftKey) { // enter to save
            event.preventDefault();

            var value = self.find('.form-message-input').value;
            // Markdown requires double spaces at the end of the line to force line-breaks.
            value = value.replace(/([^\n])\n/g, "$1  \n");

            // Prevent accepting empty message
            if ($.trim(value) === "") return;

            Messages.update(self.currentData()._id, {
              $set: { message: value }
            });

            self.toggleEditMode();

            var position = self.$('.message .cursor').position();
            if (position) {
              var width = position.left;
              self.$('.modify').css({
                left: Math.max(width, 25) + 8
              });
            }
          }
        },

        'mouseover .message-body': function(event) {
          var self = this;
          if (self.currentData().userId === Meteor.userId()) {
            var position = self.$('.message .cursor').position();
            if (position) {
              var width = position.left;
              self.$('.modify').css({
                left: Math.max(width, 25) + 8
              });
            }
          }
        },

        'click .delete': function (event) {
          event.preventDefault();

          Meteor.call('messages.delete', this.currentData()._id,
            function (error) {
              if (error) {
                swal({
                  title: 'Yikes! Something went wrong',
                  text: error.reason,
                  type: 'error'
                });
              } else {
                swal({
                  title: 'Message deleted',
                  text:  'Message deleted successfully',
                  type: 'success',
                  html: true
                });
              }
            }
          );
        }
      }];
  }
}).register('message');
