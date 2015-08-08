Meteor.publish('projectContributors', function () {
  return ProjectContributors.find();
});
