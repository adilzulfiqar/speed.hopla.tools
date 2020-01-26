import React from 'react';
import classnames from 'classnames';
import { Container, Paper, Grid, Link } from '@material-ui/core';
import './Landing.css';

function Landing(props) {
  const preventDefault = () => {};
  return (
    <div className='centered-position'>
      <Container maxWidth='sm'>
        <Grid
          container
          spacing={0}
          direction='row'
          justify='center'
          alignItems='center'
        >
          <Grid item xs={12} sm={6} style={{ height: '100%' }}>
            <Paper
              className={classnames('paper', 'mobile-paper-go')}
              style={{ height: '100%' }}
            >
              <span className='--paper-circle'>GO</span>
              <br />
              <Link href='#' onClick={preventDefault}>
                Want to save your Results? Login
              </Link>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6} style={{ height: '100%' }}>
            <Paper className={classnames('paper', 'mobile-paper-List')}>
              <div className='List'>
                <ul className='hoplaList'>
                  <li className='--hoplaList--hoplaList_item'>IP ADDRESS</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>198.161.1.1</li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>CITY</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>Lahore</li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>REGION</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>ASIA</li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>PROVIDER</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>no thing</li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>BROWSER</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>CHROME</li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>OS</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>MAC</li>
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

export default Landing;
