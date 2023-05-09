import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/reusable/Header";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { resetPasswordValidation } from "../validations/index";
import { resetPassword } from "../features/Auth/resetPasswordSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";

const ResetPass = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    resolver: yupResolver(resetPasswordValidation),
  });
  const { token } = useParams();
  console.log(token);

  const handleSend = async (data) => {
    if (data.password !== data.confirmPassword) {
      toast.error("New password and confirm password must be the same");
      return;
    }

    // toast.promise(dispatch(addTranshipment(formData)).unwrap(), {
    //     pending: "Please wait a moment...",
    //     success:() =>{
    //         return "";
    //     },
    //     error: {
    //       render({ data }) {
    //         return data.data.message;
    //       },
    //     },
    // });

    toast.promise(
      dispatch(
        resetPassword({
          token: token,
          payload: {
            password: getValues("password"),
          },
        })
      ).unwrap(),
      {
        pending: "Please wait a moment...",
        success: {
          render() {
            navigate("/login");
            return "Password successfully reseted";
          },
        },
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
      <Header title="Reset Password" subtitle="Reset your password" />
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
          label="New Password"
          placeholder="Enter your new Password"
          {...register("password")}
          control={control}
          error={errors?.password ? true : false}
          helperText={errors?.password ? errors?.password?.message : null}
          sx={{ gridColumn: "span 2" }}
        />

        <TextField
          variant="filled"
          fullWidth
          type="text"
          label="Confirm Password"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          control={control}
          error={errors?.confirmPassword ? true : false}
          helperText={
            errors?.confirmPassword ? errors?.confirmPassword?.message : null
          }
          sx={{ gridColumn: "span 2" }}
        />

        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit(handleSend)}
        >
          Reset Password
        </Button>
      </Box>
      <Box display="flex" justifyContent="end" mt="20px"></Box>
    </Box>
  );
};

export default ResetPass;
