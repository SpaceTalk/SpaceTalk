Teams = new Meteor.Collection( 'teams' );

Teams.allow( {
  insert: function ( userId, doc ) {
    if ( userId && doc._channel ) {
      return true;
    }
  }
} );

if ( Meteor.isServer ) {
  Meteor.publish( 'myTeams', function () {
    if ( this.userId ) {
      return Teams.find();
    }
    this.ready();
  } );
}