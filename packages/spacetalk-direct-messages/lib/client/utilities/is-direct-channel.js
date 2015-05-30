/**
 * Returns true if the channel is a direct user-to-user channel
 */
isDirectChannel = function () {
  // We check this by checking if the current channel slug starts with a '@'
  return !!(currentChannelSlug() && currentChannelSlug().charAt(0) === '@');
};
