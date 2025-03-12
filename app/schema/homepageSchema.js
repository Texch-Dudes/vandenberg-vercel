import * as yup from "yup";

export const HomepageSchema = yup.object().shape({
  seo: yup.object({
    metaDesc: yup.string(),
    title: yup.string(),
    metaRobotsNofollow: yup.string(),
    metaRobotsNoindex: yup.string(),
  }),
  homeHeroSection: yup.object({
    bgImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string()
      }),
    }),
    heroHeading: yup.array().of(
      yup.object({
        line_NL: yup.string(),
        line_EN: yup.string(),
        line_FR: yup.string(),
        line_DE: yup.string(),
        line_ES: yup.string(),
      })
    ),
    heroText_NL: yup.string(),
    heroText_EN: yup.string(),
    heroText_FR: yup.string(),
    heroText_DE: yup.string(),
    heroText_ES: yup.string(),
  }),
  contentSection: yup.object({
    contentText_NL: yup.string(),
    contentText_EN: yup.string(),
    contentText_FR: yup.string(),
    contentText_DE: yup.string(),
    contentText_ES: yup.string(),
    contentHeading_NL: yup.string(),
    contentHeading_EN: yup.string(),
    contentHeading_FR: yup.string(),
    contentHeading_DE: yup.string(),
    contentHeading_ES: yup.string(),
    contentButton1_NL: yup.string(),
    contentButton1_EN: yup.string(),
    contentButton1_FR: yup.string(),
    contentButton1_DE: yup.string(),
    contentButton1_ES: yup.string(),
    contentButton2_NL: yup.string(),
    contentButton2_EN: yup.string(),
    contentButton2_FR: yup.string(),
    contentButton2_DE: yup.string(),
    contentButton2_ES: yup.string(),
  }),
  carSliderSection: yup.object({
    carSlider: yup.array().of(
      yup.object({
        text_NL: yup.string(),
        text_EN: yup.string(),
        text_FR: yup.string(),
        text_DE: yup.string(),
        text_ES: yup.string(),
        image: yup.object({
          node: yup.object({
            mediaItemUrl: yup.string()
          }),
        }),
        mobileImg: yup.object({
          node: yup.object({
            mediaItemUrl: yup.string()
          }),
        }),
      })
    ),
    sliderSignatureImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string()
      }),
    }),
  }),
  carDetailsSliderSection: yup.object({
    contentSlider: yup.array().of(
      yup.object({
        mainImage: yup.object({
          node: yup.object({
            mediaItemUrl: yup.string()
          }),
        }),
        subHeading_NL: yup.string(),
        subHeading_EN: yup.string(),
        subHeading_FR: yup.string(),
        subHeading_DE: yup.string(),
        subHeading_ES: yup.string(),
        heading_NL: yup.string(),
        heading_EN: yup.string(),
        heading_FR: yup.string(),
        heading_DE: yup.string(),
        heading_ES: yup.string(),
        text_NL: yup.string(),
        text_EN: yup.string(),
        text_FR: yup.string(),
        text_DE: yup.string(),
        text_ES: yup.string(),
        button_NL: yup.string(),
        button_EN: yup.string(),
        button_FR: yup.string(),
        button_DE: yup.string(),
        button_ES: yup.string(),
        buttonUrl: yup.string()
      })
    ),
  }),
  footerCtaSection: yup.object({
    fctaImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string()
      }),
    }),
    ctaImageMobile: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string()
      }),
    }),
    fctaHeading_NL: yup.string(),
    fctaHeading_EN: yup.string(),
    fctaHeading_FR: yup.string(),
    fctaHeading_DE: yup.string(),
    fctaHeading_ES: yup.string(),
    fctaText_NL: yup.string(),
    fctaText_EN: yup.string(),
    fctaText_FR: yup.string(),
    fctaText_DE: yup.string(),
    fctaText_ES: yup.string(),
    fctaButton_NL: yup.string(),
    fctaButton_EN: yup.string(),
    fctaButton_FR: yup.string(),
    fctaButton_DE: yup.string(),
    fctaButton_ES: yup.string(),
    ctaSignatureImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string()
      }),
    }),
  }),
});
