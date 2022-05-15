export function sendSuccessNotification(message) {
  let client = window.AmeyoClient.init();

  let toastNotificationData = {
    type: "success",
    content: message
  };
  client.interface.trigger("toastNotification", toastNotificationData);
}

export function sendFailureNotification(message) {
  let client = window.AmeyoClient.init();

  let toastNotificationData = {
    type: "error",
    content: message
  };
  client.interface.trigger("toastNotification", toastNotificationData);
}


export const layout = {
  reponsiveCssValue: (min, max, projection_start, projection_start_value, projection_end, projection_end_value, comparator = null) => {
    return `calc(  min( max(calc( ${projection_start_value}px + (${projection_end_value} - ${projection_start_value}) * (( ${comparator || '100vw'} - ${projection_start}px) / (${projection_end} - ${projection_start})) ) , ${min}px), ${max}px  ) );`
  }
}