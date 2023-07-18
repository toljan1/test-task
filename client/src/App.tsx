import React, { Suspense, lazy } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { NotFoundPage } from './components/NotFoundPage/NotFoundPage';
import "bulma/bulma.sass";

const HomePage = lazy(
  () => import('./components/HomePage/HomePage'),
);

const TickersPage = lazy(() => import('./components/TickersPage/TickersPage'));

const UserTickersPage = lazy(() => import('./components/UserTickersPage/UserTickersPage'));

const App: React.FC = () => (
  <section>
    <nav className='navbar is-flex is-flex-direction-row is-justify-content-center'>
      <Link
        to="/"
        className="navbar-item"
      >
        Home
      </Link>
      <Link
        to="/TickersPage"
        className="navbar-item"
      >
        Trending Tickers
      </Link>
      <Link
        to="/UserTickersPage"
        className="navbar-item"
      >
        My tickets
      </Link>
    </nav>
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route
          path="/"
          element={<HomePage />}
        />
        <Route
          path="TickersPage"
          element={<TickersPage />}
        />
        <Route
          path="UserTickersPage"
          element={<UserTickersPage />}
        />
        <Route
          path="*"
          element={<NotFoundPage />}
        />
      </Routes>
    </Suspense>
  </section>
  
)
export default App;
