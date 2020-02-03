import React from 'react';
import { Container, Grid } from '@material-ui/core';
import HistoryDetails from '../common/HistoryDetails';
import './History.css';

export default function History() {
  return (
    <div className='centered-position'>
      <Container maxWidth='sm' className=''>
        <Grid
          container
          spacing={0}
          direction='row'
          justify='center'
          alignItems='center'
          className='history'
        >
          <Grid item xs={12} sm={4} className='adjust-half-screen-mobile '>
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
          <Grid item xs={12} sm={8} className='adjust-half-screen-mobile '>
            <HistoryDetails />
            <HistoryDetails />
            <HistoryDetails />
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
