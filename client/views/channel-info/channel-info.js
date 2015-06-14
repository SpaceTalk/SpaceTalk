ChannelInfo = BlazeComponent.extendComponent({
  onCreated: function () {
  },

  onRendered: function () {
    var self = this;

    self.$channelInfo = self.$('.channel-info');
    self.$channelFooter = $('.channel-footer');
    self.$channelContent = $('.channel-content');

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
    self.$channelContent.removeClass('channel-content-full');
    self.$channelFooter.removeClass('channel-footer-full');
  },
  hide: function () {
    var self = this;

    self.$channelInfo.addClass('channel-info-out');
    self.$channelContent.addClass('channel-content-full');
    self.$channelFooter.addClass('channel-footer-full');
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
    }, {
      'click .channel-accordion-section-header': function (event) {
        event.preventDefault();

        $(event.target).parent('.channel-accordion-section')
          .toggleClass('open');
      }
    }];
  }
}).register('channelInfo');
