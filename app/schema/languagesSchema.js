import * as yup from "yup";

export const LanguagesSchema = yup.object().shape({
  languages: yup.array().of(
    yup.object({
      country_flag_url: yup.string(),
      native_name: yup.string(),
      language_code: yup.string(),
    })
  ),
});
