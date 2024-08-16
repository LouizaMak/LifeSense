import * as yup from "yup";
import moment from "moment";

export const loginSchema = yup.object().shape({
    username: yup.string().required("Required"),
    password: yup.string().required("Required")
})