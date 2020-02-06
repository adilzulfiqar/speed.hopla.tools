import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Container, Paper, Grid, Link } from '@material-ui/core';
// import Loader from '../../assets/images/getting-loader.gif';
import './Landing.css';

function Landing({ startSpeedTest, data }) {
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
              <span onClick={startSpeedTest} className='--paper-circle'>
                GO
              </span>
              <br />
              <Link href='#' onClick={() => {}}>
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
                    <li className='--hoplaList--hoplaList_item'>
                      {data && data.ipAddress ? data.ipAddress : '-'}
                    </li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>CITY</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>
                      {data && data.city ? data.city : '-'}
                    </li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>REGION</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>
                      {data && data.region ? data.region : '-'}
                    </li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>COUNTRY</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>
                      {data && data.country ? data.country : '-'}
                    </li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>PROVIDER</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>
                      {data && data.provider ? data.provider : '-'}
                    </li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>BROWSER</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>
                      {data && data.browser ? data.browser : '-'}
                    </li>
                  </ul>
                  <li className='--hoplaList--hoplaList_item'>OS</li>
                  <ul className='hoplaList'>
                    <li className='--hoplaList--hoplaList_item'>
                      {data && data.OS ? data.OS : '-'}
                    </li>
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

Landing.propTypes = {
  startSpeedTest: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired
};

export default Landing;
