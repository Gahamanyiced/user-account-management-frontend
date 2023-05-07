import { configureStore } from "@reduxjs/toolkit";
import logger from "redux-logger";
import thunk from "redux-thunk";
import loginSliceReducer from "./features/Auth/LoginSlice";
import signupSliceReducer from "./features/Auth/SignupSlice";
import verifyOtpSliceReducer from "./features/Auth/VerifyOtpSlice";
import resetPasswordSliceReducer from "./features/Auth/resetPasswordSlice";
import forgotPasswordSliceReducer from "./features/Auth/forgotPasswordSlice";
import getAllUserSliceReducer from "./features/User/getAllUserSlice";
import getOneUserSliceReducer from "./features/User/getOneUserSlice";
import updateUserIdSliceReducer from "./features/User/updateUserId";
import updateUserSliceReducer from "./features/User/updateUserSlice";

const reducer = {
  loginSlice: loginSliceReducer,
  signupSlice: signupSliceReducer,
  verifyOtpSlice: verifyOtpSliceReducer,
  resetPasswordSlice: resetPasswordSliceReducer,
  forgotPasswordSlice: forgotPasswordSliceReducer,
  getAllUserSlice: getAllUserSliceReducer,
  getOneUserSlice: getOneUserSliceReducer,
  updateUserIdSlice: updateUserIdSliceReducer,
  updateUserSlice: updateUserSliceReducer,
};

const middleware = [];

if (process.env.NODE_ENV === `development`) {
  middleware.push(logger);
}

export default configureStore({
  reducer,
  middleware: [thunk, ...middleware],
});
