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
        Meteor.call('channels.add', currentTeamId(), name, function (error, result) {
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
              case 'unauthorized-access': // Not authorized
                displayErrorMessage('unauthorized-access');
                break;

              case 'team-not-found': // No team found
                displayErrorMessage('team-not-found');
                break;

              case 'channel-exists': // Channel exists
                var channel = Channels.findOne({teamId: currentTeamId(), name: name});
                var channelButton = '<button class="channel-link confirm">#' + name + '</button>';
                
                var msg = getErrorMessage('channel-exists', {channelButton: channelButton});
                var overwrites = {
                  closeOnConfirm: false,
                  showConfirmButton: false,
                  showCancelButton: true,
                  closeOnCancel: true,
                  cancelButtonText: "OK",
                  html: true
                };

                var swalObj = $.extend({}, msg, overwrites);

                swal(swalObj, function (isConfirm) {
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
            displayErrorMessage('default');
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
