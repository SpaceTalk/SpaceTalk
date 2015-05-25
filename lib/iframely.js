Meteor.startup(function() {
  IframelyOembed.setEndpoint('http://open.iframe.ly/api/oembed');
  IframelyOembed.setCacheOptions({
    cacheTTL: 1000 * 60 * 60, // Hour.
    cacheErrorTTL: 1000 * 60, // Minute.
    cacheEnabled: true
  });
});
