Template.channel.onCreated(function() {
  var instance = this;
  // Listen for changes to reactive variables (such as Router.current()).
  instance.autorun(function() {
    var channel = Router.current().params._id;
    var sub = instance.subscribe('messages', channel);
    if (sub.ready()) {
      window.scrollTo(0, document.body.scrollHeight);
    }
  });
});

Template.channel.onRendered(function() {
  $('article').css({'padding-bottom': $('footer').outerHeight()});
});

Template.channel.helpers({
  messages: function() {
    var _id = Router.current().params._id;
    return Messages.find({_channel: _id});
  },

  channel: function() {
    var _id = Router.current().params._id;
    return Channels.findOne({_id: _id});
  },

  user: function() {
    return Meteor.users.findOne({_id: this._userId});
  },

  time: function() {
    return moment(this.timestamp).format('h:mm a');
  },

  date: function() {
    var dateNow = moment(this.timestamp).calendar();
    var instance = Template.instance();
    if (!instance.date || instance.date != dateNow) {
      return instance.date = dateNow;
    }
  },

  avatar: function() {
    var user = Meteor.users.findOne({_id: this._userId});
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  }
});

Template.messageForm.events({
  'keydown textarea': function(event, instance) {
    if (event.keyCode == 13 && !event.shiftKey) { // Check if enter was pressed (but without shift).
      event.preventDefault();
      var _id = Router.current().params._id;
      var value = instance.find('textarea').value;
      // Markdown requires double spaces at the end of the line to force line-breaks.
      value = value.replace("\n", "  \n");
      instance.find('textarea').value = ''; // Clear the textarea.
      Messages.insert({
        _channel: _id, // Channel reference.
        message: value,
        _userId: Meteor.userId(), // Add userId to each message.
        timestamp: new Date() // Add a timestamp to each message.
      });
      // Restore the autosize value.
      instance.$('textarea').css({height: 37});
      window.scrollTo(0, document.body.scrollHeight);
    }
    $('article').css({'padding-bottom': $('footer').outerHeight()});
  }
});
