import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Loader from 'react-loader';

import { useFetch, renderHTML } from './Helper';

const RichText = styled.div`
  overflow: hidden;
  img {
    height: 200px;
    width: 200px;
    float: right;
  }
`;

export const About = () => {
  const [data, loading] = useFetch(
    'https://api.finley-day.com/wp-json/pages/56'
  );

  return (
    <div className="about container">
      <Loader loaded={!loading}>
        <RichText
          className="body"
          dangerouslySetInnerHTML={renderHTML(data.content)}
        />
      </Loader>
    </div>
  );
};

// Welcome.propTypes = {};
