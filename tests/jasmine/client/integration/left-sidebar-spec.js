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

  getChannelTitle: function () {
    return $('.channel-title').text().trim();
  }
};


describe('left sidebar', function () {
  beforeEach(resetTestingEnvironment);
  beforeEach(createDefaultUser);
  beforeEach(loginWithDefaultUser);
  beforeEach(createDefaultTeam);
// Guarantee that tests don't run in a ongoing flush cycle.
  beforeEach(goToDefaultTeamPage);

  afterEach(logout);

  describe('clicking on the add channel button', function () {
    it('shows the channel form', function (done) {
      page.getAddChannelButton().click();
      Tracker.flush();

      expect(page.getAddChannelForm()).toBeVisible();
      done();
    });
  });

  describe('adding a channel', function () {
    it('shows the new channel', function (done) {
      page.showAddChannelForm();
      page.setNewChannelName('foo');
      page.submitAddChannelForm();

      setTimeout(function() {
        expect(page.getChannelNames()).toContain('foo');
        done();
      }, 2000);
    });

    it('directly navigates to the new channel', function (done) {
      page.showAddChannelForm();
      page.setNewChannelName('foo');
      page.submitAddChannelForm();

      setTimeout(function() {
        expect(getCurrentRouteName()).toContain('channel');
        done();
      }, 2000);
    });
  });

  //describe('selecting a channel', function () {
  //  it('changes the channel title', function (done) {
  //    page.selectChannel('general');
  //    Tracker.flush();
  //
  //    waitForRouter(function () {
  //      setTimeout(function () {
  //        expect(page.getChannelTitle()).toEqual('general');
  //        done();
  //      }, 1000);
  //    });
  //  });
  //
  //  it('changes the route', function (done) {
  //    page.selectChannel('general');
  //    Tracker.flush();
  //
  //    waitForRouter(function () {
  //      setTimeout(function () {
  //        expect(getCurrentRouteName()).toEqual('channel');
  //        done();
  //      }, 1000);
  //    });
  //
  //    waitForRouter(function () {
  //    });
  //  });
  //
  //  it('loads the messages of the channel', function (done) {
  //    done();
  //  });
  //});
});
