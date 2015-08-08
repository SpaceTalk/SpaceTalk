Template.contributors.helpers({
  contributors: function() {
    return ProjectContributors.find({});
  }
});

Template.contributors.onCreated(function() {
  Meteor.call('spacetalk.projectContributors.update');
});
