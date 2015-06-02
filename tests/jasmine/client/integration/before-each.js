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
