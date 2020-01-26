import React from 'react';
import classnames from 'classnames';
import { Container, Paper, Grid } from '@material-ui/core';
import Arrow from '../../assets/images/arrow.png';
import './Progress.css';

export default function Progress() {
  return (
    <div className='centered-position'>
      <Container maxWidth='sm'>
        <Grid
          container
          spacing={0}
          direction='row'
          justify='center'
          alignItems='center'
          className='progress-container'
        >
          <Grid
            item
            xs={6}
            sm={3}
            className='adjust-half-screen-mobile iPhone4-landscape-25'
          >
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
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            className='show-on-xs adjust-half-screen-mobile'
          >
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
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className='adjust-half-screen-mobile iPhone4-landscape-50'
          >
            <Paper className={classnames('paper', 'paper-speed-meter')}>
              <span className={classnames('--paper-circle', 'speed-meter')}>
                <span>10</span>
                <span>25</span>
                <span>50</span>
                <span>100</span>
                <span>250</span>
                <img src={Arrow} alt='Arrow' />
              </span>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} className='hide-on-xs iPhone4-landscape-25'>
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
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
