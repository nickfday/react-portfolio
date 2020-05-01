import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

export const Welcome = () => {
  const [data, setData] = useState({ data: [] });

  useEffect(async () => {
    const result = await axios('http://api.finley-day.com/wp-json/pages/85');
    setData(result.data);
  });

  return <div>Welcome</div>;
};

// Welcome.propTypes = {};
