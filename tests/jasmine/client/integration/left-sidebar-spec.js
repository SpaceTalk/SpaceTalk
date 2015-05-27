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
  }
};


describe('left sidebar', function () {
  beforeEach(loginWithDefaultUser);
  beforeEach(goToDefaultTeamPage);

  describe('clicking on the add channel button', function () {
    it('shows the channel form', function () {
      page.getAddChannelButton().click();
      Tracker.flush();

      expect(page.getAddChannelForm().is(':visible')).toBe(true);
    });
  });

  describe('adding a channel', function () {
    it('shows the new channel', function (done) {
      page.showAddChannelForm();
      page.setNewChannelName('foo');
      page.submitAddChannelForm();

      Tracker.autorun(function (computation) {
        if (Channels.findOne({name: 'foo'})) {
          computation.stop();
          expect(page.getChannelNames()).toContain('foo');
          done();
        }
      })
    });
  });
});
