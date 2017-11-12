import React, { Component } from "react";
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
    };
  }

  fetchArticles() {
    console.log("fetching");
    const self = this;
    axiosFetch(
      "https://react-bootstrap-and-go.firebaseio.com/blog.json",
      self,
      "articles",
      "loaded"
    )
      .then(function(i) {
        let item = i.find(
          x =>
            x.title.replace(/\s+/g, "-").toLowerCase() ===
            self.props.location.pathname
              .slice(6)
              .replace(/\s+/g, "-")
              .toLowerCase()
        );

        self.setState({
          articles: item,
          loaded: true
        });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  checkAvailableProps() {
    const self = this;
    if (this.props.location.state) {
      self.setState({
        articles: this.props.location.state.item,
        loaded: true
      });
    } else {
      this.fetchArticles();
    }
  }

  componentDidMount() {
    this.checkAvailableProps();
  }

  render() {
    if (this.state.articles) {
      let item = this.state.articles;
      return (
        <Loader loaded={this.state.loaded}>
          <h4>{item.title}</h4>
          <p>{item.date}</p>
          <div className="img">
            <img src={item.featuredImage} alt={item.featuredImageAlt} />
          </div>
          <p>{item.body}</p>
          <p>
            <strong>Tags: </strong>
            <Tags articles={item} />
          </p>
          <Link to="/Blog">
            <button className="btn btn-secondary btn-sm">
              Back to Articles
            </button>
          </Link>
        </Loader>
      );
    } else {
      return <Loader loaded={this.state.loaded} />;
    }
  }
}

function Tags(props) {
  let tags = [];
  props.articles.tags.map(function(i, index) {
    if (index !== props.articles.tags.length - 1) {
      tags.push(<span key={i}>{i}, </span>);
    } else {
      tags.push(<span key={i}>{i}</span>);
    }
    return null;
  });
  return tags;
}

export default BlogSingle;
