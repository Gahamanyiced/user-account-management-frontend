import { Box, Button, TextField } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../components/reusable/Header";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useState } from "react";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { registerValidation } from "../validations";
import { signup } from "../features/Auth/SignupSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Register = () => {
  const isNonMobile = useMediaQuery("(min-width:600px)");
  const [nationality, setNationality] = useState("");
  const [gender, setGender] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [dob, setDob] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    control,
    handleSubmit,
    setValue,

    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerValidation),
  });

  const onRegister = async (data) => {
    toast.promise(dispatch(signup(data)).unwrap(), {
      pending: "Registering user",
      success: {
        render() {
          navigate("/login");
          return "Successfully Registered";
        },
      },
      error: {
        render({ data }) {
          return data.data.message;
        },
      },
    });
  };

  const handleNationalityChange = (e) => {
    console.log(e.target.value);
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

  const handleDobChange = (date) => {
    setDob(date);
    setValue("dateOfBirth", date);
    if (date) clearErrors("dateOfBirth");
  };

  return (
    <Box my={5} px={4}>
      <Header title="CREATE USER" subtitle="Create a New User Profile" />
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
          label="Password"
          control={control}
          placeholder="Enter your password"
          {...register("password")}
          error={errors?.password ? true : false}
          helperText={errors?.password ? errors?.password?.message : null}
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
        <TextField
          variant="filled"
          fullWidth
          type="text"
          label="Age"
          placeholder="Enter your age"
          {...register("age")}
          error={errors?.age ? true : false}
          helperText={errors?.age ? errors?.age?.message : null}
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            sx={{
              gridColumn: "span 2",
              bgcolor: "primary.light",
              border: "1px solid",
              borderColor: errors?.dateOfBirth
                ? "error.main"
                : "secondary.main",
            }}
            label="Date of Birth"
            value={dob}
            onChange={handleDobChange}
            renderInput={(params) => <TextField {...params} />}
            variant="filled"
          />
        </LocalizationProvider>
      </Box>
      <Box display="flex" justifyContent="end" mt="20px">
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={handleSubmit(onRegister)}
        >
          Create New User
        </Button>
      </Box>
    </Box>
  );
};

export default Register;
