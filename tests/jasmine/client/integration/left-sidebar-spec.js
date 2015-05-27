// Page object
var page = {
  getChannelSection: function () {
    return $('.left-sidebar-channels');
  },

  getAddChannelButton: function () {
    return this.getChannelSection().find('.show-form');
  },

  getAddChannelForm: function () {
    return this.getChannelSection().find('.left-sidebar-channels-add-form');
  },

  getAddChannelInput: function () {
    return this.getAddChannelForm().find('input[name="name"]');
  },

  getChannels: function () {
    return this.getChannelSection().find('ul > li');
  },

  getChannelNames: function () {
    return this.getChannels().map(function () {
      return $(this).text();
    }).get();
  },

  showAddChannelForm: function () {
    this.getAddChannelButton().click();
    Tracker.flush();
  },

  setNewChannelName: function (channelName) {
    this.getAddChannelInput().val(channelName);
  },

  submitAddChannelForm: function () {
    this.getAddChannelForm().submit();
    Tracker.flush();
  },

  selectChannel: function (channelName) {
    $('li a:contains("' + channelName + '")')[0].click();

    Tracker.flush();
  },

  getChannelTitle: function() {
    return $('.channel-title').text().trim();
  }
};


describe('left sidebar', function () {
  beforeEach(resetTestingEnvironment);
  beforeEach(createDefaultTeam);
  beforeEach(createDefaultUser);

// Guarantee that tests don't run in a ongoing flush cycle.
  beforeEach(deferAfterFlush);

  beforeEach(loginWithDefaultUser);
  beforeEach(goToDefaultTeamPage);

  describe('clicking on the add channel button', function () {
    it('shows the channel form', function (done) {
      page.getAddChannelButton().click();
      Tracker.flush();

      expect(page.getAddChannelForm().is(':visible')).toBe(true);
      done();
    });
  });

  describe('adding a channel', function () {
    it('shows the new channel', function (done) {
      page.showAddChannelForm();
      page.setNewChannelName('foo');
      page.submitAddChannelForm();

      Tracker.autorun(function (computation) {
        if (Channels.findOne({ name: 'foo' })) {
          computation.stop();
          expect(page.getChannelNames()).toContain('foo');
          done();
        }
      });
    });
  });

  describe('selecting a channel', function () {
    it('changes the route', function () {
      page.selectChannel('general');
      Tracker.flush();
    });

    it('loads the messages of the channel', function (done) {
      done();
    });
  });
});
