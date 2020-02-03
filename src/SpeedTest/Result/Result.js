import React from 'react';
import { Container, Grid } from '@material-ui/core';
import PingJitter from '../common/PingJitter.js';
import DownloadUpload from '../common/DownloadUpload.js';
import './Result.css';

export default function Result() {
  return (
    <div className='centered-position'>
      <Container maxWidth='sm'>
        <Grid
          container
          spacing={0}
          direction='row'
          justify='center'
          alignItems='center'
          className='results-container adjust-half-screen-mobile'
        >
          <Grid item xs={6} sm={3} className=' iPhone4-landscape-25'>
            <PingJitter />
          </Grid>
          <Grid item xs={6} sm={3} className='show-on-xs'>
            <DownloadUpload />
          </Grid>
          <Grid item xs={12} sm={6} className='result-score'>
            <h3>Score</h3>
            <h1>ACCEPTABLE</h1>
            <h3>LINK</h3>
            <h1>2J4HD4</h1>
          </Grid>
          <Grid item xs={6} sm={3} className='hide-on-xs'>
            <DownloadUpload />
          </Grid>
        </Grid>
        <Grid
          container
          spacing={0}
          direction='row'
          alignItems='center'
          justify='center'
          className='results adjust-half-screen-mobile'
        >
          <Grid item xs={12} sm={4}>
            <ul className='hoplaList'>
              <li className='--hoplaList--hoplaList_item'>IP ADDRESS</li>
              <ul className='hoplaList'>
                <li className='--hoplaList--hoplaList_item'>198.161.1.1</li>
              </ul>
              <li className='--hoplaList--hoplaList_item'>PROVIDER</li>
              <ul className='hoplaList'>
                <li className='--hoplaList--hoplaList_item'>no thing</li>
              </ul>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4}>
            <ul className='hoplaList'>
              <li className='--hoplaList--hoplaList_item'>CITY</li>
              <ul className='hoplaList'>
                <li className='--hoplaList--hoplaList_item'>Lahore</li>
              </ul>
              <li className='--hoplaList--hoplaList_item'>REGION</li>
              <ul className='hoplaList'>
                <li className='--hoplaList--hoplaList_item'>ASIA</li>
              </ul>
              <li className='--hoplaList--hoplaList_item'>COUNTRY</li>
              <ul className='hoplaList'>
                <li className='--hoplaList--hoplaList_item'>PAKISTAN</li>
              </ul>
            </ul>
          </Grid>
          <Grid item xs={6} sm={4}>
            <ul className='hoplaList'>
              <li className='--hoplaList--hoplaList_item'>BROWSER</li>
              <ul className='hoplaList'>
                <li className='--hoplaList--hoplaList_item'>CHROME</li>
              </ul>
              <li className='--hoplaList--hoplaList_item'>OS</li>
              <ul className='hoplaList'>
                <li className='--hoplaList--hoplaList_item'>MAC</li>
              </ul>
              <li className='--hoplaList--hoplaList_item'>SERVER</li>
              <ul className='hoplaList'>
                <li className='--hoplaList--hoplaList_item'>GIG</li>
              </ul>
            </ul>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
