import * as yup from "yup";

export const SpeedPageSchema = yup.object().shape({
  seo: yup.object({
    metaDesc: yup.string(),
    title: yup.string(),
    metaRobotsNofollow: yup.string(),
    metaRobotsNoindex: yup.string(),
  }),
  speedContentSection: yup.object({
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
  speedHeroSection: yup.object({
    bannerBgImage: yup.object({
      node: yup.object({
        mediaItemUrl: yup.string(),
      }),
    }),
    bannerHeading_NL: yup.string(),
    bannerHeading_EN: yup.string(),
    bannerHeading_FR: yup.string(),
    bannerHeading_DE: yup.string(),
    bannerHeading_ES: yup.string(),
    bannerText_NL: yup.string(),
    bannerText_EN: yup.string(),
    bannerText_FR: yup.string(),
    bannerText_DE: yup.string(),
    bannerText_ES: yup.string(),
    bannerSubHeading: yup.array().of(
      yup.object({
        line_NL: yup.string(),
        line_EN: yup.string(),
        line_FR: yup.string(),
        line_DE: yup.string(),
        line_ES: yup.string(),
      })
    ),
  }),
  speedSliderSection: yup.object({
    sliderItems: yup.array().of(
      yup.object({
        image: yup.object({
          node: yup.object({
            mediaItemUrl: yup.string(),
          }),
        }),
        mobileImage: yup.object({
          node: yup.object({
            mediaItemUrl: yup.string(),
          }),
        }),
      })
    ),
    sliderTitle_NL: yup.string(),
    sliderTitle_EN: yup.string(),
    sliderTitle_FR: yup.string(),
    sliderTitle_DE: yup.string(),
    sliderTitle_ES: yup.string(),
    slidersubtitle_NL: yup.string(),
    slidersubtitle_EN: yup.string(),
    slidersubtitle_FR: yup.string(),
    slidersubtitle_DE: yup.string(),
    slidersubtitle_ES: yup.string(),
  }),
  speedSliderContentSection: yup.object({
    content2SubHeading_NL: yup.string(),
    content2SubHeading_EN: yup.string(),
    content2SubHeading_FR: yup.string(),
    content2SubHeading_DE: yup.string(),
    content2SubHeading_ES: yup.string(),
    content2Heading_NL: yup.string(),
    content2Heading_EN: yup.string(),
    content2Heading_FR: yup.string(),
    content2Heading_DE: yup.string(),
    content2Heading_ES: yup.string(),
    content2Text_NL: yup.string(),
    content2Text_EN: yup.string(),
    content2Text_FR: yup.string(),
    content2Text_DE: yup.string(),
    content2Text_ES: yup.string(),
    galleryHeading_NL: yup.string(),
    galleryHeading_EN: yup.string(),
    galleryHeading_FR: yup.string(),
    galleryHeading_DE: yup.string(),
    galleryHeading_ES: yup.string(),
  }),
  speedProjectCardSection: yup.object({
    loadMore_NL: yup.string(),
    loadMore_EN: yup.string(),
    loadMore_FR: yup.string(),
    loadMore_DE: yup.string(),
    loadMore_ES: yup.string(),
    projectHeading_NL: yup.string(),
    projectHeading_EN: yup.string(),
    projectHeading_FR: yup.string(),
    projectHeading_DE: yup.string(),
    projectHeading_ES: yup.string(),
    projectCards: yup.array().of(
      yup.object({
        image: yup.object({
          node: yup.object({
            mediaItemUrl: yup.string(),
          }),
        }),
        subTitle_NL: yup.string(),
        subTitle_EN: yup.string(),
        subTitle_FR: yup.string(),
        subTitle_DE: yup.string(),
        subTitle_ES: yup.string(),
        title_NL: yup.string(),
        title_EN: yup.string(),
        title_FR: yup.string(),
        title_DE: yup.string(),
        title_ES: yup.string(),
      })
    ),
  }),
  speedGallerySectionn: yup.object({
    galleryItems: yup.array().of(
      yup.object({
        subTitle_NL: yup.string(),
        subTitle_EN: yup.string(),
        subTitle_FR: yup.string(),
        subTitle_DE: yup.string(),
        subTitle_ES: yup.string(),
        title_NL: yup.string(),
        title_EN: yup.string(),
        title_FR: yup.string(),
        title_DE: yup.string(),
        title_ES: yup.string(),
        image: yup.object({
          node: yup.object({
            mediaItemUrl: yup.string(),
          }),
        }),
      })
    ),
  }),
  speedCtaSection: yup.object({
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
    ctatext_NL: yup.string(),
    ctatext_EN: yup.string(),
    ctatext_FR: yup.string(),
    ctatext_DE: yup.string(),
    ctatext_ES: yup.string(),
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
