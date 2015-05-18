LeftSidebar = BlazeComponent.extendComponent( {
  channels: function () {
    return Channels.find();
  },
  currentUseravatar: function () {
    var user = Meteor.user();
    if ( user && user.emails ) {
      return Gravatar.imageUrl( user.emails[0].address );
    }
  },
  activeChannelClass: function () {
    var _id = FlowRouter.getParam( 'channel' );
    return _id == this.currentData()._id ? 'active' : '';
  }
} ).register( 'leftSidebar' );
