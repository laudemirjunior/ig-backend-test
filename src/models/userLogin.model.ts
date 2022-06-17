import * as yup from "yup";

export const userLoginModel = yup.object().shape({
  email: yup.string().required(),
  password: yup.string().min(6).required(),
});
