import React from 'react';
import './Loader.css';

function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <div className='loader --loader-box_rotation'></div>
    </div>
  );
}

export default Loader;
