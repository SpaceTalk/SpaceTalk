// Page object
var page = {
  getChannelSection: function () {
    return $('.left-sidebar-channels');
  },

  getAddChannelButton: function () {
    return this.getChannelSection().find('.show-form');
  },

  getAddChannelForm: function () {
    return $('.left-sidebar-channels-add-form');
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
  beforeEach(createDefaultTeam);

  // Guarantee that tests don't run in a ongoing flush cycle.
  beforeEach(deferAfterFlush);

  beforeEach(loginWithDefaultUser);
  beforeEach(goToDefaultTeamPage);

  beforeEach(waitABit);

  afterEach(logout);
  afterEach(goToHomePage);

  describe('clicking on the add channel button', function () {
    it('shows the channel form', function (done) {
      // Because after login the router automatically goes to the /public route we will wait a half second to get it navigated to the right route.
      setTimeout(function() {
        page.showAddChannelForm();

        expect(page.getAddChannelForm()).toBeVisible();
        done();
      }, 500);
    });
  });

  describe('adding a channel', function () {
    it('shows the new channel', function (done) {
      page.showAddChannelForm();
      page.setNewChannelName('foo');
      page.submitAddChannelForm();

      expect(page.getChannelNames()).toContain('foo');
      done();
    });

    it('directly navigates to the new channel', function (done) {
      page.showAddChannelForm();
      page.setNewChannelName('foo');
      page.submitAddChannelForm();

      waitABit(function() {
        expect(getCurrentRouteName()).toContain('channel');
        done();
      });
    });
  });

  describe('selecting a channel', function () {
    it('changes the channel title', function (done) {
      page.selectChannel('general');
      Tracker.flush();

      waitForRouter(function () {
        waitABit(function() {
          expect(page.getChannelTitle()).toEqual('general');
          done();
        });
      });
    });

    it('changes the route', function (done) {
      page.selectChannel('general');
      Tracker.flush();

      waitForRouter(function () {
        waitABit(function() {
          expect(getCurrentRouteName()).toEqual('channel');
          done();
        });
      });
    });

    it('loads the messages of the channel', function (done) {
      done();

    });
  });
});
