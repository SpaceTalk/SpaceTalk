UI.registerHelper("removeTrailingSpaces", function(content){
  return content ? content.replace(/  \n/g, "\n") : '';
});
