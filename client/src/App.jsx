import "./App.css";
import Body from "./components/body";
import Navbar from "./components/navbar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./components/signin";
import Login from "./components/login";
import axios from "axios";
import Authcontextprovider from "./context/authcontext";

axios.defaults.withCredentials = true;

function App() {
  return (
    <>
      <Authcontextprovider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Signin />} />
            <Route path="/login" element={<Login />} />
            <Route path="/body" element={<Body />} />
          </Routes>
        </Router>
      </Authcontextprovider>
    </>
  );
}

export default App;
