import { Box, Button, TextField, Stack } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/reusable/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidation } from "../validations/index";
import { login } from "../features/Auth/LoginSlice";
import { useDispatch } from "react-redux";
import { useTheme } from "@emotion/react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../App";
import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

const Login = (props) => {
  const navigate = useNavigate();

  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();

  const theme = useTheme();

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginValidation),
  });

  const handleLogin = async (data) => {
    toast("Logging in...", { colored: false });
    localStorage.setItem("email", data.email);
    const res = await dispatch(login(data));

    console.log(res);
    if (res.payload.data.status !== 200) {
      toast.error("Invalid credentials");
      return;
    } else {
      navigate("/otp");
      toast.success("Check your email for OTP code");
    }
    // toast.promise(dispatch(login(data)).unwrap(), {
    //   pending: "Logging in...",
    //   success: {
    //     render() {
    //       navigate("/otp");
    //       return "Check your email for OTP code";
    //     },
    //   },
    //   error: "error occured during log in",
    // });
  };
  const [shouldRedirect, setShouldRedirect] = useState(false);

  useEffect(() => {
    if (isAuthenticated()?.id) {
      setShouldRedirect(true);
    }
  }, []);

  if (shouldRedirect) {
    props.handleUser();
    console.log(localStorage.getItem("token"));
    return <Navigate to="/dash" />;
  }

  return (
    <Box my={5} px={10}>
      <Header title="Log in" subtitle="Welcome Back" />
      <Box
        display="grid"
        gap="30px"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        <TextField
          variant="filled"
          fullWidth
          type="text"
          control={control}
          label="Email"
          placeholder="Enter your email"
          {...register("email")}
          error={errors?.email ? true : false}
          helperText={errors?.email ? errors?.email?.message : null}
          sx={{ gridColumn: "span 2" }}
        />
        <Stack>
          <TextField
            variant="filled"
            fullWidth
            type="text"
            label="Password"
            placeholder="Enter your Password"
            {...register("password")}
            control={control}
            error={errors?.password ? true : false}
            helperText={errors?.password ? errors?.password?.message : null}
            sx={{ gridColumn: "span 2" }}
          />
          <a
            style={{ color: theme.palette.secondary.dark }}
            href="./forgotpassword"
          >
            Forgot password?
          </a>
        </Stack>
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit(handleLogin)}
        >
          Log in
        </Button>
      </Box>
    </Box>
  );
};

export default Login;
