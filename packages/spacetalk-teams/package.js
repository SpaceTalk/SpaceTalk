Package.describe({
  name: 'spacetalk:teams',
  version: '0.1.0',
  summary: 'SpaceTalk teams package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'spacetalk:lib@0.2.0'
  ]);

  api.addFiles([
    'lib/teams.js',
    'lib/routes.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/server/publications/myTeams.js'
  ], 'server');

  api.addFiles([
    'lib/client/utilities/currentTeam.js',
    'lib/client/helpers/currentTeam.js'
  ], 'client');

  api.export([
    'Teams',
    'teamRoutes',

    // XXX These shouldn't be exported. Separate this logic!
    'currentTeamId'
  ]);
});
