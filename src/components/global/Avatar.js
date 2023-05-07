import React, { useState } from "react";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import { Stack } from "@mui/material";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/User/updateUserSlice";

function CircularImage(props) {
  const [avatarSrc, setAvatarSrc] = useState(props.src);
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
    formData.append("photo", file);

    toast.promise(dispatch(updateUser(formData)).unwrap(), {
      pending: "Loading...",
      success: {
        render() {
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
    <Stack alignItems="center" justifyContent="center">
      <Avatar sx={{ width: 64, height: 64 }} alt="Avatar" src={avatarSrc} />
      <input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        sx={{ display: "none" }}
      />

      <IconButton component="span" onClick={handleAvatarClick}></IconButton>
    </Stack>
  );
}

export default CircularImage;
