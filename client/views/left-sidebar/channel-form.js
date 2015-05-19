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

        //TODO: unsave as shit we might just use meteor methods for this or really check not changeable parameters
        Channels.insert({
          teamId: currentTeamId(),
          name: name
        });

        // Hide form when submitted.
        this.$('.add-channel-form').addClass('hidden');
      },

      'click .show-form': function (event) {
        // We are building an application, so we don't want the form to reload the page.
        event.preventDefault();

        // Show form.
        this.$('.add-channel-form').toggleClass('hidden');
        this.$('.add-channel-form input').focus();
      }
    }];
  }
}).register('channelForm');
