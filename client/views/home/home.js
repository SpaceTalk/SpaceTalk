Template.home.events({
  'submit form': function(event, instance) {
    // We are building an application, so we don't want the form to reload the page.
    event.preventDefault();

    var name = instance.find('input').value;
    instance.find('input').value = '';

    Channels.insert({name: name});
  }
});
