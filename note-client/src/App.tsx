import "./_main.scss";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Authentication/SignUp";
import Navbar from "./Components/Navbar/Navbar";
import Login from "./Components/Authentication/Login";
import Home from "./Pages/Home";
import NewMeeting from "./Components/Extra-Feature/NewMeetingPage";
import MeetingRoom from "./Components/Extra-Feature/MeetingRoom";

function App() {
  return (
    <>
      <Navbar />
      <Router>
        <Routes>
          <Route path="/" element={<SignUp />} />
          <Route path="/Login" element={<Login/>}/>
          <Route path="/Authenticated-Home" element={<Home/>}/>
          <Route path="/new-meeting" element={<NewMeeting/>}/>
          <Route path="/meeting/:id" element={<MeetingRoom/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
