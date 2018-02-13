import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './style/blog.css';
import { axiosFetch, renderHTML, formatDate, getLastHref } from './Helper';
import Loader from 'react-loader';
import axios from 'axios';
import moment from 'moment';

class BlogSingle extends Component {
  constructor() {
    super();
    this.state = {
      articles: null,
      comments: null,
      loaded: false
    };
  }

  componentDidMount() {
    this.checkAvailableProps();
  }

  fetchArticles() {
    console.log('fetch');
    (async () => {
      try {
        const response = await axios('http://api.finley-day.com/wp-json/posts');
        //const commentsResponse = await axios('http://api.finley-day.com/wp-json/posts/' + i.location.state.item.ID + '/comments');
        let item = response.data.find(x => getLastHref() === x.title.replace(/\s+/g, '-').toLowerCase());
        const responseID = item.ID;
        console.log(responseID);
        const responseComments = await axios('http://api.finley-day.com/wp-json/posts/' + responseID + '/comments');
        console.log(responseComments);
        item.comments = responseComments.data;

        this.setState({
          articles: item,
          loaded: true
        });
        //this.fetchComments(item);
      } catch (error) {
        console.log(error);
      }
    })();
  }

  fetchComments(i) {
    console.log(i.location.state.item.ID);
    (async () => {
      try {
        const response = await axios('http://api.finley-day.com/wp-json/posts/' + i.location.state.item.ID + '/comments');
        console.log(response);
        this.setState({
          comments: response
        });
      } catch (error) {
        console.log(error);
      }
    })();
  }

  checkAvailableProps() {
    const self = this;
    if (this.props.location.state) {
      self.setState({
        articles: this.props.location.state.item,
        loaded: true
      });
      //this.fetchComments(this.props);
    } else {
      this.fetchArticles();
    }
  }

  render() {
    let item = this.state.articles;
    return (
      <div className="container">
        <Loader loaded={this.state.loaded}>
          <DisplayArticle article={this.state.articles} comments={this.state.articles} />
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
      <h2>Comments</h2>
      <CommentsPost />
      <Comments item={item} />
      <Link to="/Blog">
        <button className="btn btn-secondary btn-sm">Back to Articles</button>
      </Link>
    </div>
  );
}

function CommentsPost(props) {
  console.log(props);

  function handleEmailTextInputChange(e) {
    props.handleCommentEmail(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    axios.post(
      'http://api.finley-day.com/?wpapi=comment&dev=1&name=' +
        emailInput.value +
        '&email=' +
        emailInput.value +
        '&post_id=194&content=' +
        textInput.value
    );
    console.log(textInput.value);
  }

  let emailInput = null;
  let textInput = null;

  return (
    <form onSubmit={handleSubmit}>
      <div class="form-group">
        <label for="exampleFormControlInput1">Email address</label>
        <input
          type="email"
          class="form-control"
          id="exampleFormControlInput1"
          placeholder="name@example.com"
          ref={input => {
            emailInput = input;
          }}
        />
      </div>
      <div class="form-group">
        <label for="exampleFormControlTextarea1">Comment</label>
        <textarea
          class="form-control"
          id="exampleFormControlTextarea1"
          rows="3"
          ref={textarea => {
            textInput = textarea;
          }}
        />
      </div>
      <button type="submit" class="btn btn-primary">
        Post
      </button>
    </form>
  );
}

function Comments(props) {
  console.log(props);
  console.log(props.item.comments[0].content);
  let comments = props.item.comments.map(comment => {
    return (
      <div class="card mb-10">
        <div class="card-body">
          <div class="card-title float-left">{comment.author.name}</div>
          <div class="card-date float-right">{formatDate(comment.date, 'DD MM YYYY')}</div>
          <div class="clearfix" />
          <div class="card-content" dangerouslySetInnerHTML={renderHTML(comment.content)} />
        </div>
      </div>
    );
  });

  return comments;
  // comment.comments.map(function(i) {
  //   console.log(i);
  // });
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
