isOwner = function (Collection, itemId) {
  switch (Collection) {
    case 'Messages':
      return Messages.findOne(itemId) && Meteor.userId() === Messages.findOne(itemId).userId;
    case 'Channels':
      return Channels.findOne(itemId) && Meteor.userId() === Channels.findOne(itemId).userId;
  }
};
