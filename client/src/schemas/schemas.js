import * as yup from "yup";
// import moment from "moment";

export const loginSchema = yup.object().shape({
    username: yup.string().required("Username is required."),
    password: yup.string().required("Password is required.")
})

export const signupSchema = yup.object().shape({
    username: yup.string()
    .min(3, "Username must be 3 characters minimum.")
    .required("Username is required."),
    password: yup.string()
    .min(6, "Password must be 6 characters minimum.")
    .required("Password is required."),
    email: yup.string().email("Must be a valid email.").required("Email is required."),
    first_name: yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required."),
    last_name: yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required."),
    gender: yup.string().required("Gender selection is required."),
    age: yup.number().required("Age is required.").positive().integer(),
    birthday: yup.string().required('Birthday is required.')
})

export const editProfileSchema = yup.object().shape({
    first_name: yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required."),
    last_name: yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First name is required."),
    gender: yup.string().required("Gender selection is required."),
    age: yup.number().required("Age is required.").positive().integer()
})

export const dataPointSchema = yup.object().shape({
    bgl: yup.number().required()
})