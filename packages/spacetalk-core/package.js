Package.describe({
  name: 'spacetalk:core',
  version: '0.1.0',
  summary: 'SpaceTalk core package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'spacetalk:lib@0.1.0', //  no dependencies
    'spacetalk:channels@0.1.0', //  no dependencies
    'spacetalk:messages@0.1.0', //  no dependencies
    'spacetalk:users@0.1.0', //  no dependencies
    'spacetalk:settings@0.1.0', //  no dependencies
    'spacetalk:direct-messages@0.1.0', //  no dependencies
    'spacetalk:unseen-messages@0.1.0', //  no dependencies
    'spacetalk:typing-indication@0.1.0', //  no dependencies
    'spacetalk:notifications@0.1.0', //  no dependencies
    'spacetalk:mentions@0.1.0', //  no dependencies
    'spacetalk:star-favorites@0.1.0', //  no dependencies
    'spacetalk:emoji@0.1.0', //  no dependencies
    'spacetalk:rich-embeds@0.1.0', //  no dependencies
    'spacetalk:linkify@0.1.0' //  no dependencies
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/general.js'
  ], ['client', 'server']);

  api.addFiles([
    'lib/server/server.js'
  ], 'server');

  api.addFiles([
    'lib/client/main.html',
    'lib/client/utilities/utilities.js',
    'lib/client/helpers/remove-trailing-spaces.js',
    'lib/client/helpers/isSubReady.js'
  ], 'client');

  api.export([
    'currentRouteId',
    'isSubReady',
    'displayUnauthorizedError'
  ]);
});
