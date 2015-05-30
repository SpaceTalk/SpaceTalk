Package.describe({
  name: 'spacetalk:users',
  version: '0.1.0',
  summary: 'SpaceTalk users package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'spacetalk:lib@0.2.0'
  ]);

  api.addFiles([
    'lib/users.js',
    'lib/accounts.js',
  ], ['client', 'server']);

  api.addFiles([
    'server/publications/users.js'
  ], 'server');

  api.export([
    'Users'
  ]);
});
