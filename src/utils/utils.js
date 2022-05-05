export function sendSuccessNotification(message) {
  var client = window.AmeyoClient.init();

  var toastNotificationData = {
    type: "success",
    content: message
  };
  client.interface.trigger("toastNotification", toastNotificationData);
}

export function sendFailureNotification(message) {
  var client = window.AmeyoClient.init();

  var toastNotificationData = {
    type: "error",
    content: message
  };
  client.interface.trigger("toastNotification", toastNotificationData);
}

export function getIframeData() {
  var urlObj = {};
  var url = window.location.search.substring(1);
  var vars = url.split("&");
  for (var i = 0; i < vars.length; i++) {
    var param = vars[i].split("=");
    urlObj[param[0]] = param[1];
  }
  return urlObj;
}

export function getWidgetDataRefreshInterval() {
  const refreshInterval = "60000";
  return refreshInterval;
}
