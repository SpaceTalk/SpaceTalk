Package.describe({
  name: 'spacetalk:sidebar',
  version: '0.1.0',
  summary: 'SpaceTalk sidbar package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'spacetalk:lib@0.2.0',
  //  // XXX Remove dependency from this. We want to separate this.
  //  'spacetalk:direct-messages@0.1.0'
  ]);

  api.addFiles([
    'lib/client/channel-form.html',
    'lib/client/channel-form.js',

    'lib/client/direct-messages-form.html',
    'lib/client/direct-messages-form.js',

    'lib/client/left-sidebar.html',
    'lib/client/left-sidebar.js'
  ], 'client');

  //api.export([
  //  'Channels',
  //
  //  // XXX These should be exported. Separate logic!
  //  'currentChannel',
  //  'currentChannelSlug',
  //  'currentChannelId'
  //]);
});
