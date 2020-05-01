import axios from 'axios';
import moment from 'moment';

export function axiosFetch(url, context, stateObject, loadedStatus) {
  return axios
    .get(url)
    .then(response => {
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}

export function renderHTML(markup) {
  return { __html: markup };
}

export function formatDate(date, format) {
  return moment(date).format(format);
}

export function getLastHref() {
  let href = window.location.href;
  let splitHref = window.location.href.split('/');
  if (href.slice(-1) === '/') {
    return splitHref[splitHref.length - 2];
  } else {
    return splitHref[splitHref.length - 1];
  }
}
