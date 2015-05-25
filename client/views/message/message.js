Message = BlazeComponent.extendComponent({
  onCreated: function () {
    this.isEditing = new ReactiveVar(false);
  },

  _onClickOutside: function (event) {
    var self = event.data.instance;
    if (!$(event.target).is(self.$('.form-message-input')) && !$(event.target).is(self.$('.edit'))) {
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
        },
        
        'click .pin': function (e) {
          e.preventDefault();
          var currentData = this.currentData();
          Meteor.call('channel.pinMessage', 
                      currentData.channelId
                      currentData._id, function (error) {


          });
        }
      }];
  }
}).register('message');
