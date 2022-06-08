import React from "react";
import { Routes, Route } from "react-router-dom";

import Navbar from "../navbar";
import Home from "../home";
import Profile from "../profile";
import GarageSaleEvent from "../garageSaleEvent";
import CreateEvent from "../createEvent";
import NotFound from "../notFound";

function App() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/garagesale/:id" element={<GarageSaleEvent />} />
        <Route path="/createevent/:id" element={<CreateEvent />} />
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
