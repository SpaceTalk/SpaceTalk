Package.describe({
  name: 'spacetalk:unseen-messages',
  version: '0.1.0',
  summary: 'SpaceTalk unseen messages package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');
});
