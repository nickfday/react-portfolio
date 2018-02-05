import 'bootstrap/dist/css/bootstrap.css';
import './App.css';

import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Navigation from './Navigation';
import Blog from './Blog';
import BlogSingle from './BlogSingle';
import Footer from './Footer';
import About from './About';
import Projects from './Projects/Projects';
import ProjectSingle from './Projects/ProjectSingle';
import base from '../base';
import './App.css';
import ReactGA from 'react-ga';
ReactGA.initialize('UA-54519684-1');
ReactGA.pageview(window.location.pathname + window.location.search);

const NoMatch = ({ location }) => (
  <div className="container content">
    404- No match for <code>{location.pathname}</code>
  </div>
);

class App extends Component {
  constructor() {
    super();
    this.state = {
      articles: {},
      loaded: true
    };
  }

  // fireBaseSync() {
  //   const request = async () =>
  //     await base.syncState('blog', {
  //       context: this,
  //       state: 'articles',
  //       asArray: false,
  //       then() {
  //         this.setState(prevState => ({
  //           loaded: true
  //         }));
  //         //fireBaseSync("blog", this.state.articles);
  //       }
  //     });
  //   request();
  // }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navigation state={this.state} />
            <div className="container-flexible content">
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/blog" component={Blog} />
                <Route exact path="/projects" component={Projects} />
                <Route exact path="/projects/:id" component={ProjectSingle} />
                <Route exact path="/blog/:id" component={BlogSingle} />
                <Route component={NoMatch} />
              </Switch>
            </div>
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
