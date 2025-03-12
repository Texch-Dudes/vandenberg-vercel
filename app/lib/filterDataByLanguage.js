// export function filterResponseByLanguage(apiResponse, language) {
//   if (!apiResponse || typeof apiResponse !== "object") {
//     throw new Error("Invalid API response format");
//   }

//   const pageData = apiResponse.page || {}; // Ensure page exists

//   const langKey = `text_${language.toUpperCase()}`;
//   const lineKey = `line_${language.toUpperCase()}`;
//   const buttonKey = `button_${language.toUpperCase()}`;
//   const headingKey = `heading_${language.toUpperCase()}`;
//   const subHeadingKey = `subHeading_${language.toUpperCase()}`;

//   return {
//     page: {
//       seo: pageData.seo || {},
//       homeHeroSection: {
//         bgImage: pageData.homeHeroSection?.bgImage || {},
//         heroHeading: (pageData.homeHeroSection?.heroHeading || []).map(
//           (item) => ({
//             line: item?.[lineKey] || "",
//           })
//         ),
//         heroText: pageData.homeHeroSection?.[langKey] || "",
//       },
//       contentSection: {
//         contentText: pageData.contentSection?.[langKey] || "",
//         contentHeading: pageData.contentSection?.[headingKey] || "",
//         contentButton1: pageData.contentSection?.[buttonKey] || null,
//         contentButton2: null,
//       },
//       carSliderSection: {
//         carSlider: (pageData.carSliderSection?.carSlider || []).map(
//           (slide) => ({
//             text: slide?.[langKey] || "",
//             image: slide?.image || {},
//             mobileImg: slide?.mobileImg || {},
//           })
//         ),
//         sliderSignatureImage:
//           pageData.carSliderSection?.sliderSignatureImage || {},
//       },
//       carDetailsSliderSection: {
//         contentSlider: (
//           pageData.carDetailsSliderSection?.contentSlider || []
//         ).map((item) => ({
//           mainImage: item?.mainImage || {},
//           subHeading: item?.[subHeadingKey] || "",
//           heading: item?.[headingKey] || "",
//           text: item?.[langKey] || "",
//           button: item?.[buttonKey] || "",
//           buttonUrl: item?.buttonUrl || "",
//         })),
//       },
//       footerCtaSection: {
//         fctaImage: pageData.footerCtaSection?.fctaImage || {},
//         ctaImageMobile: pageData.footerCtaSection?.ctaImageMobile || {},
//         fctaHeading: pageData.footerCtaSection?.[headingKey] || "",
//         fctaText: pageData.footerCtaSection?.[langKey] || "",
//         fctaButton: pageData.footerCtaSection?.[buttonKey] || "",
//         ctaSignatureImage: pageData.footerCtaSection?.ctaSignatureImage || {},
//       },
//     },
//   };
// }

/*
 * Transforms a nested object to remove language-specific keys and keep only the keys for the specified language.
 *
 * @param {object} obj - The input object to transform.
 * @param {string} lang - The language code (e.g., 'en', 'nl', 'fr').
 * @returns {object} - The transformed object with language-specific keys removed and values for the specified language.
 */

/*
 * Transforms a nested object to remove language-specific keys and keep only the keys for the specified language.
 * Maintains the original structure of the object, including arrays.
 *
 * @param {object} obj - The input object to transform.
 * @param {string} lang - The language code (e.g., 'en', 'nl', 'fr').
 * @returns {object} - The transformed object with language-specific keys removed and values for the specified language.
 */
export const transformObject = (obj, lang) => {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => transformObject(item, lang)); // Recursively transform array elements
  }

  const transformedObj = {};
  const langKeys = ["_EN", "_NL", "_FR", "_DE", "_ES"]; // Add all possible language suffixes

  for (const key in obj) {
    if (Object.hasOwnProperty.call(obj, key)) {
      let baseKey = key;
      let isLangKey = false;

      for (const suffix of langKeys) {
        if (key.endsWith(suffix)) {
          baseKey = key.slice(0, -suffix.length);
          isLangKey = true;
          break;
        }
      }

      if (isLangKey) {
        if (!transformedObj.hasOwnProperty(baseKey)) {
          const langSpecificKey = `${baseKey}_${lang}`;
          if (obj.hasOwnProperty(langSpecificKey)) {
            transformedObj[baseKey] = transformObject(
              obj[langSpecificKey],
              lang
            ); // Transform nested value
          } else {
            // If specific language key is missing, fallback to the first available language
            for (const suffix of langKeys) {
              const fallbackLangKey = `${baseKey}${suffix}`;
              if (obj.hasOwnProperty(fallbackLangKey)) {
                transformedObj[baseKey] = transformObject(
                  obj[fallbackLangKey],
                  lang
                ); // Transform nested value
                break;
              }
            }
          }
        }
      } else {
        transformedObj[key] = transformObject(obj[key], lang); // Transform nested value
      }
    }
  }
  return transformedObj;
};
