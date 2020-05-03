import axios from 'axios';
import moment from 'moment';
import { useState, useEffect } from 'react';

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

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  async function fetchUrl() {
    const response = await fetch(url);
    const json = await response.json();
    setData(json);
    setLoading(false);
  }
  useEffect(() => {
    fetchUrl();
  }, []);
  return [data, loading];
}
