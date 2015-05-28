ChannelInfo = BlazeComponent.extendComponent({
  onCreated: function () {
  },

  onRendered: function () {
    var self = this;

    self.$channelInfo = self.$('.channel-info');
    self.$channelFooter = $('.channel-footer');
    self.$channelBody = $('.channel-body');

    this.autorun(function () {
      if (App.channelInfo.isVisible.get()) {
        self.show();
      } else {
        self.hide();
      }
    });
  },
  show: function () {
    var self = this;

    self.$channelInfo.removeClass('channel-info-out');
    self.$channelBody.removeClass('channel-body-full');
    self.$channelFooter.removeClass('channel-footer-full');
  },
  hide: function () {
    var self = this;

    self.$channelInfo.addClass('channel-info-out');
    self.$channelBody.addClass('channel-body-full');
    self.$channelFooter.addClass('channel-footer-full');
  },
  events: function () {
    return [
      {
        'click .channel-accordion-section-header': function (event) {
          event.preventDefault();

          $(event.target).parent('.channel-accordion-section')
          .toggleClass('open');
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
