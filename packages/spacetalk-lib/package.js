Package.describe({
  name: 'spacetalk:lib',
  version: '0.1.0',
  summary: 'SpaceTalk libraries',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  var packages = [

  ];

  api.use(packages);

  api.imply(packages);
});
