/**
 * Returns true if the channel is a direct user-to-user channel
 */
isDirectChannel = function () {
  // We check this by checking if the current channel slug starts with a '@'
  return !!(currentChannelSlug() && currentChannelSlug().charAt(0) === '@');
};

/**
 * Removes the first character of a string and returns the result
 * @returns {string} The currentChannelSlug with the first character removed
 */
nameOfDirectChannel = function() {
  return currentChannelSlug().substring(1);
};
