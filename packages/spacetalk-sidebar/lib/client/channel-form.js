ChannelForm = BlazeComponent.extendComponent({
  events: function () {
    return [{
      'submit form': function (event) {
        // We are building an application, so we don't want the form to reload the page.
        event.preventDefault();

        var currentForm = this.$('.left-sidebar-channels-add-form');
        var inputField = $(event.target).find('[name=name]');
        var name = inputField.val();
        if ($.trim(name) === "") return;

        // Allow only unique channel name
        Meteor.call('spacechat.channels.add', currentTeamId(), name, function (error, result) {
          if (result) {
            // Navigate to the new channel view
            var newChannel = Channels.findOne(result);
            FlowRouter.go('channel', {
              team: currentTeamSlug(),
              channel: newChannel.slug
            });
            // Channel created, clear the input and hide the form
            inputField.val('');
            currentForm.addClass('hidden');
          } else if (error) {
            switch(error.error) {
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
                var channel = Channels.findOne({teamId: currentTeamId(), name: name});
                swal({
                  title: 'Channel name exists',
                  text: 'Please consider joining the existing channel <button class="channel-link confirm">#' + name + '</button><br>or create a different channel.',
                  type: 'error',
                  closeOnConfirm: false,
                  showConfirmButton: false,
                  showCancelButton: true,
                  closeOnCancel: true,
                  cancelButtonText: "OK",
                  html: true
                }, function (isConfirm) {
                  // User wants to visit the existing channel,
                  // clear the input and hide the form
                  // and redirect to the requested channel
                  if (isConfirm) {
                    var team = currentTeam();
                    inputField.val('');
                    currentForm.addClass('hidden');
                    swal.close();
                    FlowRouter.go('channel', { team: team.slug, channel: channel.slug });
                  }
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
