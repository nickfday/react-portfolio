import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import '../style/blog.css';
import './projects.css';
import { axiosFetch, formatDate } from '../Helper';
import Loader from 'react-loader';
import _ from 'lodash';
import moment from 'moment';
import Slider from 'react-slick';
import '../../../node_modules/slick-carousel/slick/slick.css';
import '../../../node_modules/slick-carousel/slick/slick-theme.css';

export class Projects extends Component {
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
    axiosFetch('http://api.finley-day.com/wp-json/media?parent?type=project.json', self, 'articles', 'loaded')
      .then(function(i) {
        var orderedEvents = _.orderBy(i, o => o.parent.date_gmt, 'desc');

        self.setState({
          articles: orderedEvents,
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
    let articles = this.state.articles;

    if (this.props.slider) {
      return (
        <Loader loaded={this.state.loaded}>
          <div className="container">
            <h2>Projects</h2>
            <ProjectSlides item={articles} />
          </div>
        </Loader>
      );
    } else {
      return (
        <div className="projects projects-list container">
          <Loader loaded={this.state.loaded}>
            <div>
              <h1>Projects</h1>
              <ProjectRow item={articles} />
            </div>
          </Loader>
        </div>
      );
    }
  }
}

function ProjectSlides(props) {
  const slideStyle = {
    height: '156px',
    width: '192px'
  };

  const settings = {
    responsive: [
      {
        breakpoint: 500,
        settings: {
          arrows: true,
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 1,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 767,
        settings: {
          arrows: true,
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 1200,
        settings: {
          arrows: true,
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 10000,
        settings: {
          arrows: true,
          dots: false,
          infinite: true,
          speed: 300,
          slidesToShow: 5,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <Slider {...settings}>
      {Object.values(props.item).map(i => (
        <Link
          key={i.title}
          to={{
            pathname: `/project/${i.parent.title}`.replace(/\s+/g, '-').toLowerCase(),
            state: {
              item: i
            }
          }}
        >
          <img src={i.source} style={slideStyle} />
          <div className="caption">{i.parent.title}</div>
        </Link>
      ))}
    </Slider>
  );
}

function ProjectRow(props) {
  return (
    <div className="row">
      {Object.values(props.item).map(i => (
        <div key={i.uuid} className="col-sm-12 post">
          <div>
            <div className="row">
              <div className="col-sm-3">
                <div className="img">
                  <img src={i.source} />
                </div>
              </div>
              <div className="col-sm-9">
                <Link
                  to={{
                    pathname: `/projects/${i.parent.title}`.replace(/\s+/g, '-').toLowerCase(),
                    state: {
                      item: i
                    }
                  }}
                >
                  <h3>{i.parent.title}</h3>
                </Link>
                <div className="body" dangerouslySetInnerHTML={createMarkup(i.parent.excerpt)} />

                <p>{formatDate(i.parent.date_gmt, 'MMMM YYYY')}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function createMarkup(content) {
  return { __html: content };
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

export default Projects;
