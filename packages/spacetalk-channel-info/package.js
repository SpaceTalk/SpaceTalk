Package.describe({
  name: 'spacetalk:channel-info',
  version: '0.1.0',
  summary: 'SpaceTalk channel info package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'spacetalk:lib@0.2.0',
  ]);

  api.addFiles([
    // Channel info
    'lib/client/views/channel-info/channel-info.html',
    'lib/client/views/channel-info/channel-info.js',
    'lib/client/views/pinned-messages/pinned-messages.html',
    'lib/client/views/pinned-messages/pinned-messages.js',
    'lib/client/views/pinned-messages/pinned-message.html',
    'lib/client/views/pinned-messages/pinned-message.js'
    ], 'client');
});
