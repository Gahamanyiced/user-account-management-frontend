import { Box, Button } from "@mui/material";
import Header from "../reusable/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { TextField } from "@mui/material";
import KCFileUpload from "../reusable/KCFileUpload";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { verifyUserValidation } from "../../validations";
import styles from "./styles/indexStyles";
import { toast } from "react-toastify";
import { updateUserId } from "../../features/User/updateUserId";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useDispatch } from "react-redux";

const VerifyAccount = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onVerify = (data) => {
    let formData = new FormData();
    formData.append("identifierNumber", data.identifierNumber);
    formData.append("documentImage", data.documentImage);

    toast.promise(dispatch(updateUserId(formData)).unwrap(), {
      pending: "Loading...",
      success: {
        render() {
          navigate("/dash");
          return "Verification is pending";
        },
      },
      error: {
        render({ data }) {
          return data.data.message;
        },
      },
    });
  };

  const {
    register,
    handleSubmit,

    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifyUserValidation),
  });

  return (
    <Box m="20px" px={2}>
      <Box my={5} px={3}>
        <Header
          title="Verify your account"
          subtitle="Upload required documents"
        />

        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
          }}
        >
          <TextField
            variant="standard"
            fullWidth
            type="text"
            label="ID Number"
            placeholder="Enter your ID Number"
            {...register("identifierNumber")}
            error={errors?.age ? true : false}
            helperText={errors?.age ? errors?.age?.message : null}
            sx={{ gridColumn: "span 4" }}
          />
          <Box sx={{ mt: 2, gridColumn: "span 4" }}>
            {watch("documentImage") && watch("documentImage")?.length > 0 ? (
              <KCFileUpload
                colored="true"
                label={watch("documentImage")[0]?.name}
                {...register("documentImage")}
              />
            ) : (
              <KCFileUpload label="Upload ID" {...register("documentImage")} />
            )}
            {errors.documentImage && (
              <div style={styles.errorDiv}>{errors.documentImage?.message}</div>
            )}
          </Box>
        </Box>
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit(onVerify)}
        >
          Upload for verification
        </Button>
      </Box>
    </Box>
  );
};

export default VerifyAccount;
