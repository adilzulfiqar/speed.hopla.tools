import React from 'react';
import classnames from 'classnames';
import { Paper } from '@material-ui/core';
import './common.css';

export default function HistoryDetails() {
  return (
    <Paper className={classnames('paper', 'result-history')}>
      <div className='result-history_header'>
        <div>
          <span>PING ms</span>
          <h1>7</h1>
        </div>
        <div>
          <span>JITTER ms</span>
          <h1>7</h1>
        </div>
        <div>
          <span>DOWN ms</span>
          <h1>7</h1>
        </div>
        <div>
          <span>UP ms</span>
          <h1>7</h1>
        </div>
      </div>
      <div className='result-history_footer'>
        <span>01/01/2019 16:45</span>
        <span>Chrome 76-Mac OS</span>
      </div>
    </Paper>
  );
}
