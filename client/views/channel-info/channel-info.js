ChannelInfo = BlazeComponent.extendComponent({
  onCreated: function () {
  },

  onRendered: function () {
    var self = this,
        $channelInfo = self.$('.channel-info'),
        $channelFooter = $('.channel-footer'),
        $channelBody = $('.channel-body');

    Tracker.autorun(function () {
      if(App.channelInfo.isVisible.get()) {
        $channelInfo.removeClass('channel-info-out');
        $channelBody.removeClass('channel-body-full');
        $channelFooter.removeClass('channel-footer-full');
      } else {
        $channelInfo.addClass('channel-info-out');
        $channelBody.addClass('channel-body-full');
        $channelFooter.addClass('channel-footer-full');
      }
    });
  },
  events: function () {
    return [
      {
        'click .channel-accordion-section-header': function (event) {
          event.preventDefault();
          $(event.target).parent('.channel-accordion-section').toggleClass('open');
        }
      }
    ];
  },
  creatorUsername : function() {
    return currentChannel().createdBy ? Meteor.users.findOne(currentChannel().createdBy).username : '';
  },
  dateCreated: function () {
    return moment(currentChannel().timestamp).format('MMMM Do YYYY');
  }
}).register('channelInfo');
