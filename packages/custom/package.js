Package.describe({
  name: 'my-custom-package',
  version: '0.1.0',
  summary: 'SpaceTalk custom package – use as template for your own packages',
  git: 'https://github.com/SpaceTalk/SpaceTalk.git',
});

Package.onUse(function(api) {
  api.versionsFrom('1.1.0.2');

  // ---------------------------------- 1. Core dependency -----------------------------------

  api.use("spacetalk:core");

  // ---------------------------------- 2. Files to include ----------------------------------

});
