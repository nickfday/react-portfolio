import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './projects.css';
import { axiosFetch, renderHTML, formatDate, getLastHref } from '../Helper';
import axios from 'axios';

import Loader from 'react-loader';

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
    (async () => {
      try {
        const response = await axios('http://api.finley-day.com/wp-json/media?parent?type=project');
        let item = response.data.find(x => getLastHref() === x.parent.title.replace(/\s+/g, '-').toLowerCase());
        this.setState({
          articles: item,
          loaded: true
        });
      } catch (error) {
        console.log(error);
      }
    })();
    // try {
    //   let response = await axiosFetch('http://api.finley-day.com/wp-json/media?parent?type=project.json');
    //   const url = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);
    //   let item = response.find(x => url === x.parent.title.replace(/\s+/g, '-').toLowerCase());
    //   this.setState({
    //     articles: item,
    //     loaded: true
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }

  componentWillMount() {
    if (!this.props.location.state) {
      this.fetchArticles();
    } else {
      this.setState({
        loaded: true
      });
    }
  }

  render() {
    let articles = null;
    if (!this.props.location.state) {
      articles = this.state.articles;
    } else {
      articles = this.props.location.state.item;
    }
    // let articles = this.state.articles;
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
    <div key={props.item.parent.title} className="post">
      <div className="">
        <h3>{props.item.parent.title}</h3>
        <div className="body" dangerouslySetInnerHTML={renderHTML(props.item.parent.content)} />
        <Link to="/projects">
          <button className="btn btn-secondary btn-sm">See All Projects</button>
        </Link>
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
