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

//describe('channel', function () {
//  beforeEach(resetTestingEnvironment);
//  beforeEach(createDefaultTeam);
//
//  beforeEach(loginWithDefaultUser);
//  beforeEach(goToDefaultChannel);
//  beforeEach(waitForChannelOnCreatedSubscriptions);
//
//  describe('submitting the message input', function () {
//
//    it('should send a message', function (done) {
//      var countBefore = Messages.find({}).count();
//      $("textarea[name=message]").text("test-message");
//      $("textarea[name=message]").closest("form").submit();
//      var countAfter = Messages.find({}).count();
//      expect(countAfter).toBe(countBefore + 1);
//      done();
//    });
//
//    it('shows the new message', function (done) {
//      done();
//    });
//
//  });
//});
