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
    'lib/server/publications/teamDirectChannels.js'
  ], 'server');

  api.addFiles([
    'lib/client/utilities/isDirectChannel.js',
    'lib/client/utilities/nameOfDirectChannel.js'
  ], 'client');

  api.export([
    // XXX These shouldn't be exported. Separate this logic!
    'isDirectChannel',
    'nameOfDirectChannel'
  ]);
});
