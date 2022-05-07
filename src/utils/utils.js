import { palette } from "@mui/system";

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

export const layout = {
  reponsiveCssValue: (min, max, projection_start, projection_start_value, projection_end, projection_end_value, comparator = null) => {
    return `calc(  min( max(calc( ${projection_start_value}px + (${projection_end_value} - ${projection_start_value}) * (( ${comparator || '100vw'} - ${projection_start}px) / (${projection_end} - ${projection_start})) ) , ${min}px), ${max}px  ) );`
  }
}



const palette1 = {
  primary: '#0081A7', //CELADON BLUE
  secondary: '#00AFB9', // MAXIMUM BLUE GREEN
  neutral: '#FCFCDC', //LIGHT YELLOW
  highlight1: '#FED9B7', //PEACH PUFF
  highlight2: '#F07167' //BITTERSWEET
}

const palette2 = {
  primary: '#3D5A80', // BDAZZLED BLUE
  secondary: '#98C1D9', // DARK SKY BLUE
  neutral: '#E0FBFC', //LIGHT CYAN
  highlight1: '#EE6C4D', //BRUNT SIENNA
  highlight2: '#293241' //GUNMETAL
}


export const colors = palette2;
