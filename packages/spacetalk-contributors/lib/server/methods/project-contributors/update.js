Meteor.methods({
  'spacetalk.projectContributors.update': function (teamId, channelName, options) {
    this.unblock();
    var contributors = SpaceTalk.getContributors(SpaceTalk.Config.githubRepo);

    if(!contributors)
      return [];

    for(var key in contributors) {
      var contributor = contributors[key];

      var existingContributor = ProjectContributors.findOne({'githubId': contributor.id});

      var newContributor = {
        name: contributor.login,
        avatarUrl: contributor.avatar_url,
        url: contributor.url,
        contributions: contributor.contributions
      };

      check(newContributor, {
        name: String,
        avatarUrl: String,
        url: String,
        contributions: Number
      });

      check(contributor.id, Number)

      existingContributor ?
        ProjectContributors.update({_id: contributor.id}, {$set: newContributor}) :
        ProjectContributors.insert(_.extend({ githubId: contributor.id }, newContributor));
    };

    return contributors;
  }
});

/**
 * Returns an overview of all the contributors of a Github repository
 *
 * @param githubRepo string The github repo as repo-author/repo-name
 * @returns {*}
 */
SpaceTalk.getContributors = function(githubRepo) {
  try {
    var url = "https://api.github.com/repos/" + githubRepo + "/contributors"
    var result =  HTTP.call("GET", url, { headers: { 'User-Agent': 'SpaceTalk App' }});
    return result && _.isArray(result.data) ? result.data : false;
  } catch (e) {
    console.log(e);
    // Got a network error, time-out or HTTP error in the 400 or 500 range.
    return false;
  }
};
