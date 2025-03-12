import * as yup from "yup";

export const CarSchema = yup.object().shape({
  slug: yup.string(), // Slug is no longer required
  carCategories: yup.object({
    nodes: yup
      .array()
      .of(
        yup.object({
          databaseId: yup.string(), // Category ID is no longer required
        })
      )
      .min(1, "At least one car category is required"),
  }),
  seo: yup.object({
    metaDesc: yup.string().nullable(),
    title: yup.string(), // SEO title is no longer required
    metaRobotsNofollow: yup.string().nullable(),
    metaRobotsNoindex: yup.string().nullable(),
  }),
  heroSection: yup.object({
    bannerBgImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(), // Hero section background image URL is no longer required
      }),
    }),
    bannerText: yup
      .array()
      .of(
        yup.object({
          line: yup.string(), // Hero section banner text line is no longer required
        })
      )
      .min(1, "At least one hero banner text line is required"),
  }),
  featureSection: yup.object({
    type: yup.string(), // Car type is no longer required
    motor: yup.string(), // Motor information is no longer required
    body: yup.string(), // Body type is no longer required
    constructionYear: yup.string(), // Construction year is no longer required
    kmStand: yup.string(), // KM stand is no longer required
    colour: yup.string(), // Colour is no longer required
    status: yup.string(), // Car status is no longer required
    price: yup.string(), // Price is no longer required
  }),
  sliderSection: yup.object({
    sliderItems: yup.array().of(
      yup.object({
        image: yup.object({
          node: yup.object({
            mediaItemUrl: yup
              .string()
          }),
        }),
        mobileImage: yup.string().nullable(),
        text: yup.string().nullable(),
      })
    ),
  }),
  detailsSection: yup.object({
    descriptionTitle_NL: yup.string().nullable(),
    descriptionTitle_EN: yup.string().nullable(),
    descriptionTitle_FR: yup.string().nullable(),
    descriptionTitle_DE: yup.string().nullable(),
    descriptionTitle_ES: yup.string().nullable(),
    description_NL: yup.string(), // Description (NL) is no longer required
    description_EN: yup.string(), // Description (EN) is no longer required
    description_FR: yup.string(), // Description (FR) is no longer required
    description_DE: yup.string(), // Description (DE) is no longer required
    description_ES: yup.string(), // Description (ES) is no longer required
    highlightsTitle_NL: yup.string().nullable(),
    highlightsTitle_EN: yup.string().nullable(),
    highlightsTitle_FR: yup.string().nullable(),
    highlightsTitle_DE: yup.string().nullable(),
    highlightsTitle_ES: yup.string().nullable(),
    motorHighHeading_NL: yup.string().nullable(),
    motorHighHeading_EN: yup.string().nullable(),
    motorHighHeading_FR: yup.string().nullable(),
    motorHighHeading_DE: yup.string().nullable(),
    motorHighHeading_ES: yup.string().nullable(),
    motorHighlights_NL: yup.string().nullable(),
    motorHighlights_EN: yup.string().nullable(),
    motorHighlights_FR: yup.string().nullable(),
    motorHighlights_DE: yup.string().nullable(),
    motorHighlights_ES: yup.string().nullable(),
    exteriorHighheading_NL: yup.string().nullable(),
    exteriorHighheading_EN: yup.string().nullable(),
    exteriorHighheading_FR: yup.string().nullable(),
    exteriorHighheading_DE: yup.string().nullable(),
    exteriorHighheading_ES: yup.string().nullable(),
    exteriorHighlights_NL: yup.string().nullable(),
    exteriorHighlights_EN: yup.string().nullable(),
    exteriorHighlights_FR: yup.string().nullable(),
    exteriorHighlights_DE: yup.string().nullable(),
    exteriorHighlights_ES: yup.string().nullable(),
    interiorHighHeading_NL: yup.string().nullable(),
    interiorHighHeading_EN: yup.string().nullable(),
    interiorHighHeading_FR: yup.string().nullable(),
    interiorHighHeading_DE: yup.string().nullable(),
    interiorHighHeading_ES: yup.string().nullable(),
    interiorhighlights_NL: yup.string().nullable(),
    interiorhighlights_EN: yup.string().nullable(),
    interiorhighlights_FR: yup.string().nullable(),
    interiorhighlights_DE: yup.string().nullable(),
    interiorhighlights_ES: yup.string().nullable(),
    safetyHighHeading_NL: yup.string().nullable(),
    safetyHighHeading_EN: yup.string().nullable(),
    safetyHighHeading_FR: yup.string().nullable(),
    safetyHighHeading_DE: yup.string().nullable(),
    safetyHighHeading_ES: yup.string().nullable(),
    safetyHighlights_NL: yup.string().nullable(),
    safetyHighlights_EN: yup.string().nullable(),
    safetyHighlights_FR: yup.string().nullable(),
    safetyHighlights_DE: yup.string().nullable(),
    safetyHighlights_ES: yup.string().nullable(),
  }),
});
