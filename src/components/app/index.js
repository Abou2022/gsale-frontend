import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Navbar = lazy(() => import('../navbar'));
const Home = lazy(() => import('../home'));
const Profile = lazy(() => import('../profile'));
const GarageSaleEvent = lazy(() => import('../garageSaleEvent'));
const CreateEvent = lazy(() => import('../createEvent'));
const NotFound = lazy(() => import('../notFound'));

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile/:id" element={<Profile />} />
          <Route
            path="/garagesale/:garageSaleEventId"
            element={<GarageSaleEvent />}
          />
          <Route path="/createevent/:id" element={<CreateEvent />} />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
