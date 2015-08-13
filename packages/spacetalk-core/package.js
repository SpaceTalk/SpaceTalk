Package.describe({
  name: 'spacetalk:core',
  version: '0.1.0',
  summary: 'SpaceTalk core package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  var both = ['client', 'server'];

  var packages = [
    'spacetalk:lib@0.1.0', //  no dependencies
    'spacetalk:teams@0.1.0', //  no dependencies
    'spacetalk:channels@0.1.0', //  no dependencies
    'spacetalk:messages@0.1.0', //  no dependencies
    'spacetalk:users@0.1.0', //  no dependencies
    'spacetalk:settings@0.1.0', //  no dependencies
    'spacetalk:unseen-messages@0.1.0', //  no dependencies
    'spacetalk:typing-indication@0.1.0', //  no dependencies
    'spacetalk:notifications@0.1.0', //  no dependencies
    'spacetalk:mentions@0.1.0', //  no dependencies
    'spacetalk:star-favorites@0.1.0', //  no dependencies
    'spacetalk:emoji@0.1.0', //  no dependencies
    'spacetalk:rich-embeds@0.1.0', //  no dependencies
    'spacetalk:linkify@0.1.0', //  no dependencies
    'spacetalk:channel-info@0.1.0', //  no dependencies
    'spacetalk:sidebar@0.1.0', //  no dependencies
    'spacetalk:contributors@0.1.0',
    'spacetalk:home@0.1.0'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/general.js'
  ], both);

  api.addFiles([
    'lib/server/server.js'
  ], 'server');

  api.addFiles([
    'lib/client/main.html',
    'lib/client/utilities/utilities.js',
    'lib/client/helpers/remove-trailing-spaces.js',
    'lib/client/helpers/is-sub-ready.js'
  ], 'client');

  api.export([
    'currentRouteId',
    'isSubReady',
    'displayUnauthorizedError'
  ]);
});
