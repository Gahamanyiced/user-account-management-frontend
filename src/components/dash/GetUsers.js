import React, { useEffect, useState } from "react";
import Header from "../reusable/Header";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../features/User/getAllUserSlice";
import AdminVerificationDialog from "./AdminVerificationDialog";
import { updateUser } from "../../features/User/updateUserSlice";

import {
  Button,
  Avatar,
  Table,
  TableHead,
  TableBody,
  TableRow,
  Paper,
  TableContainer,
  TableCell,
  Stack,
} from "@mui/material";

const styles = {
  table: {
    minWidth: 650,
    maxWidth: "90vw",
    margin: "auto",
    my: 3,
  },
  header: {
    color: "secondary.dark",
    fontSize: "16px",
    textAlign: "left",
  },
};

function GetUsers() {
  const [displayVerification, setDisplayVerification] = useState(false);
  const [selectedUser, setSelectedUser] = useState();
  const [users, setUsers] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const send = async () => {
      const res = await dispatch(getAllUsers());
      console.log(res?.payload?.data?.data);
      setUsers(res?.payload?.data?.data);
    };
    send();
  }, [dispatch]);

  const handleSelect = (user) => {
    setSelectedUser(user);
    setDisplayVerification(true);
  };

  const onApprove = () => {
    let formData = new FormData();
    formData.append("accountStatus", "VERIFIED");
    toast.promise(dispatch(updateUser()).unwrap(), {
      pending: "Loading...",
      success: {
        render() {
          return "Verification was successfull";
        },
      },
      error: {
        render({ data }) {
          return data.data.message;
        },
      },
    });
  };

  const renderButton = (accountStatus, user) => {
    if (accountStatus === "UNVERIFIED") {
      return (
        <Button
          variant="contained"
          color="error"
          onClick={() => handleSelect(user)}
        >
          Verify
        </Button>
      );
    } else if (accountStatus === "PENDING") {
      return (
        <Button
          variant="contained"
          disabled
          color="warning"
          onClick={handleSelect(user)}
        >
          Pending
        </Button>
      );
    } else if (accountStatus === "VERIFIED") {
      return (
        <Button
          variant="contained"
          disabled
          color="success"
          onClick={handleSelect(user)}
        >
          Verified
        </Button>
      );
    }
  };

  return (
    <>
      {displayVerification && (
        <AdminVerificationDialog
          open={displayVerification}
          onClose={() => {
            setDisplayVerification(false);
          }}
          onApprove={onApprove}
          onDeny={() => {
            setDisplayVerification(false);
          }}
          image={selectedUser?.documentImage}
          ID={selectedUser?.identifierNumber}
        />
      )}
      <Stack m={3} sx={{ height: "94vh", boxSizing: "content-box" }}>
        <Header title="User Management" subtitle="manage all your users" />
        <TableContainer
          component={Paper}
          sx={{
            backgroundColor: "primary.main",
            maxHeight: "100%",
            overflow: "scroll",
          }}
        >
          <Table sx={styles.table} aria-label="user table">
            <TableHead>
              <TableRow>
                <TableCell align="left" sx={styles.header}>
                  Avatar
                </TableCell>
                <TableCell align="left" sx={styles.header}>
                  Name
                </TableCell>
                <TableCell align="left" sx={styles.header}>
                  Gender
                </TableCell>
                <TableCell align="left" sx={styles.header}>
                  Age
                </TableCell>
                <TableCell align="left" sx={styles.header}>
                  Email
                </TableCell>

                <TableCell align="left" sx={styles.header}>
                  Date of Birth
                </TableCell>
                <TableCell align="left" sx={styles.header}>
                  Nationality
                </TableCell>
                <TableCell align="left" sx={styles.header}>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user?._id}>
                  <TableCell component="th" scope="row">
                    <Avatar alt={user?.name} src={user?.photo} />
                  </TableCell>
                  <TableCell align="left">{user?.name}</TableCell>
                  <TableCell align="left">{user?.gender}</TableCell>
                  <TableCell align="left">{user?.age}</TableCell>
                  <TableCell align="left">{user?.email}</TableCell>

                  <TableCell align="left">
                    {user?.dateOfBirth?.split("T")[0]}
                  </TableCell>
                  <TableCell align="left">{user?.nationality}</TableCell>
                  <TableCell align="left">
                    {renderButton(user?.accountStatus, user)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}

export default GetUsers;
