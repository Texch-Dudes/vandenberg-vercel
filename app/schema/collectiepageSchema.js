import * as yup from "yup";

export const CollectiePageSchema = yup.object().shape({
  seo: yup.object({
    metaDesc: yup.string(),
    title: yup.string(),
    metaRobotsNofollow: yup.string(),
    metaRobotsNoindex: yup.string(),
  }),
  collectionHeroSection: yup.object({
    bannerBgImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
    bannerHeading: yup.array().of(
      yup.object({
        line_NL: yup.string(),
        line_EN: yup.string(),
        line_FR: yup.string(),
        line_DE: yup.string(),
        line_ES: yup.string(),
      })
    ),
    bannerText_NL: yup.string(),
    bannerText_EN: yup.string(),
    bannerText_FR: yup.string(),
    bannerText_DE: yup.string(),
    bannerText_ES: yup.string(),
  }),
  collectionContentSection: yup.object({
    contentSubHeading_NL: yup.string(),
    contentSubHeading_EN: yup.string(),
    contentSubHeading_FR: yup.string(),
    contentSubHeading_DE: yup.string(),
    contentSubHeading_ES: yup.string(),
    contentHeading_NL: yup.string(),
    contentHeading_EN: yup.string(),
    contentHeading_FR: yup.string(),
    contentHeading_DE: yup.string(),
    contentHeading_ES: yup.string(),
    contentText_NL: yup.string(),
    contentText_EN: yup.string(),
    contentText_FR: yup.string(),
    contentText_DE: yup.string(),
    contentText_ES: yup.string(),
  }),
  collectionCtaSection: yup.object({
    ctaImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
    ctaImageMobile: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
    ctaHeading_NL: yup.string(),
    ctaHeading_EN: yup.string(),
    ctaHeading_FR: yup.string(),
    ctaHeading_DE: yup.string(),
    ctaHeading_ES: yup.string(),
    ctaText_NL: yup.string(),
    ctaText_EN: yup.string(),
    ctaText_FR: yup.string(),
    ctaText_DE: yup.string(),
    ctaText_ES: yup.string(),
    ctaButton1_NL: yup.string(),
    ctaButton1_EN: yup.string(),
    ctaButton1_FR: yup.string(),
    ctaButton1_DE: yup.string(),
    ctaButton1_ES: yup.string(),
    ctaButton2_NL: yup.string(),
    ctaButton2_EN: yup.string(),
    ctaButton2_FR: yup.string(),
    ctaButton2_DE: yup.string(),
    ctaButton2_ES: yup.string(),
    signatureImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
  }),
  collectionButtons: yup.object({
    viewAll_NL: yup.string(),
    viewAll_EN: yup.string(),
    viewAll_FR: yup.string(),
    viewAll_DE: yup.string(),
    viewAll_ES: yup.string(),
    vewModal_NL: yup.string(),
    vewModal_EN: yup.string(),
    vewModal_FR: yup.string(),
    vewModal_DE: yup.string(),
    vewModal_ES: yup.string(),
    loadMore_NL: yup.string(),
    loadMore_EN: yup.string(),
    loadMore_FR: yup.string(),
    loadMore_DE: yup.string(),
    loadMore_ES: yup.string(),
  }),
});
