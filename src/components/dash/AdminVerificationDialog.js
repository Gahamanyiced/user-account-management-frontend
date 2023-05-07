import React from "react";
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Stack,
  Typography,
} from "@mui/material";

const styles = {
  root: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    marginRight: 2,
    height: "auto",
    width: 250,
  },
};

const AdminVerificationDialog = ({
  open,
  onClose,
  onApprove,
  onDeny,
  image,
  ID,
}) => {
  return (
    <Dialog open={open} onClose={onClose} sx={{ width: "100vw" }}>
      <Stack
        alignItems="center"
        justifyContent="center"
        direction="row"
        mx={3}
        sx={styles.root}
      >
        <img src={image} alt="Verification" style={styles.image} />
        <DialogTitle>
          <Typography variant="h3">{ID}</Typography>
        </DialogTitle>
      </Stack>
      <DialogActions>
        <Button onClick={onApprove} color="secondary">
          Approve Verification
        </Button>
        <Button onClick={onDeny} color="error">
          Deny Verification
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AdminVerificationDialog;
