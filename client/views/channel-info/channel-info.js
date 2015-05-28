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
  }
}).register('channelInfo');
