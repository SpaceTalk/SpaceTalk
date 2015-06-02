var page = {
  sendMessage: function (done) {
    Messages.insert({
      channelId: currentChannelId(),
      message: 'test-message'
    }, function (result) {
      expect(result).toBeGreaterThan(0);
      done();
    });
  }
};

describe('channel', function () {
  beforeEach(resetTestingEnvironment);
  beforeEach(createDefaultUser);
  beforeEach(createDefaultTeam);

  // Guarantee that tests don't run in a ongoing flush cycle.
  beforeEach(deferAfterFlush);

  beforeEach(loginWithDefaultUser);
  beforeEach(goToDefaultChannel);

  beforeEach(waitABit);

  afterEach(logout);
  afterEach(goToHomePage);

  describe('submitting the message input', function () {

    it('should send a message', function (done) {

      var countBefore = Messages.find({}).count();
      $("textarea[name=message]").text("test-message");
      // Let's kill the person who thought catching a keydown event with key code 13 would be a good option
      $("textarea[name=message]").trigger({type: 'keydown', which: 13, keyCode: 13});

      waitABit(function() {
        var countAfter = Messages.find({}).count();
        expect(countAfter).toBe(countBefore + 1);
        done();
      });
    });

    it('shows the new message', function (done) {
      done();
    });

  });
});
