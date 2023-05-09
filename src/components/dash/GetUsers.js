import React, { useEffect, useState } from "react";
import Header from "../reusable/Header";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getAllUsers } from "../../features/User/getAllUserSlice";
import AdminVerificationDialog from "./AdminVerificationDialog";
import { verifyUser } from "../../features/User/verifyUserSlice";

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
  Typography,
} from "@mui/material";
import { isAuthenticated } from "../../App";

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
  const send = async () => {
    const res = await dispatch(getAllUsers());
    setUsers(res?.payload?.data?.data);
  };

  useEffect(() => {
    send();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const handleSelect = (user) => {
    setSelectedUser(user);
    setDisplayVerification(true);
  };

  const onApprove = () => {
    let formData = new FormData();
    formData.append("accountStatus", "VERIFIED");

    const payload = {
      id: selectedUser?._id,
      data: formData,
    };
    toast.promise(dispatch(verifyUser(payload)).unwrap(), {
      pending: "Loading...",
      success: {
        render() {
          send();
          setDisplayVerification(false);
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
    if (user?.accountStatus === "VERIFIED") {
      return <Typography sx={{ textAlign: "left" }}>Verified</Typography>;
    }

    if (!(user?.documentImage && user?.identifierNumber)) {
      return <Typography sx={{ textAlign: "left" }}>No data</Typography>;
    }

    const button =
      user?.role === "admin" ? (
        "Admin"
      ) : (
        <Button
          color={"secondary"}
          sx={{
            backgroundColor: "secondary.main",
            color: "white !important",
            fontWeight: "bold",
            fontSize: "12px",
            padding: "10px 30px",
            mr: 5,
            width: "fit-content",
          }}
          onClick={() => handleSelect(user)}
        >
          Verify
        </Button>
      );

    return button;
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
        <Header title="User Management" subtitle="Manage all your users" />
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
                <TableCell align="center " sx={styles.header}>
                  Action
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users
                .filter(
                  (item) =>
                    item.role !== "admin" && item._id !== isAuthenticated().id
                )
                .map((user) => (
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
