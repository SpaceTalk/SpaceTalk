Package.describe({
  name: 'spacetalk:teams',
  version: '0.1.0',
  summary: 'SpaceTalk teams package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  var both = ['client', 'server'];

  api.use([
    'spacetalk:lib@0.2.0',
    'spacetalk:spacechat@0.1.0',
    'spacetalk:channels@0.1.0'
  ]);

  api.addFiles([
    'lib/export.js',
    'lib/routes.js'
  ], both);

  api.addFiles([
    'lib/server/publications/my-teams.js',
    'lib/server/publications/team-channels.js',
    'lib/server/publications/team-direct-channels.js'
  ], 'server');

  api.addFiles([
    'lib/client/utilities/currentTeam.js',
    'lib/client/helpers/currentTeam.js'
  ], 'client');

  api.export([
    'teamRoutes',
    'currentTeam',
    'currentTeamSlug',
    // XXX These shouldn't be exported. Separate this logic!
    'currentTeamId'
  ], 'client');

  api.export([
    'Teams',
  ], both);
});
