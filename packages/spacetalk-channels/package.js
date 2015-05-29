Package.describe({
  name: 'spacetalk:channels',
  version: '0.1.0',
  summary: 'SpaceTalk channels package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'spacetalk:lib@0.2.0'
  ]);

  api.addFiles([
    'lib/channels.js'
  ], ['client', 'server']);

  api.export([
    'Channels'
  ]);
});
