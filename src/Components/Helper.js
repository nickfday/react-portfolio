import base from "../base";
import axios from "axios";

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
      console.log(response);
      console.log(stateObject);
      console.log(loadedStatus);
      // var key = stateObject;
      // var val = response.data;
      // var obj = {};
      // obj[key] = val;
      // console.log(obj);
      // context.setState(obj);
      return response.data;
    })
    .catch(error => {
      console.log(error);
    });
}
