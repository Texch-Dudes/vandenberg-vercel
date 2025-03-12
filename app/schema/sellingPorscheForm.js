import * as yup from "yup";

export const SellingPorscheSchema = yup.object().shape({
  fullName: yup.string(),
  email: yup.string(),
  placeName: yup.string(),
  phoneNumber: yup.string(),
  licenseNumber: yup.string(),
  message: yup.string(),
  privacyPolicyAgree: yup.boolean(),
  langCode: yup.string(),
  images: yup.array().of(yup.string()),
});
