import React, { Component } from "react";
import { Projects } from "./Projects/Projects";
import { Blog } from "./Blog";

class App extends Component {
  render() {
    return (
      <div className="home">
        <div className="intro">
          <section className="container">
            <h2>Welcome</h2>
            <p>
              We build professional web applications. From small-scale to large
              enterprise solutions. Our projects are listed below.
            </p>
          </section>
        </div>
        <section>
          <Projects slider="true" />
        </section>

        <section className="contact">
          <Blog />
        </section>

        <section className="">
          <div className="container">
            <h2>Contact</h2>
            <p>
              If you’re interested in our services please email{" "}
              <a href="mailto:nickfday@gmail.com">nickfday@gmail.com</a>.
            </p>
          </div>
        </section>
      </div>
    );
  }
}

export default App;
