import React, { Component } from 'react';
import { Projects } from './Projects/Projects';
import { Blog } from './Blog';

class App extends Component {
    render() {
        return (
            <div className="home">
                <div className="intro">
                    <section className="container">
                        <h2>Welcome</h2>
                        <p>My name is Nicholas Finley-Day and I am a web developer. Examples of my work are listed below.</p>
                    </section>
                </div>
                <section>
                    <Projects slider="true" />
                </section>

                <section className="contact">
                    <Blog type="home" />
                </section>

                <section className="">
                    <div className="container">
                        <h2>Contact</h2>
                        <p>
                            If you’re interested in our services please email <a href="mailto:nick@finley-day.com">nick@finley-day.com</a>.
                        </p>
                    </div>
                </section>
            </div>
        );
    }
}

export default App;
