import React from "react";
import UserTable from "./UserInfoTable/UserTable";
import UserData from "./CreateUserData/UserData";
import SideBar from "./SideBar/SideBar";
import { Route, Routes } from "react-router-dom";
import Home from "./homepage/Home";
import Loginpage from "./login page/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element = {<Loginpage/>}/>
        <Route path="/home" element={<Home />} />
        <Route path="/sidebar" element={<SideBar />} />
        <Route path="/userdata" element={<UserData />} />
        <Route path="/usertable" element={<UserTable />} />
      </Routes>
    </>
  );
}

export default App;
