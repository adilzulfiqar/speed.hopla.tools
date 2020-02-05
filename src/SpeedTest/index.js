import React, { useState, useEffect } from 'react';
import publicIp from 'public-ip';
import { detect } from 'detect-browser';
import iplocation from 'iplocation';
import Landing from './Landing/Landing.js';
import Progress from './Progress/Progress.js';
import Result from './Result/Result.js';
import History from './History/History.js';

function SpeedTest(props) {
  const initialStateNetworkInformation = {
    ipAddress: null,
    city: null,
    region: null,
    country: null,
    provider: null,
    browser: null,
    OS: null
  };

  const [activeTab, setActiveTab] = useState('Landing');
  const [networkInformation, setNetworkInformation] = useState(
    initialStateNetworkInformation
  );

  const startSpeedTest = () => {
    setActiveTab('Progress');
  };

  // Get IP Address
  (async () => {
    //=> '46.5.21.123'
    const ipAddress = await publicIp.v4();
    setNetworkInformation(prevState => ({
      ...prevState,
      ipAddress
    }));
  })();

  useEffect(() => {
    // Getting country, region, city through iplocation
    if (networkInformation.ipAddress) {
      iplocation(networkInformation.ipAddress)
        .then(res => {
          console.log(res);
          const { country, region, city } = res;
          setNetworkInformation(prevState => ({
            ...prevState,
            country,
            region,
            city
          }));
        })
        .catch(err => {
          console.log(err);
        });
    }

    // Getting name, os through detect-browser
    const browser = detect();
    if (browser) {
      const { name, os } = browser;
      setNetworkInformation(prevState => ({
        ...prevState,
        browser: name,
        OS: os
      }));
    }
  }, [networkInformation.ipAddress]);

  switch (activeTab) {
    case 'Progress':
      return <Progress />;
    case 'Result':
      return <Result />;
    case 'History':
      return <History />;

    default:
      return (
        <Landing startSpeedTest={startSpeedTest} data={networkInformation} />
      );
  }
}

export default SpeedTest;
