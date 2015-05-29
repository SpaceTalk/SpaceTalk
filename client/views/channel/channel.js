Channel = BlazeComponent.extendComponent({
  onCreated: function () {
    var self = this;

    // Used to indicate that the user's scroll position
    // is near the bottom, see `calculateNearBottom` method
    self.isNearBottom = new ReactiveVar(false);

    // Listen for changes to reactive variables (such as FlowRouter.getParam()).
    self.autorun(function () {
      currentChannel() && self.subscribe('messages', currentChannelId(), function () {
        // On channel load, scroll page to the bottom
        scrollDown();
      });
    });
  },
  onRendered: function () {
    var self = this;

    // Listen to scroll events to see if we're near the bottom
    // This is used to detect whether we should auto-scroll down
    // when a new message arrives
    $(window)
      .on('scroll', self.calculateNearBottom.bind(self))
      // And also trigger it initially
      .trigger('scroll');

    // We need to do this in an autorun because
    // for some reason the currentChannelId is not
    // available until a bit later
    self.autorun(function () {
      if (currentChannelId()) {
        // Note: this scrollDown does work
        // Observe the changes on the messages for this channel
        self.messageObserveHandle = Messages.find({
          channelId: currentChannelId()
        }).observeChanges({
          // When a new message is added
          added: function (id, doc) {
            // Trigger the scroll down method which determines whether to scroll down or not
            if (self.isNearBottom.get()) {
              scrollDown();
            }
          }
        });
      }
    });

    // Make the textarea resize it self.
    setTimeout(function() {
      self.$('textarea[name=message]').autosize();
    }, 10);
  },
  onDestroyed: function () {
    var self = this;
    // Prevents memory leaks!
    self.messageObserveHandle && self.messageObserveHandle.stop();
    // Stop listening to scroll events
    // $(window).off(self.calculateNearBottom);
  },
  calculateNearBottom: function () {
    var self = this;
    // You are near the bottom if you're at least 200px from the bottom
    self.isNearBottom.set((window.innerHeight + window.scrollY) >= (
      Number(document.body.offsetHeight) - 200));
  },
  messages: function () {
    return Messages.find({
      channelId: currentChannelId()
    });
  },
  channel: function () {
    return Channels.findOne({
      _id: currentChannelId()
    });
  },
  user: function () {
    return Meteor.users.findOne({
      _id: this.currentData()._userId
    });
  },
  time: function () {
    return moment(this.timestamp).format('h:mm a');
  },
  date: function () {
    var dateNow = moment(this.currentData().timestamp).calendar();

    if (!this.date || this.date !== dateNow) {
      return this.date = dateNow;
    }
  },
  avatar: function () {
    var user = Meteor.users.findOne(this.currentData().userId);
    if (user && user.emails) {
      return Gravatar.imageUrl(user.emails[0].address);
    }
  },
  events: function () {
    return [
      {
        'keydown textarea[name=message]': function (event) {
          if (isEnter(event) && ! event.shiftKey) { // Check if enter was pressed (but without shift).
            event.preventDefault();
            var _id = currentRouteId();
            var value = this.find('textarea[name=message]').value;
            // Markdown requires double spaces at the end of the line to force line-breaks.
            value = value.replace(/([^\n])\n/g, "$1  \n");

            // Prevent accepting empty message
            if ($.trim(value) === "") return;

            this.find('textarea[name=message]').value = ''; // Clear the textarea.
            Messages.insert({
              // TODO: should be checked server side if the user is allowed to do this
              channelId: currentChannelId(),
              message: value
            });
            // Restore the autosize value.
            this.$('textarea[name=message]').css({
              height: 37
            });
            scrollDown();
          }

          $("textarea").textcomplete([ {
            match: /\B:([\-+\w]*)$/,
            search: function (term, callback) {
              var results = [];
              var results2 = [];
              var results3 = [];
              $.each(emojiStrategy,function(shortname,data) {
                if(shortname.indexOf(term) > -1) { results.push(shortname); }
                else {
                  if((data.aliases !== null) && (data.aliases.indexOf(term) > -1)) {
                    results2.push(shortname);
                  }
                  else if((data.keywords !== null) && (data.keywords.indexOf(term) > -1)) {
                    results3.push(shortname);
                  }
                }
              });

              if(term.length >= 3) {
                results.sort(function(a,b) { return (a.length > b.length); });
                results2.sort(function(a,b) { return (a.length > b.length); });
                results3.sort();
              }
              var newResults = results.concat(results2).concat(results3);

              callback(newResults);
            },
            template: function (shortname) {
              return '<img class="emojione" src="//cdn.jsdelivr.net/emojione/assets/png/'+emojiStrategy[shortname].unicode+'.png"> :'+shortname+':';
            },
            replace: function (shortname) {
              return ':'+shortname+': ';
            },
            index: 1,
            maxCount: 10,
          }
          ]);

          $('.dropdown-menu').prependTo('.message-tab-content');
          $('.dropdown-menu').css({
            "position": "static",
          });
        },
        'click [data-action="remove-channel"]': function (event) {
          event.preventDefault();

          if (!currentChannel()) {
            swal({
              title: 'Yikes! Something went wrong',
              text: "We can't find the current channel at the moment, are you still online?",
              type: 'error'
            });
          } else {
            var channelName = currentChannel().name;

            // swal is provided by kevohagan:sweetalert
            swal({
              title: 'Delete #' + channelName,
              text: 'Deleting this channel will delete all of the messages in ' +
              'it, for everyone in your team, forever.' +
              ' To confirm, enter <strong>' +
              currentChannel().name + '</strong> below.',
              html: true,
              type: 'input',
              showCancelButton: true,
              closeOnConfirm: false,
              confirmButtonText: 'Delete ' + channelName,
              confirmButtonColor: '#ec6c62',
            }, function (inputValue) {
              if (inputValue === channelName) {
                Meteor.call('channels.remove', currentChannelId(),
                  function (error) {
                    if (error) {
                      swal({
                        title: 'Yikes! Something went wrong',
                        text: error.reason,
                        type: 'error'
                      });
                    } else {
                      swal({
                        title: 'Channel deleted!',
                        text: 'The <strong>#' + channelName + '</strong> ' +
                        'channel is gone forever!',
                        type: 'success',
                        html: true
                      });
                      // TODO: Redirect to the actual team home of the user's team
                      FlowRouter.go('teamHome', { team: 'public' });
                    }
                  });
              } else {
                swal({
                  title: "Incorrect channel name",
                  type: "info",
                  text: "You didn't type the channel name correctly, so we haven't deleted it."
                });
              }
            });
          }
        },

        'click [data-action="display-channel-info"]': function (event) {
          event.preventDefault();
          $('.channel-info').toggleClass('channel-info-out');
          $('.channel-content').toggleClass('channel-content-full');
          $('.channel-footer').toggleClass('channel-footer-full');
          $(".channel-add-purpose-dropdown").toggleClass("hidden");
        },

        'click .channel-title': function(event) {
          var self = this;
          event.preventDefault();

          self.$(".channel-dropdown").toggleClass("hidden");
          self.$(".channel-title").toggleClass("visible");
          if ($(".channel-dropdown").not('.hidden')) {
            self.$('.channel-dropdown-topic-input').focus();
            self.$(".channel-dropdown").css({
              left: $(".channel-title").outerWidth() + 200 - 30 - $(".channel-title span").outerWidth()
            });
            $(window).bind('mouseup.channel-dropdown', function(e) {
              if (!self.$(e.target).closest('#spacetalk-header')[0] && !self.$(e.target).closest('.channel-dropdown')[0]) {
                self.$(".channel-dropdown").addClass("hidden");
                self.$(".channel-title").removeClass("visible");
              }
              $(window).unbind('mouseup.channel-dropdown');
            });
          }
        },

        'click .channel-purpose': function(event) {
          event.preventDefault();
          self.$('.channel-purpose-form textarea').autosize();
          self.$(".channel-purpose-form").toggleClass("hidden");
          self.$('.channel-purpose-form textarea').focus();
        },

        'keydown textarea[name=channel-purpose]': function (event) {
          if (isEnter(event) && ! event.shiftKey) {
            event.preventDefault();
            var textarea = this.find('textarea[name=channel-purpose]');
            // Markdown requires double spaces at the end of the line to force line-breaks.
            value = textarea.value.replace(/([^\n])\n/g, "$1  \n");
            // Prevent accepting empty channel purpose
            if ($.trim(value) === "") return;

            Meteor.call('channels.updatePurpose', currentChannelId(), value, function (error, result) {
              if (result) {
                self.$(".channel-purpose-form").toggleClass("hidden");
              } else if (error) {
                switch(error.error) {
                  case 401: // Not authorized
                  displayUnauthorizedError();
                  break;
                  case 404: // No channel found
                  swal({
                    title: 'Yikes! Something went wrong',
                    text: "We can't find the channel",
                    type: 'error'
                  });
                  break;
                }
              }
            });
          }
        },

        'keydown input[name=channel-topic]': function (event) {

          if (isEnter(event)) {
            var content = this.find('input[name=channel-topic]').value;
            Meteor.call('channels.updateTopic', currentChannelId(), content);
            // Hide the dropdown.
            this.$(".channel-dropdown").toggleClass("hidden");
            this.$(".channel-title").toggleClass("visible");
          }

        }
      }];
  }
}).register('channel');
