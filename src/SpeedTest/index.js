import React, { useState } from 'react';
import Landing from './Landing/Landing.js';
import Progress from './Progress/Progress.js';
import Result from './Result/Result.js';
import History from './History/History.js';

function SpeedTest(props) {
  const [activeTab, setActiveTab] = useState('Landing');

  const startSpeedTest = () => {
    setActiveTab('Progress');
  };

  switch (activeTab) {
    case 'Progress':
      return <Progress />;
    case 'Result':
      return <Result />;
    case 'History':
      return <History />;

    default:
      return <Landing startSpeedTest={startSpeedTest} />;
  }
}

export default SpeedTest;
