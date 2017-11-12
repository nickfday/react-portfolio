import React, { Component } from "react";
import base from "../base";
import { Link } from "react-router-dom";
import "./style/blog.css";
import { axiosFetch } from "./Helper";
import Loader from "react-loader";

class BlogSingle extends Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      loaded: false
      //tags: {}
    };
  }

  fetchArticles() {
    const self = this;
    axiosFetch(
      "https://react-bootstrap-and-go.firebaseio.com/blog.json",
      self,
      "articles",
      "loaded"
    )
      .then(function(i) {
        self.setState({
          articles: i,
          loaded: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  componentWillMount() {
    this.fetchArticles();
  }

  render() {
    const self = this;
    let item = [];

    if (this.props.articles) {
      item = this.props.articles;
    } else if (this.state.articles !== null) {
      item = this.state.articles.find(
        x =>
          x.title.replace(/\s+/g, "-").toLowerCase() ===
          self.props.location.pathname
            .slice(6)
            .replace(/\s+/g, "-")
            .toLowerCase()
      );
    }

    // const tags = item.tags.map(function(i, index) {
    //   if (index !== item.tags.length - 1) {
    //     return <span key={i}>{i}, </span>;
    //   } else {
    //     item = "test";
    //     return <span key={i}>{i}</span>;
    //   }
    // });

    return (
      <Loader loaded={this.state.loaded}>
        <h4>{item.title}</h4>
        <p>{item.date}</p>
        <div className="img">
          <img src={item.featuredImage} alt={item.featuredImageAlt} />
        </div>
        <p>{item.body}</p>
        {/* <p>
            <strong>Tags: </strong>
            {tags}
          </p> */}
        <Link to="/Blog">
          <button className="btn btn-secondary btn-sm">Back to Articles</button>
        </Link>
      </Loader>
    );
  }
}

export default BlogSingle;
