import React from 'react';
import classnames from 'classnames';
import { Container, Paper, Grid } from '@material-ui/core';
import PingJitter from '../common/PingJitter.js';
import DownloadUpload from '../common/DownloadUpload.js';
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
            <PingJitter />
          </Grid>
          <Grid
            item
            xs={6}
            sm={3}
            className='show-on-xs adjust-half-screen-mobile'
          >
            <DownloadUpload />
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
            <DownloadUpload />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
