Template.registerHelper('ifAll', function() {
  var argumentsArray = [].slice.apply(arguments);

  console.log(argumentsArray);
});

Template.registerHelper('spaceOptions', function() {
  return SpaceOptions;
});
