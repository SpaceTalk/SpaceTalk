/* globals deferAfterFlush: false */

beforeAll(function () {
  var self = this;

  // Go into our blank testing sandbox
  self.initTestingSandbox = function (done) {
    goToRoute('testingSandbox')(function () {
      self.routerGoSpy = spyOn(FlowRouter, 'go');
      done();
    });
  };

});

beforeEach(resetTestingEnvironment);
beforeEach(createDefaultTeam);
beforeEach(createDefaultUser);

// Guarantee that tests don't run in a ongoing flush cycle.
beforeEach(deferAfterFlush);
