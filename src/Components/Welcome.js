import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const Welcome = () => {
  // const [data, setData] = useState({ data: [] });

  // useEffect(async () => {
  //   const result = await axios('http://api.finley-day.com/wp-json/pages/85');
  //   setData(result.data);
  // });

  return (
    <div>
      <h2>Welcome</h2>
      <p>
        My name is Nick and I'm based in Bedfordshire, England. I've been a
        software engineer since 2010 and have worked in London, Melbourne and
        Sydney. As well as showcasing my work I am going to be regularly
        blogging about tech related topics.
      </p>
    </div>
  );
};

// Welcome.propTypes = {};
