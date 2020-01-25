import React from 'react';
import './Loader.css';
// import PropTypes from 'prop-types';

function Loader () {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div class='loader box-rotation'></div>
    </div>
  );
}

// Loader.propTypes = {};

export default Loader;
