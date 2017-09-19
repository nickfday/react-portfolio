import React from "react";

function About() {
  return (
    <div className="about">
      <p>
        I am a full-time web developer based in London. I have a passion for
        frontend development as well as backend Drupal dev.
      </p>
      <p>Feel free to contact me on Twitter:</p>
      <p>
        <a
          href="https://twitter.com/nickfday"
          className="twitter-follow-button"
          data-show-count="false"
        >
          Follow @nickfday
        </a>
        <script async src="//platform.twitter.com/widgets.js" charset="utf-8" />
      </p>
    </div>
  );
}

export default About;
