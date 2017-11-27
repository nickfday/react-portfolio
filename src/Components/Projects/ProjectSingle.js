import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./projects.css";
import { axiosFetch, renderHTML, formatDate } from "../Helper";

import Loader from "react-loader";

export class ProjectSingle extends Component {
  constructor() {
    super();
    this.state = {
      articles: {},
      loaded: false,
      tags: {}
    };
  }

  fetchArticles() {
    const self = this;
    axiosFetch(
      "http://api.finley-day.com/wp-json/media?parent?type=project.json",
      self,
      "articles",
      "loaded"
    )
      .then(function(i) {
        let item = i.find(
          x =>
            x.parent.title.replace(/\s+/g, "-").toLowerCase() ===
            self.props.location.state.item.parent.title
              .slice(7)
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

  componentWillMount() {
    this.fetchArticles();
  }

  render() {
    //let articles = this.state.articles;
    let articles = this.props.location.state.item;
    return (
      <div className="project-single container">
        <Loader loaded={this.state.loaded}>
          <div>
            <BlogRow item={articles} />
          </div>
        </Loader>
      </div>
    );
  }
}

function BlogRow(props) {
  return (
    <div className="row">
      <div key={props.item.parent.title} className="post">
        <div>
          <div className="row">
            {/* <div className="col-sm-4">
              <div className="img">
                <img src={props.item.source} alt="" />
              </div>
            </div> */}
            <div className="">
              <h3>{props.item.parent.title}</h3>
              <div
                className="body"
                dangerouslySetInnerHTML={renderHTML(props.item.parent.content)}
              />
              <Link to="/projects">
                <button className="btn btn-secondary btn-sm">
                  See All Projects
                </button>
              </Link>

              {/* <p>{props.item.parent.date_gmt}</p> */}
            </div>
          </div>
        </div>
      </div>
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

export default ProjectSingle;
