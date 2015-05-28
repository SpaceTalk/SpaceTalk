Template.home.helpers({
  'teams': function () {
    return Teams.find({});
  }
});

Template.teamLink.onRendered(function() {
    this.$('li').click(function(e) {
      e.preventDefault();
      var href = $('a', this).attr('href');
      window.open(href, '_blank');
    });
  });
