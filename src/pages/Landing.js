import * as React from "react";
import Button from "@mui/material/Button";
import { Stack, Typography } from "@mui/material";
import logo from "../assets/logo.png";

const Landing = () => {
  return (
    <>
      <Stack
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          top: "33%",
          position: "relative",
        }}
        spacing={3}
      >
        <img
          src={logo}
          alt="Z Company Logo"
          style={{ width: "140px", height: "auto" }}
        />
        <Typography variant="h1" sx={{ mt: 2 }}>
          Welcome to Z Company
        </Typography>
        <Typography sx={{ mt: 2 }}>
          We offer the best products and services to our customers. Sign up or
          Log in to get started.
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            sx={{ mr: 2, bgcolor: "primary.light" }}
            href="./register"
          >
            Sign up
          </Button>
          <Button variant="contained" color="secondary" href="./login">
            Log in
          </Button>
        </Stack>
      </Stack>
    </>
  );
};

export default Landing;
