import * as Yup from "yup";

export const loginValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const registerValidation = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    )

    .required("Password is required"),

  email: Yup.string().email("Invalid email").required("Email is required"),
  age: Yup.number()
    .typeError("Age must be a number")
    .positive("Age must be a positive number")
    .integer("Age must be an integer")
    .required("Age is required"),
  name: Yup.string().required("First name is required"),
  nationality: Yup.string().required("Nationality is required"),
  gender: Yup.string().required("Gender is required"),
  martialStatus: Yup.string().required("Marital status is required"),
  dateOfBirth: Yup.string().required("Date of birth is required"),
});

export const otpValidation = Yup.object().shape({
  otp: Yup.number()
    .typeError("OTP must be a number")
    .required("OTP is required"),
});

export const forgotPasswordValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
});

export const resetPasswordValidation = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[!@#$%^&*]/,
      "Password must contain at least one special character"
    )

    .required("Password is required"),

  confirmPassword: Yup.string().required("Please confirm password"),
});

export const updateUserValidation = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  name: Yup.string().required("First name is required"),
  nationality: Yup.string().required("Nationality is required"),
  gender: Yup.string().required("Gender is required"),
  martialStatus: Yup.string().required("Marital status is required"),
});

export const verifyUserValidation = Yup.object().shape({
  identifierNumber: Yup.number()
    .typeError("ID must be a number")
    .positive("ID must be a positive number")
    .required("ID is required"),

  documentImage: Yup.mixed().test(
    "required",
    "Please upload supporting document",
    (value) => {
      return value && value.length;
    }
  ),
});
