Blaze.Template.registerHelper("linkify", new Template('linkify', function () {
  var view = this;
  var content = '';
  if (view.templateContentBlock) {
    content = Blaze._toText(view.templateContentBlock, HTML.TEXTMODE.STRING);
  }
  return HTML.Raw(linkify(content));
}));

var linkify = function (string) {
  if (!string) return '';

  // http://, https://, ftp://
  var urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;

  // www. sans http:// or https://
  var pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

  // Email addresses
  var emailAddressPattern = /[\w.]+@[a-zA-Z_-]+?(?:\.[a-zA-Z]{2,6})+/gim;

  var attributesString = 'target="_blank"';

  return string
    .replace(urlPattern, '<a ' + attributesString + ' href="$&">$&</a>')
    .replace(pseudoUrlPattern, '$1<a ' + attributesString + ' href="http://$2">$2</a>')
    .replace(emailAddressPattern, '<a  ' + attributesString + ' href="mailto:$&">$&</a>');
}
