Template.home.events({
  'submit form': function(event, instance) {
    // We are building an application, so we don't want the form to reload the page.
    event.preventDefault();

    // Locate the name input (using jQuery in the instance).
    var $input = instance.$('#name'); // Using $ at the beginning of the variable-name is a standard to denote that it contains the value from a jQuery selector.

    // Get the value of the input.
    var name = $input.val();

    // Insert a new channel with the value of the input as it's name.
    Channels.insert({name: name});

    // Reset the values of all input elements in the form.
    instance.$('form')[0].reset(); // [0] is a way to get the JavaScript DOM object from the jQuery selector, where the reset function is found on the form element.
  }
});
