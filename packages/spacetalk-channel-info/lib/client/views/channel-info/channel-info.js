ChannelInfo = BlazeComponent.extendComponent({
  onCreated: function () {

  },
  onRendered: function () {

  },
  creatorUsername : function() {
    return currentChannel().createdBy ? Meteor.users.findOne(currentChannel().createdBy).username : '';
  },
  dateCreated: function () {
    return moment(currentChannel().timestamp).format('MMMM Do YYYY');
  },
  events: function () {
    return [{
      'click .channel-add-purpose': function (event) {
        event.preventDefault();

        // XXX TODO: Implement cross-component interactions
        // in a nicer way
        $('.channel-title').trigger('click');
        $('.channel-purpose').trigger('click');
      }
    }];
  }
}).register('channelInfo');
