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

const Login = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    toast.promise(dispatch(login(data)).unwrap(), {
      pending: "Logging in...",
      success: {
        render() {
          navigate("/otp");
          return "Check your email for OTP code";
        },
      },
      error: {
        render({ data }) {
          return data.data.message;
        },
      },
    });
  };

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