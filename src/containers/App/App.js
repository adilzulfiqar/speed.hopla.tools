import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Loader from '../../common/Loader';

const SpeadTest = React.lazy(() => import('../../SpeadTest'));

function App() {
  return (
    <Router>
      <React.Suspense fallback={<Loader />}>
        <Route path='/' exact>
          <SpeadTest />
        </Route>
      </React.Suspense>
    </Router>
  );
}

export default App;
