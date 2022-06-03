import './App.css';
import React, {useState} from "react";
import Home from "./pages/Home";
import Event from "./pages/Event";
import Login from "./pages/Login";
import Map from "./pages/Map";
import Profile from "./pages/Profile";
import Navbar from "./components/Navbar";

function App() {
    const [page, setPage] = useState("home"); //page variable holds the word home
    const PageRender = () => {
      switch (page) {
        case "home":
          return <Home />; //if the case has the work about in it it's going to return the component
        case "login":
          return <Login />;
        case "profile":
          return <Profile />;
        case "event":
          return <Event />;
        case "map":
          return <Map />;
      }
    };
  return (
    <div>
      <Navbar page={page} setPage={setPage} />
      {/* naming the prop page, but passing the value inside the state called page */}
      <PageRender />
    </div>
  );
}

export default App;
