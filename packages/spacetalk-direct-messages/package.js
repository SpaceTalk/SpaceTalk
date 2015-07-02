Package.describe({
  name: 'spacetalk:direct-messages',
  version: '0.1.0',
  summary: 'SpaceTalk direct messages package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'spacetalk:lib@0.2.0'
  ]);

  api.addFiles([
    'lib/server/publications/team-direct-channels.js'
  ], 'server');

  api.addFiles([
    'lib/client/utilities/is-direct-channel.js',
    'lib/client/utilities/name-of-direct-channel.js'
  ], 'client');

  api.export([
    // XXX These shouldn't be exported. Separate this logic!
    'isDirectChannel',
    'nameOfDirectChannel'
  ]);
});
