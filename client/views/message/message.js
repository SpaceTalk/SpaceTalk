Message = BlazeComponent.extendComponent({
  onCreated: function () {
    this.isEditing = new ReactiveVar(false);
  },

  user: function () {
    return Meteor.users.findOne({
      _id: this.currentData()._userId
    });
  },

  isOwner: function () {
      return this.currentData()._userId === Meteor.userId();
  },

  time: function () {
    return moment(this.timestamp).format('h:mm a');
  },

  avatar: function () {
    var user = Meteor.users.findOne({
      _id: this.currentData()._userId
    });
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  },

  toggleEditMode: function () {
    this.isEditing.set(!this.isEditing.get());
  },

  events: function () {
    return [{
      'click .edit': function (e) {
        e.preventDefault();
        this.toggleEditMode();
      },

      'keydown .edit-box': function (e) {
        if (e.keyCode === 27 && !e.shiftKey) { // esc to cancel
          e.preventDefault();
          this.toggleEditMode();
        } else if (e.keyCode === 13 && !e.shifKey) { // enter to save
          e.preventDefault();

          var content = this.find('.edit-message-input').value;
          Messages.update(this.currentData()._id, {
            $set: { message: content }
          });

          this.toggleEditMode();
        }
      }
    }]
  }
}).register('message');
