import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/blog.css';
import { axiosFetch, renderHTML, formatDate, getLastHref } from './Helper';
import Loader from 'react-loader';
import axios from 'axios';

class BlogSingle extends Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      loaded: false
    };
  }

  componentDidMount() {
    this.checkAvailableProps();
  }

  fetchArticles() {
    (async () => {
      try {
        const response = await axios('http://api.finley-day.com/wp-json/posts');
        let item = response.data.find(x => getLastHref() === x.title.replace(/\s+/g, '-').toLowerCase());
        this.setState({
          articles: item,
          loaded: true
        });
      } catch (error) {
        console.log(error);
      }
    })();
    //request();

    // try {
    //   console.log('fetching');
    //   let response = await axios.get('http://api.finley-day.com/wp-json/posts');
    //   console.log(response.data);
    //   const url = this.props.location.pathname.substr(this.props.location.pathname.lastIndexOf('/') + 1);
    //   let item = response.data.find(x => url === x.title.replace(/\s+/g, '-').toLowerCase());
    //   this.setState({
    //     articles: item,
    //     loaded: true
    //   });
    // } catch (error) {
    //   console.log(error);
    // }

    // const self = this;
    // axiosFetch('https://react-bootstrap-and-go.firebaseio.com/blog.json', self, 'articles', 'loaded')
    //   .then(function(i) {
    //     let item = i.find(
    //       x =>
    //         x.title.replace(/\s+/g, '-').toLowerCase() ===
    //         self.props.location.pathname
    //           .slice(6)
    //           .replace(/\s+/g, '-')
    //           .toLowerCase()
    //     );

    //     self.setState({
    //       articles: item,
    //       loaded: true
    //     });
    //   })
    //   .catch(function(error) {
    //     console.log(error);
    //   });
  }

  checkAvailableProps() {
    const self = this;
    if (this.props.location.state) {
      self.setState({
        articles: this.props.location.state.item,
        loaded: true
      });
    } else {
      console.log('ESE');
      this.fetchArticles();
    }
  }

  render() {
    let item = this.state.articles;
    return (
      <div className="container">
        <Loader loaded={this.state.loaded}>
          <DisplayArticle article={this.state.articles} />
        </Loader>
      </div>
    );
  }
}

function DisplayArticle(props) {
  const item = props.article;
  return (
    <div>
      <h1 className="float-left">{item.title}</h1>
      <p className="float-right">{formatDate(item.date, 'Do MMMM YYYY')}</p>
      <div className="img">
        <img src={item.featuredImage} alt={item.featuredImageAlt} />
      </div>
      <div className="body" dangerouslySetInnerHTML={renderHTML(item.content)} />
      {/* <p>
            <strong>Tags: </strong>
            <Tags articles={item} />
          </p> */}
      <Link to="/Blog">
        <button className="btn btn-secondary btn-sm">Back to Articles</button>
      </Link>
    </div>
  );
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
