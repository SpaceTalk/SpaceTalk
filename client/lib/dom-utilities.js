/**
 * Scrolls down the page when the user is a at or nearly at the bottom of the page
 */
scrollDown = function (force) {
  // It has to be in a setTimeout or it won't
  // scroll all the way down for some reason
  setTimeout(function () {
    // Check if the innerHeight + the scrollY position is higher than the offsetHeight - 200
    if ((window.innerHeight + window.scrollY) >= (
      Number(document.body.offsetHeight) - 200
      ) || force) {
      // Scroll down the page
      window.scrollTo(0, document.body.scrollHeight);
    }
  }, 0);
};
