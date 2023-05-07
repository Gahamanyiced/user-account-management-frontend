import { Box, Button } from "@mui/material";

import { useState } from "react";
import Header from "../reusable/Header";
import useMediaQuery from "@mui/material/useMediaQuery";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

import { TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateUserValidation } from "../../validations";

import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { updateUser } from "../../features/User/updateUserSlice";

const Dashboard = (props) => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const dispatch = useDispatch();

  const onUpdate = (values) => {
    let formData = new FormData();
    Object.entries(values).forEach(([key, value]) => {
      formData.append(
        key,
        Array.isArray(value) ? JSON.stringify(value) : value
      );
    });

    toast.promise(dispatch(updateUser(formData)).unwrap(), {
      pending: "Loading...",
      success: {
        render() {
          return "Profile has been updated";
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
    control,
    handleSubmit,
    setValue,

    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(updateUserValidation),
  });

  const handleNationalityChange = (e) => {
    setNationality(e.target.value);
    setValue("nationality", e.target.value);
    if (e.target.value) clearErrors("nationality");
  };

  const handleGenderChange = (event) => {
    setGender(event.target.value);
    setValue("gender", event.target.value);
    if (event.target.value) clearErrors("gender");
  };

  const handleMaritalStatusChange = (event) => {
    setMaritalStatus(event.target.value);
    setValue("martialStatus", event.target.value);
    if (event.target.value) clearErrors("martialStatus");
  };

  useEffect(() => {
    const { nationality, name, email, gender, martialStatus } = props?.user;
    setValue("nationality", nationality);
    setValue("name", name);
    setValue("email", email);
    setValue("gender", gender);
    setValue("martialStatus", martialStatus);
    setNationality(nationality);
    setMaritalStatus(martialStatus);
    setGender(gender);
  }, [props?.user, setValue]);

  return (
    <Box m="20px" px={2}>
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="DASHBOARD" subtitle="Welcome to your dashboard" />
      </Box>

      {/* GRID & CHARTS */}
      <Box my={5} px={3}>
        <Header title="UPDATE YOUR PROFILE" subtitle="Edit" />

        <Box my={5} px={0}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 12" },
            }}
          >
            <TextField
              variant="filled"
              fullWidth
              type="text"
              label="Name"
              control={control}
              placeholder="Enter your name"
              {...register("name")}
              error={errors?.name ? true : false}
              helperText={errors?.name ? errors?.name?.message : null}
              sx={{ gridColumn: "span 2" }}
            />

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

            <FormControl sx={{ gridColumn: "span 2" }}>
              <InputLabel id="nationality-label">Nationality</InputLabel>
              <Select
                variant="filled"
                labelId="nationality-label"
                id="nationality"
                value={nationality}
                onChange={handleNationalityChange}
                sx={{
                  border: "1px solid",
                  borderColor: errors?.nationality
                    ? "error.main"
                    : "secondary.main",
                }}
              >
                <MenuItem value="us">United States</MenuItem>
                <MenuItem value="uk">United Kingdom</MenuItem>
                <MenuItem value="fr">France</MenuItem>
                <MenuItem value="de">Germany</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ gridColumn: "span 2" }}>
              <InputLabel id="gender-label">Gender</InputLabel>
              <Select
                variant="filled"
                labelId="gender-label"
                id="gender"
                value={gender}
                name="gender"
                onChange={handleGenderChange}
                sx={{
                  border: "1px solid",
                  borderColor: errors?.gender ? "error.main" : "secondary.main",
                }}
              >
                <MenuItem value="male">Male</MenuItem>
                <MenuItem value="female">Female</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ gridColumn: "span 2" }}>
              <InputLabel id="marital-status-label">Marital Status</InputLabel>
              <Select
                variant="filled"
                labelId="marital-status-label"
                id="marital-status"
                value={maritalStatus}
                onChange={handleMaritalStatusChange}
                sx={{
                  border: "1px solid",
                  borderColor: errors?.martialStatus
                    ? "error.main"
                    : "secondary.main",
                }}
              >
                <MenuItem value="single">Single</MenuItem>
                <MenuItem value="married">Married</MenuItem>
                <MenuItem value="divorced">Divorced</MenuItem>
                <MenuItem value="widowed">Widowed</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <Box display="flex" justifyContent="end" mt="20px">
            <Button
              type="submit"
              color="secondary"
              variant="contained"
              onClick={handleSubmit(onUpdate)}
            >
              Update Profile
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
