Template.channel.helpers({
  channel: function() {
    var _id = Router.current().params._id;
    return Channels.findOne({_id: _id});
  }
});
