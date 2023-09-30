import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import App from "../App";
import FormUser from "../pages/FormUser"
import LoginForm from "../components/Login";
import Header from "../components/Header"
import Footer from "../components/Footer"
import Identify from "../components/Identify";
import CardDetails from "../pages/CardDetails"
//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";
  return (
    <div>
      <BrowserRouter basename={basename}>
      <Header/>
          <Routes>
            <Route element={<App />} path="/" />
            <Route element={<h1>Not found!</h1>} path="*" />
            <Route element={<FormUser />} path="/Register" />
            <Route element={<LoginForm/>} path="/LoginForm"/>
            <Route element={<Identify/>} path="/Identify"/>
            <Route element={<CardDetails/>} path="/CardDetails/"></Route>
          </Routes>
          <Footer/>
      
      </BrowserRouter>
    </div>
  );
};

export default Layout;
