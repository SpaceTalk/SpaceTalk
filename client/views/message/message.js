Message = BlazeComponent.extendComponent({
  onCreated: function () {
    this.isEditing = new ReactiveVar(false);
  },

  _onClickOutside: function (e) {
    var self = e.data.instance;
    if (!$(e.target).is(self.$('.form-message-input')) && !$(e.target).is(self.$('.edit'))) {
      self.isEditing.set(false);
      $(document.body).unbind('click', self._onClickOutside);
    }
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
    var user = Meteor.users.findOne(this.currentData().userId);

    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  },

  toggleEditMode: function () {
    var self = this;

    var toggled = !self.isEditing.get();
    self.isEditing.set(toggled);

    Tracker.flush();
    if (toggled) {
      $(document.body).bind('click', { instance: this }, self._onClickOutside);
      this._focus();
    }
  },

  events: function () {
    return [
      {
        'click .edit': function (e) {
          e.preventDefault();
          this.toggleEditMode();
        },

        'keydown .edit-box': function (e) {
          if (e.keyCode === 27 && !e.shiftKey) { // esc to cancel
            e.preventDefault();
            this.toggleEditMode();
          } else if (e.keyCode === 13 && !e.shiftKey) { // enter to save
            e.preventDefault();

            var content = this.find('.form-message-input').value;
            Messages.update(this.currentData()._id, {
              $set: { message: content }
            });

            this.toggleEditMode();
          }
        }
      }]
  }
}).register('message');
