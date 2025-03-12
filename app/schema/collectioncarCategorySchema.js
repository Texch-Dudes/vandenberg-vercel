import * as yup from "yup";

export const CollectionCarCategorySchema = yup.object().shape({
  collectionCarCategorySection: yup.object({
    nodes: yup.array().of(
      yup.object({
        databaseId: yup.number(),
        name: yup.string(),
        count: yup.number().nullable(),
      })
    ),
  }),
});