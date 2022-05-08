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

export const constants = {
  customKey: 'branch-routing-data-test3'
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

const palette3 = {
  primary: 'rgb(59,153,213)', // BDAZZLED BLUE
  secondary: 'rgb(248, 248, 248)', // DARK SKY BLUE
  neutral: 'rgb(230,238,244)', //LIGHT CYAN
  highlight1: '#EE6C4D', //BRUNT SIENNA
  highlight2: 'rgb(57, 172, 69)' //GUNMETAL
}

export const colors = palette3;
