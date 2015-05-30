currentTeam = function () {
  var search = currentTeamSlug();
  // Search teams by id or slug
  return Teams.findOne({ $or: [{ _id: search }, { slug: search }] });
};

currentTeamSlug = function () {
  return FlowRouter.getParam('team');
};

currentTeamId = function () {
  var team = currentTeam();
  return team ? team._id : null;
};
