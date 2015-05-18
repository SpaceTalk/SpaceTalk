Channels = new Mongo.Collection( 'channels' );

if ( Meteor.isServer ) {
  Channels.allow( {
    insert: function ( userId, doc ) {
      if ( userId ) {
        return true;
      }
    }
  } );

  Meteor.publish( 'teamChannels', function ( teamId ) {
    check( teamId, String );
    if ( this.userId ) {
      return Channels.find( {teamId: teamId} );
    }
    this.ready();
  } );
}
