import React, { forwardRef } from "react";
import { Typography, Button, Box } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import styles from "./styles/KCFileUploadStyles";

const KCFileUpload = forwardRef(({ ...props }, ref) => {
  return (
    <Box sx={{ height: props.fieldLabel ? 135 : 110 }}>
      {props.fieldLabel !== "" ? (
        <Typography sx={styles.text}>{props.fieldLabel}</Typography>
      ) : (
        ""
      )}
      <Button
        disabled={props.disabled}
        variant="outlined"
        component="label"
        sx={{
          borderColor: props.colored ? "#1e1e1e" : "#1e1e1e",
          backgroundColor: "primary.dark",
          ...styles.button,
        }}
      >
        <CloudUploadIcon style={{ color: props.colored ? "white" : "white" }} />
        <Typography
          sx={{
            ...styles.boxText,
            color: props.colored ? "white" : "white",
          }}
        >
          {props.label}
        </Typography>
        <input
          ref={ref}
          hidden
          accept=".png, .jpg, .pdf"
          multiple
          type="file"
          {...props}
        />
      </Button>
      {props.error && <div style={styles.errorDiv}>{props.error?.message}</div>}
    </Box>
  );
});

export default KCFileUpload;
