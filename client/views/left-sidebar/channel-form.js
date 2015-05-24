ChannelForm = BlazeComponent.extendComponent({
  onRendered: function () {
    // Where is this autosize library? o.0
    this.$('textarea').autosize();
  },
  events: function () {
    return [{
      'submit form': function (event) {
        // We are building an application, so we don't want the form to reload the page.
        event.preventDefault();

        var name = $(event.target).find('[name=name]').val();

        // Allow only unique name
        Meteor.call('channels.add', currentTeamId(), name, function(err, result) {
          if (result) {
            // Hide form when submitted.
            this.$('.left-sidebar-channels-add-form').addClass('hidden');
          } else if (err) {
            // TODO: show user friendly error message when error occurred
            console.log(err);
          }
        });
      },

      'click .show-form': function (event) {
        // We are building an application, so we don't want the form to reload the page.
        event.preventDefault();

        // Show form.
        this.$('.left-sidebar-channels-add-form').toggleClass('hidden');
        this.$('.left-sidebar-channels-add-form input').focus();
      }
    }];
  }
}).register('channelForm');
