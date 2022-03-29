import * as yup from "yup";

export const employeeValidationSchema = yup.object().shape({
  firstName: yup.string().required("This field is requried"),
  lastName: yup.string().required("This field is requried"),
  position: yup.string().required("This field is requried"),
  address: yup.string().required("This field is requried"),
  department: yup.string().required("This field is requried"),
  sex: yup.string().required("This field is requried"),
  contact_number: yup
    .string()
    .required("This field is requried")
    .matches(
      /((^(\+)(\d){12}$)|(^\d{11}$))/gm,
      "Please enter a valid mobile number"
    ),
});
