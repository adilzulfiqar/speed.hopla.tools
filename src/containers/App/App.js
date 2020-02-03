import React from 'react';
// import { BrowserRouter as Router, Route } from 'react-router-dom';
// import Loader from '../../common/Loader/Loader.js';
import SpeedTest from '../../SpeedTest';
// const SpeedTest = React.lazy(() => import('../../SpeedTest'));

function App() {
  return <SpeedTest />;
}

// {/* <Router>
//   <React.Suspense fallback={<Loader />}>
//     <Route path='/' exact>
//     </Route>
//   </React.Suspense>
// </Router> */}
export default App;
