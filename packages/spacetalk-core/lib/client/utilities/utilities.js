currentRouteId = function () {
  return FlowRouter.getParam('_id');
};

isSubReady = function (subName) {
  return FlowRouter.subsReady(subName);
};

displayUnauthorizedError = function() {
  swal({
    title: 'Yikes! Something went wrong',
    text: "We can't complete your request at the moment, are you still online?",
    type: 'error'
  });
};
