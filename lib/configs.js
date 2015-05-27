Meteor.startup(function () {
  if (_.isEmpty(Meteor.settings)) {
    throw new Error('Seems like you haven\'t started with the settings.json file please start SpaceTalk with the following command "meteor run --settings settings.json"');
  }

  IframelyOembed.setEndpoint('http://open.iframe.ly/api/oembed?api_key=' + Meteor.settings.public.iframelyApiKey);
  IframelyOembed.setCacheOptions({
    cacheTTL: 1000 * 60 * 60, // Hour.
    cacheErrorTTL: 1000 * 60, // Minute.
    cacheEnabled: true
  });
});
