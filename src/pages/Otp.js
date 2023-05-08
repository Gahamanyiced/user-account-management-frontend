import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/reusable/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { otpValidation } from "../validations/index";
import { verifyOtp } from "../features/Auth/VerifyOtpSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Otp = (props) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(otpValidation),
  });
  const navigate = useNavigate();

  const handleVerify = async (data) => {
    const email = localStorage.getItem("email");
    toast.promise(dispatch(verifyOtp({ ...data, email: email })).unwrap(), {
      pending: "Please wait a moment...",
      success: {
        render(res) {
          localStorage.setItem("token", res?.data?.data?.data?.token);

          const token = localStorage.getItem("token");
          console.log(token);
          navigate("/dash");
          return "Welcome Back";
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
      <Header title="Verify your email" subtitle="Otp verification" />
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
          label="OTP code"
          placeholder="Enter your OTP code"
          {...register("otp")}
          error={errors?.otp ? true : false}
          helperText={errors?.otp ? errors?.otp?.message : null}
          sx={{ gridColumn: "span 2" }}
        />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit(handleVerify)}
        >
          Verify OTP
        </Button>
      </Box>
      <Box display="flex" justifyContent="end" mt="20px"></Box>
    </Box>
  );
};

export default Otp;
