Package.describe({
  name: 'spacetalk:channels',
  version: '0.1.0',
  summary: 'SpaceTalk channels package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  var both = ['client', 'server'];

  api.use([
    'spacetalk:lib@0.2.0',
    'spacetalk:spacechat@0.1.0'
  ]);

  api.addFiles([
    'lib/server/publications/pinned-messages.js'
  ], 'server')

  api.addFiles([
    'lib/export.js'
  ], both);

  api.addFiles([
    'lib/client/utilities/current-channel.js',
    'lib/client/utilities/current-channel-id.js',
    'lib/client/utilities/direct-channel.js',
    'lib/client/helpers/current-channel.js',

    // Channel
    'lib/client/views/channel/channel.html',
    'lib/client/views/channel/channel.js',

    // Message
    'lib/client/views/message/message.html'
  ], 'client');

  api.export([
    'Channels'
  ], both);

  api.export([
    // XXX These should be exported. Separate logic!
    'currentChannel',
    'currentChannelSlug',
    'currentChannelId',
    'isDirectChannel',
    'nameOfDirectChannel'
  ], 'client');
});
