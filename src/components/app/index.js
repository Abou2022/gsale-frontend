import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

const Navbar = lazy(() => import('../navbar'));
const Home = lazy(() => import('../home'));
const Profile = lazy(() => import('../profile'));
const Profile2 = lazy(() => import('../profile2'));
const GarageSaleEvent = lazy(() => import('../garageSaleEvent'));
const GarageSaleEventFormContainer = lazy(() =>
  import('../garageSaleEventFormContainer')
);
const CreateEvent = lazy(() => import('../createEvent'));
const NotFound = lazy(() => import('../notFound'));
const Footer = lazy(() => import('../footer'));

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
          <Route path="/profile2/:id" element={<Profile2 />} />
          <Route
            path="/garagesale/:garageSaleEventId"
            element={<GarageSaleEvent />}
          />
          <Route path="/createevent/:id" element={<CreateEvent />} />
          <Route path="/create" element={<GarageSaleEventFormContainer />} />
          <Route
            path="/update/:garageSaleEventId"
            element={<GarageSaleEventFormContainer />}
          />
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Suspense>
      <div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
