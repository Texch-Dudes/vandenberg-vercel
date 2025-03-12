import * as yup from "yup";

export const AboutPageSchema = yup.object().shape({
  seo: yup.object({
    metaDesc: yup.string(),
    title: yup.string(),
    metaRobotsNofollow: yup.string(),
    metaRobotsNoindex: yup.string(),
  }),
  aboutHoreSection: yup.object({
    banerHeading: yup.array().of(
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
    bannerBgImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
  }),
  mainContentSection: yup.object({
    imageText_NL: yup.string(),
    imageText_EN: yup.string(),
    imageText_FR: yup.string(),
    imageText_DE: yup.string(),
    imageText_ES: yup.string(),
    mainContentText_NL: yup.string(),
    mainContentText_EN: yup.string(),
    mainContentText_FR: yup.string(),
    mainContentText_DE: yup.string(),
    mainContentText_ES: yup.string(),
    mainContentHeading_NL: yup.string(),
    mainContentHeading_EN: yup.string(),
    mainContentHeading_FR: yup.string(),
    mainContentHeading_DE: yup.string(),
    mainContentHeading_ES: yup.string(),
    contentMobileImg: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
    mainContentImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
  }),
  imageAndtextSection: yup.object({
    content2Heading_NL: yup.string(),
    content2Heading_EN: yup.string(),
    content2Heading_FR: yup.string(),
    content2Heading_DE: yup.string(),
    content2Heading_ES: yup.string(),
    content2imageText_NL: yup.string(),
    content2imageText_EN: yup.string(),
    content2imageText_FR: yup.string(),
    content2imageText_DE: yup.string(),
    content2imageText_ES: yup.string(),
    content2Text_NL: yup.string(),
    content2Text_EN: yup.string(),
    content2Text_FR: yup.string(),
    content2Text_DE: yup.string(),
    content2Text_ES: yup.string(),
    content2ImageMobile: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
    content2image: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
  }),
  imageAndtextSecondSection: yup.object({
    content3Heading_NL: yup.string(),
    content3Heading_EN: yup.string(),
    content3Heading_FR: yup.string(),
    content3Heading_DE: yup.string(),
    content3Heading_ES: yup.string(),
    content3ImageText_NL: yup.string(),
    content3ImageText_EN: yup.string(),
    content3ImageText_FR: yup.string(),
    content3ImageText_DE: yup.string(),
    content3ImageText_ES: yup.string(),
    content3Text_NL: yup.string(),
    content3Text_EN: yup.string(),
    content3Text_FR: yup.string(),
    content3Text_DE: yup.string(),
    content3Text_ES: yup.string(),
    content3ImageMobile: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
    content3Image: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
  }),
  textSecondSection: yup.object({
    content4Heading_NL: yup.string(),
    content4Heading_EN: yup.string(),
    content4Heading_FR: yup.string(),
    content4Heading_DE: yup.string(),
    content4Heading_ES: yup.string(),
    content4Text_NL: yup.string(),
    content4Text_EN: yup.string(),
    content4Text_FR: yup.string(),
    content4Text_DE: yup.string(),
    content4Text_ES: yup.string(),
  }),
  footerCtaSection: yup.object({
    ctaImageText_NL: yup.string(),
    ctaImageText_EN: yup.string(),
    ctaImageText_FR: yup.string(),
    ctaImageText_DE: yup.string(),
    ctaImageText_ES: yup.string(),
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
    ctaButton_NL: yup.string(),
    ctaButton_EN: yup.string(),
    ctaButton_FR: yup.string(),
    ctaButton_DE: yup.string(),
    ctaButton_ES: yup.string(),
    signatureImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
  }),
});
