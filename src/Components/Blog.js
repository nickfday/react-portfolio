import React, { Component } from "react";
import base from "../base";
import { Link } from "react-router-dom";
import "./style/blog.css";
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

  componentDidMount() {
    this.fireBaseSync();
  }

  fireBaseSync() {
    base.syncState("blog", {
      context: this,
      state: "articles",
      asArray: false,
      then() {
        this.setState(prevState => ({
          loaded: true
        }));
      }
    });
  }

  render() {
    return (
      <div className="Blog">
        <Loader loaded={this.state.loaded}>
          <h1>Blog</h1>
          <BlogRow item={this.state.articles} />
        </Loader>
      </div>
    );
  }
}

function BlogRow(props) {
  return (
    <div className="row">
      {Object.values(props.item).map(i => (
        <div key={i.uuid} className="col-sm-6 post">
          <div>
            <div className="row">
              <div className="col-sm-4">
                <div className="img">
                  <img src={i.featuredImage} alt={i.featuredImageAlt} />
                </div>
              </div>
              <div className="col-sm-8">
                <Link
                  to={{
                    pathname: `blog/${i.title}`
                      .replace(/\s+/g, "-")
                      .toLowerCase(),
                    state: {
                      item: i
                    }
                  }}
                >
                  <h3>{i.title}</h3>
                </Link>
                <p>{i.summary}</p>
                <p>{i.date}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export function BlogSingle(props) {
  let item = props.location.state.item;
  const tags = item.tags.map(function(i, index) {
    if (index !== item.tags.length - 1) {
      return <span key={i}>{i}, </span>;
    } else {
      return <span key={i}>{i}</span>;
    }
  });
  return (
    <div>
      <h4>{item.title}</h4>
      <p>{item.date}</p>
      <div className="img">
        <img src={item.featuredImage} alt={item.featuredImageAlt} />
      </div>
      <p>{item.body}</p>
      <p>
        <strong>Tags: </strong>
        {tags}
      </p>
      <Link to="/Blog">
        <button className="btn btn-secondary btn-sm">Back to Articles</button>
      </Link>
    </div>
  );
}

export default Blog;
