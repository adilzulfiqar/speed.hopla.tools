import React, { useState, useEffect, useCallback } from 'react';
import classnames from 'classnames';
import NetworkSpeed from 'network-speed';
import { Container, Paper, Grid } from '@material-ui/core';
import PingJitter from '../common/PingJitter.js';
import DownloadUpload from '../common/DownloadUpload.js';
import Arrow from '../../assets/images/arrow.png';
import './Progress.css';

const testNetworkSpeed = new NetworkSpeed();

export default function Progress() {
  const [downloadSpeed, setDownloadSpeed] = useState({
    currentSpeed: '',
    speedPoints: []
  });

  const getNetworkDownloadSpeed = useCallback(async () => {
    const baseUrl = 'http://eu.httpbin.org/stream-bytes/50000000';
    const fileSizeInBytes = 250000;
    const speed = await testNetworkSpeed.checkDownloadSpeed(
      baseUrl,
      fileSizeInBytes
    );
    // console.log(speed.mbps);
    setDownloadSpeed(prevState => ({
      currentSpeed: speed.mbps,
      speedPoints: [...prevState.speedPoints, Number(speed.mbps)]
    }));
  }, []);

  useEffect(() => {
    for (let i = 0; i < 50; i++) {
      getNetworkDownloadSpeed();
      // console.log(downloadSpeed.speedPoints);
    }

    return () => {};
  }, [getNetworkDownloadSpeed]);

  const startTest = () => {
    const arrAvg = arr => arr.reduce((a, b) => a + b, 0) / arr.length;
    // arrAvg([20, 10, 5, 10]) -> 11.25
    console.log(arrAvg(downloadSpeed.speedPoints));
    console.log('working', downloadSpeed.speedPoints);
  };

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
            <DownloadUpload downloadSpeed={downloadSpeed.currentSpeed} />
          </Grid>
          <Grid
            item
            xs={12}
            sm={6}
            className='adjust-half-screen-mobile iPhone4-landscape-50'
          >
            <Paper className={classnames('paper', 'paper-speed-meter')}>
              <span
                className={classnames('--paper-circle', 'speed-meter')}
                onClick={startTest}
              >
                <span>10</span>
                <span>25</span>
                <span>50</span>
                <span>75</span>
                <span>100</span>
                <img src={Arrow} alt='Arrow' />
              </span>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={3} className='hide-on-xs iPhone4-landscape-25'>
            <DownloadUpload downloadSpeed={downloadSpeed.currentSpeed} />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
