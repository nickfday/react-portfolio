import React, { Component } from "react";
import base from "../base";
import _ from "lodash";
import { Link } from "react-router-dom";
var Loader = require("react-loader");

export class Blog extends Component {
  constructor() {
    super();
    this.state = {
      articles: {},
      loaded: false,
      tags: {}
    };
  }

  componentWillMount() {
    base.syncState("articles", {
      context: this,
      state: "articles",
      asArray: false
    });
    base.syncState("tags", {
      context: this,
      state: "tags",
      asArray: true
    });
  }

  componentDidMount() {
    this.state.loaded = true;
  }

  render() {
    return (
      <div>
        <Loader loaded={this.state.loaded}>
          <h1>Blog</h1>
          <BlogRow item={this.state.articles} />
        </Loader>
      </div>
    );
  }
}

function BlogRow(props) {
  //console.log(props.item);

  Object.keys(props.item).map(key => console.log(key));

  Object.values(props.item).map(function(i) {
    console.log(i);
  });

  return (
    <div>
      {Object.values(props.item).map(i => (
        <div>
          <Link
            to={{
              pathname: `blog/${i.title}`.replace(/\s+/g, "-").toLowerCase(),
              state: {
                item: i
              }
            }}
          >
            {i.title}
          </Link>
        </div>
      ))}
    </div>
  );
}

export function BlogSingle(props) {
  let item = props.location.state.item;
  return (
    <div>
      <h4>{item.title}</h4>
      <p>{item.date}</p>
      <p>{item.featuredImage}</p>
      <p>{item.body}</p>
      <p>{item.tags}</p>
      <Link to="/Blog">
        <button className="btn btn-secondary btn-sm">Back to Articles</button>
      </Link>
    </div>
  );
}

//export default Blog;
