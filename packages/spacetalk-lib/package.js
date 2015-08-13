Package.describe({
  name: 'spacetalk:lib',
  version: '0.2.0',
  summary: 'SpaceTalk libraries',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  var packages = [
    'standard-app-packages',
    'service-configuration',
    'accounts-ui',
    'accounts-base',
    'accounts-password',
    'aldeed:autoform@5.2.0',
    'aldeed:simple-schema@1.3.2',
    'arillo:flow-router-helpers@0.1.6',
    'coffeescript@1.0.6',
    'copleykj:jquery-autosize@1.17.8',
    'dburles:collection-helpers@1.0.3',
    'fortawesome:fontawesome@4.3.0',
    'fourseven:scss@3.1.1',
    'jquery',
    'iframely:oembed@0.0.2',
    'kevohagan:sweetalert@0.5.0',
    'markdown@1.0.4',
    'matb33:collection-hooks@0.7.13',
    'meteorhacks:flow-layout@1.3.0',
    'meteorhacks:flow-router@1.9.0',
    'mizzao:timesync@0.3.1',
    'mizzao:user-status@0.6.4',
    'mobile-status-bar@1.0.3',
    'mongo',
    'momentjs:moment@2.10.3',
    'mquandalle:jquery-textcomplete@0.3.9_1',
    'mrt:tiny-scrollbar@0.0.1',
    'ogourment:settings@1.0.1',
    'peerlibrary:blaze-components@0.12.0',
    'qnub:emojione@0.0.3',
    'reactive-var@1.0.5',
    'seriousm:emoji-continued@1.4.0',
    'softwarerero:accounts-t9n@1.0.9',
    'templating',
    'tmeasday:gravatar@0.0.4',
    'tmeasday:presence@1.0.6',
    'todda00:friendly-slugs@0.3.0',
    'underscore',
    'useraccounts:core@1.8.1',
    'useraccounts:unstyled@1.8.1',
    'webapp@1.2.0',
    'webapp-hashing@1.0.3',
    'ogourment:settings',
    'spacetalk:spacechat@0.1.0'
  ];

  api.use(packages);

  api.imply(packages);

  api.addFiles([
    'lib/moment.js',
    'lib/start.js'
  ], ['client', 'server']);

  api.export(['SpaceTalk']);
});
