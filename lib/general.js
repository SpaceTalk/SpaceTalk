isOwner = function (Collection, itemId) {
  switch (Collection) {
    case 'Messages':
      return Messages.find(itemId).count() && Meteor.userId() === Messages.findOne(itemId).userId;
    case 'Channels':
      return Channels.find(itemId).count() && Meteor.userId() === Channels.findOne(itemId).userId;
  }
};