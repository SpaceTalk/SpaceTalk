Meteor.startup(function () {
  if (_.isEmpty(Meteor.settings)) {
    throw new Error('Seems like you haven\'t started with the settings.json file please start SpaceTalk with the following command "meteor run --settings settings.json"');
  }

  var apiKey = null;
  var iframelyApiKey = Meteor.settings.public.iframelyApiKey;

  // If the iframely api key which is defined in the settings.json file is not not null we set the api key
  if (iframelyApiKey) {
    apiKey = "?api_key=" + iframelyApiKey;
  }

  IframelyOembed.setEndpoint('http://open.iframe.ly/api/oembed' + apiKey);
  IframelyOembed.setCacheOptions({
    cacheTTL: 1000 * 60 * 60, // Hour.
    cacheErrorTTL: 1000 * 60, // Minute.
    cacheEnabled: false
  });
});
