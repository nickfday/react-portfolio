import base from "../base";
import axios from "axios";
import moment from "moment";

export function fireBaseSync(context) {
  base.syncState("blog", {
    context: this,
    state: "articles",
    asArray: false
    // then() {
    //   this.setState(prevState => ({
    //     loaded: true
    //   }));
    //   //fireBaseSync("blog", this.state.articles);
    // }
  });
}

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
