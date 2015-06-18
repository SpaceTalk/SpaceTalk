Package.describe({
  name: 'spacetalk:spacechat',
  version: '0.1.0',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: '',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  var both = ['client', 'server']

  api.use([
    'mongo',
    'jquery',
    'templating',
    'reactive-var@1.0.5',
    'todda00:friendly-slugs@0.3.0',
    'meteorhacks:flow-router@1.9.0',
    'peerlibrary:blaze-components@0.12.0'
    // XXX Remove dependency from this. We want to separate this.
    //'spacetalk:direct-messages@0.1.0'
  ]);

  api.addFiles([
    'lib/export.js',

    // Messages
    'lib/collections/messages.js',

    // Channels
    'lib/collections/channels.js',

    // Teams
    'lib/collections/teams.js'
  ], both);

  api.addFiles([
    // Messages
    'lib/server/methods/messages/delete.js',

    // Channels
    'lib/server/methods/channels/add.js',
    'lib/server/methods/channels/remove.js',
    'lib/server/methods/channels/update.js',
    'lib/server/methods/channels/pinMessage.js',
    'lib/server/methods/channels/unpinMessage.js'
  ], 'server');

  api.addFiles([
    'lib/client/views/message/space-message.html',
    'lib/client/views/message/space-message.js'
  ], 'client')

  api.export([
    'SpaceChat'
  ], both);

});
