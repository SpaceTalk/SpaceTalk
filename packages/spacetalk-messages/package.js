Package.describe({
  name: 'spacetalk:messages',
  version: '0.1.0',
  summary: 'SpaceTalk messages package',
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
    'lib/export.js'
  ], both);

  api.addFiles([
    'lib/client/utilities/scrollDown.js',
    'lib/client/utilities/isEnter.js',
  ], 'client');

  api.addFiles([
    'lib/server/publications/messages.js'
  ], 'server');

  api.export([
    'Messages'
  ], both);

  api.export([
    'isEnter',
    'scrollDown'
  ], 'client');
});
