Template.home.onCreated(function() {
  this.subscribe('channels');
  this.subscribe('allUserNames');
});

Template.home.helpers({
  channels: function() {
    return Channels.find();
  },

  avatar: function() {
    var user = Meteor.user();
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  },

  active: function() {
    var _id = Router.current().params._id;
    return _id == this._id ? 'active' : '';
  }
});

Template.channelForm.onCreated(function() {
  $('textarea').autosize();
});

Template.channelForm.events({
  'submit form': function(event, instance) {
    // We are building an application, so we don't want the form to reload the page.
    event.preventDefault();

    var name = instance.find('input').value;
    instance.find('input').value = '';

    Channels.insert({name: name});

    // Hide form when submitted.
    instance.$('.add-channel-form').addClass('hidden');
  },

  'click .show-form': function(event, instance) {
    // We are building an application, so we don't want the form to reload the page.
    event.preventDefault();

    // Show form.
    instance.$('.add-channel-form').toggleClass('hidden');
    instance.$('.add-channel-form input').focus();
  }
});
