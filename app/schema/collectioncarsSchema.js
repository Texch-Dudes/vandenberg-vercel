import * as yup from "yup";

export const CollectionCarsSchema = yup.object().shape({
  collectionCarCategorySection: yup.object({
    nodes: yup
      .array()
      .of(
        yup.object({
          databaseId: yup.number(),
          name: yup.string(),
          count: yup.number().nullable(),
        })
      ),
  }),
  collectionCarsDataSection: yup.object({
    nodes: yup
      .array()
      .of(
        yup.object({
          title: yup.string(),
          slug: yup.string(),
          databaseId: yup.number(),
          carCategories: yup.object({
            nodes: yup
              .array()
              .of(
                yup.object({
                  name: yup.string(),
                  databaseId: yup.number(),
                })
              ),
          }),
          carData: yup.object({
            galleryImages: yup
              .array()
              .of(
                yup.object({
                  image: yup.object({
                    node: yup.object({
                      mediaItemUrl: yup.string().url("Invalid URL"),
                    }),
                  }),
                })
              ),
            constructionYear: yup.string(),
            kmStand: yup.string(),
            price: yup.string(),
          }),
        })
      ),
  }),
});
