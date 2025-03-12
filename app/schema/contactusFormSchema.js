import * as yup from "yup";

export const ContactUsFormSchema = yup.object().shape({
  fullName: yup.string(),
  email: yup.string(),
  message: yup.string(),
  phoneNumber: yup.string(),
  privacyPolicyAgree: yup.boolean(),
  langCode: yup.string()
});
