isOwner = function (Collection, itemId) {
  switch (Collection) {
    case 'Messages':
      return Meteor.userId() === Messages.findOne(itemId).userId;
    case 'Channels':
      return Meteor.userId() === Channels.findOne(itemId).userId;
  }
};