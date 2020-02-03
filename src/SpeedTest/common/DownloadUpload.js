import React from 'react';
import classnames from 'classnames';
import { Paper } from '@material-ui/core';

export default function DownloadUpload() {
  return (
    <Paper className={classnames('paper', 'progress-info-right')}>
      <div className={classnames('List')}>
        <ul className='hoplaList'>
          <li className='--hoplaList--hoplaList_item'>
            DOWNLOAD <small>ms</small>
          </li>
          <ul className={classnames('hoplaList', 'hoplaListProgress')}>
            <li className='--hoplaList--hoplaList_item'>12.2</li>
          </ul>
        </ul>
      </div>
      <div className='List'>
        <ul className='hoplaList'>
          <li className='--hoplaList--hoplaList_item'>
            UPLOAD <small>ms</small>
          </li>
          <ul className={classnames('hoplaList', 'hoplaListProgress')}>
            <li className='--hoplaList--hoplaList_item'>7</li>
          </ul>
        </ul>
      </div>
    </Paper>
  );
}
