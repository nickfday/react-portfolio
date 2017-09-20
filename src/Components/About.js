import React from "react";
import { Follow } from "react-twitter-widgets";

function About() {
  return (
    <div className="about">
      <h1>About</h1>
      <p>
        I am a full-time web developer based in London. I have a passion for
        frontend development as well as backend Drupal dev.
      </p>
      <p>Feel free to contact me on Twitter:</p>
      <Follow
        username="nickfday"
        options={{
          showCount: false,
          size: "large"
        }}
      />
    </div>
  );
}

export default About;
