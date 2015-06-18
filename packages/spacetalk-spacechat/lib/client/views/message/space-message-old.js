var isEditing = new ReactiveVar(false);

var previousMessage = function (message) {
  return Messages.findOne({
    channelId: currentChannelId(),
    timestamp: { $lt: message.timestamp }
  }, { sort: { timestamp: -1 }, limit: 1 });
};

var focusOnMessage = function () {
  var input = this.find('.form-message-input');
  input.focus();

  if (input.setSelectionRange) {
    var len = input.value.length * 2;
    input.setSelectionRange(len, len);
  } else {
    $(input).val($(input).val());
  }

  input.scrollTop = 999999;
};

var getUser = function (userId) {
  return Meteor.users.findOne({
    _id: userId
  });
};

Template.spaceMessage.helpers({

  avatar: function () {
    var previous = previousMessage(this),
      user = getUser(this.userId);

    if (user && user.emails) {
      if (!previous || previous.userId != this.userId
        || moment(this.timestamp).diff(previous.timestamp) >= 120000) {
        return Gravatar.imageUrl(user.emails[0].address);
      }
    }
  },

  user: function () {
    return getUser(this.userId);
  },

  isOwner: function () {
    return this.userId === Meteor.userId();
  },

  time: function (timestamp) {
    return moment(timestamp).format('h:mm a');
  },

  isNewAuthor: function () {
    var previous = previousMessage(this);

    return !(previous && previous.userId == this.userId
    && moment(this.timestamp).diff(previous.timestamp) < 120000);

  },

  isPinned: function () {
    var pinnedMessageIds = currentChannel().pinnedMessageIds;
    return pinnedMessageIds && pinnedMessageIds.indexOf(this._id) !== -1;
  }
});

Template.spaceMessage.events({
  'click .edit': function (event, template) {
    event.preventDefault();

    var self = this;
    console.log(this);

    // Toggle edit mode
    var toggled = !isEditing.get();

    Tracker.flush();
    if (toggled) {
      template.$('textarea').autosize();
      $(document.body).bind('mouseup.edit-message', function () {
        if (!$(event.target).is(self.$('.form-message-input'))) {
          isEditing.set(false);
          $(document.body).unbind('mouseup.edit-message');
        }
      });
      focusOnMessage();
    }

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

      Messages.update(this._id, {
        $set: { message: value }
      });

      self.toggleEditMode();

      var position = self.$('.message .cursor').position();
      if (position) {
        var width = position.left;
        self.$('.modify').css({
          left: width + 8
        });
      }
    }
  },

  'click [data-action="pin-message"]': function (event) {
    event.preventDefault();

    Meteor.call('spacechat.channels.pinMessage',
      this.channelId,
      this._id, function (error) {
        if (error) {
          swal({
            title: 'Yikes! Something went wrong',
            text: error.reason,
            type: 'error'
          });
        } else {
          if (App && App.ChannelInfo) {
            App.channelInfo.show();
            App.channelInfo.pinnedMessages.open();
          }
        }
      });
  },

  'click [data-action="unpin-message"]': function (event) {
    event.preventDefault();

    Meteor.call('spacechat.channels.unpinMessage',
      this.channelId,
      this._id, function (error) {
        if (error) {
          swal({
            title: 'Yikes! Something went wrong',
            text: error.reason,
            type: 'error'
          });
        } else {
          swal({
            title: 'Message has been un-pinned',
            type: 'success'
          });

        }
      });
  },

  'mouseover .message-body': function (event) {
    if (this.userId === Meteor.userId()) {
      var position = $('.message .cursor').position();
      if (position) {
        var width = position.left;
        self.$('.modify').css({
          left: width + 8
        });
      }
    }
  },

  'click .delete': function (event) {
    event.preventDefault();

    Meteor.call('messages.delete', this._id,
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
            text: 'Message deleted successfully',
            type: 'success',
            html: true
          });
        }
      }
    );
  }
});
