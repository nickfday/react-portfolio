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

export const Welcome = () => {
  const [data, loading] = useFetch(
    'https://api.finley-day.com/wp-json/pages/293'
  );

  return (
    <Loader loaded={!loading}>
      <RichText
        className="body"
        dangerouslySetInnerHTML={renderHTML(data.content)}
      />
    </Loader>
  );
};

// Welcome.propTypes = {};
