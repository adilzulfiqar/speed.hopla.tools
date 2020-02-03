import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loader from 'src/common/Loader/index.js';

const SpeedTest = React.lazy(() => import('../../SpeedTest'));

function App() {
  return (
    <Router>
      <React.Suspense fallback={<Loader />}>
        <Route path='/' exact>
          <SpeedTest />
        </Route>
      </React.Suspense>
    </Router>
  );
}

export default App;
