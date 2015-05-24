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

        var $name = $(event.target).find('[name=name]')
        var name = $name.val();

        // Allow only unique channel name
        Meteor.call('channels.add', currentTeamId(), name, function(err, result) {
          if (result) {
            // Channel created, hide the form and reset the input
            this.$('.left-sidebar-channels-add-form').addClass('hidden');
            $name.val('');

            // Navigate to the new channel view
            var newChannel = Channels.findOne(result);
            FlowRouter.go('channel', {
              team: currentTeamSlug(),
              channel: newChannel.slug
            });
          } else if (err) {
            switch(err.error) {
              case 401: // Not authorized
                swal({
                  title: 'Yikes! Something went wrong',
                  text: "We can't complete your request at the moment, are you still online?",
                  type: 'error'
                });
                break;
              case 404: // No team found
                swal({
                  title: 'Yikes! Something went wrong',
                  text: "We can't find your team at the moment, are you still online?",
                  type: 'error'
                });
                break;
              case 422: // Channel exists
                swal({
                  title: 'Channel name exists',
                  text: 'Please consider joining the existing channel\nor create a different channel.',
                  type: 'error'
                });
                break;
            }
          } else {
            // Any other error
            swal({
              title: 'Yikes! Something went wrong',
              text: "We can't complete your request at the moment, are you still online?",
              type: 'error'
            });
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
