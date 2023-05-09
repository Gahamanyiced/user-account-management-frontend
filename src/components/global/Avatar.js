import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/User/UpdateUserSlice";

function CircularImage(props) {
  const [avatarSrc, setAvatarSrc] = useState(props.src);
  const [updated, setUpdated] = useState(false);

  const dispatch = useDispatch();

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarSrc(reader.result);
      };
      reader.readAsDataURL(file);
    }
    let formData = new FormData();
    formData.append("image_file", file);

    toast.promise(dispatch(updateUser(formData)).unwrap(), {
      pending: "Loading...",
      success: {
        render() {
          setUpdated(true);
          return "Picture has been uploaded";
        },
      },
      error: {
        render({ data }) {
          return data.data.message;
        },
      },
    });
  };

  const handleAvatarClick = () => {
    document.getElementById("avatar-input").click();
  };

  return (
    <Stack
      alignItems="center"
      justifyContent="center"
      sx={{ position: "relative" }}
    >
      <Avatar
        sx={{ width: 64, height: 64 }}
        alt="Avatar"
        src={updated ? avatarSrc : props.src}
      />
      <input
        id="avatar-input"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        style={{ display: "none" }}
      />
      <IconButton
        color="secondary"
        sx={{
          position: "absolute",
          bottom: -6,
          right: -6,
          bgcolor: "secondary.main",
          color: "text.secondary",
          zIndex: 1,
        }}
        onClick={handleAvatarClick}
      >
        <EditIcon sx={{ fontSize: 16, color: "white" }} />
      </IconButton>
    </Stack>
  );
}

export default CircularImage;
