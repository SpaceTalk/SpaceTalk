Package.describe({
  name: 'spacetalk:theme-base',
  version: '0.1.0',
  summary: 'SpaceTalk base theme package',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  api.use(['spacetalk:core@0.1.0']);

  api.addFiles(
    [
      'lib/client/scss/_accounts.scss',
      'lib/client/scss/_channel-info.scss',
      'lib/client/scss/_channel.scss',
      'lib/client/scss/_emojione.scss',
      'lib/client/scss/_form.scss',
      'lib/client/scss/_layouts.scss',
      'lib/client/scss/_left-sidebar.scss',
      'lib/client/scss/_mixins.scss',
      'lib/client/scss/_styles.scss',
      'lib/client/scss/_sweetalert-override.scss',
      'lib/client/scss/_user.scss',
      'lib/client/scss/_vars.scss',
      'lib/client/scss/main.scss'
    ],
    'client'
  );
});
