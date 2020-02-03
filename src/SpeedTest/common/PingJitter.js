import React from 'react';
import classnames from 'classnames';
import { Paper } from '@material-ui/core';

export default function PingJitter() {
  return (
    <Paper className={classnames('paper', 'progress-info-left')}>
      <div className='List'>
        <ul className='hoplaList'>
          <li className='--hoplaList--hoplaList_item'>
            PING <small>ms</small>
          </li>
          <ul className={classnames('hoplaList', 'hoplaListProgress')}>
            <li className='--hoplaList--hoplaList_item'>12</li>
          </ul>
        </ul>
      </div>
      <div className='List'>
        <ul className='hoplaList'>
          <li className='--hoplaList--hoplaList_item'>
            JITTER <small>ms</small>
          </li>
          <ul className={classnames('hoplaList', 'hoplaListProgress')}>
            <li className='--hoplaList--hoplaList_item'>7</li>
          </ul>
        </ul>
      </div>
    </Paper>
  );
}
