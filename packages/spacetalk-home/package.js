Package.describe({
  name: 'spacetalk:home',
  version: '0.1.0',
  summary: 'SpaceTalk home package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use([
    'spacetalk:lib@0.2.0'
  ]);

  api.addFiles([
    'lib/client/home.html',
    'lib/client/home.js'
  ], ['client']);

  api.export([
    'emojiStrategy'
  ]);
});
