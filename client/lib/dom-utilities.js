/**
 * Scrolls down the page when the user is a at or nearly at the bottom of the page
 */
scrollDown = function () {
  // It has to be in a setTimeout or it won't
  // scroll all the way down for some reason
  setTimeout(function () {
    // Scroll down the page
    window.scrollTo(0, document.body.scrollHeight);
  }, 0);
};
