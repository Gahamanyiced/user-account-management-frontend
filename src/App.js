import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Dash from "./pages/Dashboard";
import Login from "./pages/Login";
import Otp from "./pages/Otp";
import ForgotPass from "./pages/ForgotPassword";
import ResetPass from "./pages/ResetPassword";
import Landing from "./pages/Landing";
import Verify from "./pages/Verify";

import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectRoute";
import jwt_decode from "jwt-decode";
import VerifyAcc from "./pages/VerifyAccount";
import { useState } from "react";

export const isAuthenticated = () => {
  try {
    // const user =
    //   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjYzODQ2MzY4LCJleHAiOjE2NjM4NDYzNjl9.rSs31-j56Db58jFCjXICCfZyl9ckNh8d7gWmtQC6sFE";
    const decoded = jwt_decode(localStorage.token, { complete: true });
    const currentDate = new Date();
    if (decoded.exp * 1000 < currentDate.getTime()) {
      return; //Token is expired
    }
    return decoded;
  } catch (e) {
    return;
  }
};

function App() {
  const [theme, colorMode] = useMode();

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={false}
        />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Landing />} />

          <Route path="/login" element={<Login />} />
          <Route path="/otp" element={<Otp />} />
          <Route path="/forgotPassword" element={<ForgotPass />} />
          <Route path="/resetPassword/:token" element={<ResetPass />} />
          <Route element={<ProtectedRoute isLoggedIn={isAuthenticated} />}>
            <Route path="/dash" element={<Dash />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/verifyAccount" element={<VerifyAcc />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
