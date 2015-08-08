Package.describe({
  name: 'spacetalk:contributors',
  version: '0.1.0',
  summary: 'SpaceTalk contributors package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  // ---------------------------------- 1. Core dependency -----------------------------------

  api.use([
    'spacetalk:lib@0.1.0'
  ]);

  api.use('http', 'server');

  // ---------------------------------- 2. Files to include ----------------------------------

  api.addFiles([
    'lib/contributors.js',
    'lib/routes.js'
  ]);

  api.addFiles([
    'lib/client/views/contributors.html',
    'lib/client/contributors.js'
  ], 'client');

  api.addFiles([
    'lib/server/methods/project-contributors/update.js',
    'lib/server/publications/project-contributors.js'
  ], 'server');

  api.export(['SpaceTalk']);
});
