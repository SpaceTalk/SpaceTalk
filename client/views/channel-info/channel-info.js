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
    return [
    {
      'click .channel-add-purpose': function (event) {
        event.preventDefault();
        this.$(".channel-add-purpose-dropdown").toggleClass("hidden");
      },
      'keydown textarea[name=channel-purpose]': function (event) {
        if (isEnter(event) && ! event.shiftKey) {
          event.preventDefault();
          var textarea = this.find('textarea[name=channel-purpose]');
          var value = textarea.value.replace("\n", "  \n");
          // Prevent accepting empty channel purpose
          if ($.trim(value) === "") return;
          Channels.update({ _id: currentChannelId()}, { $set: { purpose: value} });
          textarea.value = '';
          this.$(".channel-add-purpose-dropdown").toggleClass("hidden");
        }
      }
    }
  ];
}
}).register('channelInfo');
