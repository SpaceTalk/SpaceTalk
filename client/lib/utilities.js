currentRouteId = function () {
  return FlowRouter.getParam('_id');
};

currentTeamId = function() {
  var teamSlug = FlowRouter.getParam('team');
  return Teams.findOne( {slug: teamSlug} )._id;
};