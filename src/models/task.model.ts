import * as yup from "yup";

export const taskModel = yup.object().shape({
  title: yup.string().required(),
  done: yup.bool().required(),
  date: yup.date().required(),
});
