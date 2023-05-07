import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/reusable/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotPasswordValidation } from "../validations/index";
import { forgotPassword } from "../features/Auth/forgotPasswordSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const ForgotPass = (props) => {
  const dispatch = useDispatch();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(forgotPasswordValidation),
  });

  const handleSend = async (data) => {
    toast.promise(
      dispatch(forgotPassword({ email: getValues("email") })).unwrap(),
      {
        pending: "Please wait a moment...",
        success: "Check your email for link to reset password",
        error: {
          render({ data }) {
            return data.data.message;
          },
        },
      }
    );
  };

  return (
    <Box my={5} px={10}>
      <Header title="Forgot" subtitle="Retrieve password" />
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
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit(handleSend)}
        >
          Send Email
        </Button>
      </Box>
      <Box display="flex" justifyContent="end" mt="20px"></Box>
    </Box>
  );
};

export default ForgotPass;
