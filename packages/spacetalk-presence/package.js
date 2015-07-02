Package.describe({
  name: 'spacetalk:mentions',
  version: '0.1.0',
  summary: 'SpaceTalk mentions package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'spacetalk:lib@0.2.0'
  ]);

  api.addFiles([
    'lib/server/publications/messages.js'
  ], 'server');

  api.addFiles([
    'lib/client/utilities/presence.js'
  ], 'client');
});
