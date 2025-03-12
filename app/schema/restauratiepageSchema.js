import * as yup from "yup";

export const RestauratiePageSchema = yup.object().shape({
  seo: yup.object({
    metaDesc: yup.string(),
    title: yup.string(),
    metaRobotsNofollow: yup.string(),
    metaRobotsNoindex: yup.string(),
  }),
  adviceHeroSection: yup.object({
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
  adviceContentSection: yup.object({
    heading_NL: yup.string(),
    heading_EN: yup.string(),
    heading_FR: yup.string(),
    heading_DE: yup.string(),
    heading_ES: yup.string(),
    contentText_NL: yup.string(),
    contentText_EN: yup.string(),
    contentText_FR: yup.string(),
    contentText_DE: yup.string(),
    contentText_ES: yup.string(),
  }),
  adviceFooterCtaSection: yup.object({
    ctaImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
    ctaHeading_NL: yup.string(),
    ctaHeading_EN: yup.string(),
    ctaHeading_FR: yup.string(),
    ctaHeading_DE: yup.string(),
    ctaHeading_ES: yup.string(),
    contentText_NL: yup.string(),
    contentText_EN: yup.string(),
    contentText_FR: yup.string(),
    contentText_DE: yup.string(),
    contentText_ES: yup.string(),
    ctaButton1_NL: yup.string(),
    ctaButton1_EN: yup.string(),
    ctaButton1_FR: yup.string(),
    ctaButton1_DE: yup.string(),
    ctaButton1_ES: yup.string(),
    ctaButton2: yup.string(),
    signatureImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
  }),
  advicePropertiesSection: yup.object({
    propertiesSubHeading_NL: yup.string(),
    propertiesSubHeading_EN: yup.string(),
    propertiesSubHeading_FR: yup.string(),
    propertiesSubHeading_DE: yup.string(),
    propertiesSubHeading_ES: yup.string(),
    propertiesHeading_NL: yup.string(),
    propertiesHeading_EN: yup.string(),
    propertiesHeading_FR: yup.string(),
    propertiesHeading_DE: yup.string(),
    propertiesHeading_ES: yup.string(),
    propertiesText_NL: yup.string(),
    propertiesText_EN: yup.string(),
    propertiesText_FR: yup.string(),
    propertiesText_DE: yup.string(),
    propertiesText_ES: yup.string(),
    accordion: yup.array().of(
      yup.object({
        title_NL: yup.string(),
        title_EN: yup.string(),
        title_FR: yup.string(),
        title_DE: yup.string(),
        title_ES: yup.string(),
        description_NL: yup.string(),
        description_EN: yup.string(),
        description_FR: yup.string(),
        description_DE: yup.string(),
        description_ES: yup.string(),
        image: yup.object({
          node: yup.object({
            mediaItemUrl: yup.string(),
          }),
        }),
      })
    ),
  }),
  adviceCarSliderSection: yup.object({
    carslider: yup.array().of(
      yup.object({
        sliderImage: yup.object({
          node: yup.object({
            mediaItemUrl: yup.string(),
          }),
        }),
        sliderMobileImage: yup.object({
          node: yup.object({
            mediaItemUrl: yup.string(),
          }),
        }),
        title_NL: yup.string(),
        title_EN: yup.string(),
        title_FR: yup.string(),
        title_DE: yup.string(),
        title_ES: yup.string(),
        carName_NL: yup.string(),
        carName_EN: yup.string(),
        carName_FR: yup.string(),
        carName_DE: yup.string(),
        carName_ES: yup.string(),
      })
    ),
  }),
});
