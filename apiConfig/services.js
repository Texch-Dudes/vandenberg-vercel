import { automationQuery, automationQueryBySlug } from "./queries";

const {
  graphQlRequest,
  getRequest,
  postRequest,
  graphQlRequestFetch,
} = require("./requests");

const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

export const getLanguagesApi = () => {
  // const query = `{
  //     languages {
  //       country_flag_url
  //       native_name
  //       language_code
  //   }
  // }`;
  return {
    data: {
      languages: [
        {
          country_flag_url:
            "https://vandenbergcarclassic-wp.grandsolution.dev/wp-content/plugins/sitepress-multilingual-cms/res/flags/nl.svg",
          native_name: "Nederlands",
          language_code: "NL",
        },
        {
          country_flag_url:
            "https://vandenbergcarclassic-wp.grandsolution.dev/wp-content/plugins/sitepress-multilingual-cms/res/flags/en.svg",
          native_name: "English",
          language_code: "EN",
        },
        {
          country_flag_url:
            "https://vandenbergcarclassic-wp.grandsolution.dev/wp-content/plugins/sitepress-multilingual-cms/res/flags/fr.svg",
          native_name: "Français",
          language_code: "FR",
        },
        {
          country_flag_url:
            "https://vandenbergcarclassic-wp.grandsolution.dev/wp-content/plugins/sitepress-multilingual-cms/res/flags/de.svg",
          native_name: "Deutsch",
          language_code: "DE",
        },
        {
          country_flag_url:
            "https://vandenbergcarclassic-wp.grandsolution.dev/wp-content/plugins/sitepress-multilingual-cms/res/flags/es.svg",
          native_name: "Español",
          language_code: "ES",
        },
      ],
    },
    extensions: {
      debug: [
        {
          type: "DEBUG_LOGS_INACTIVE",
          message:
            "GraphQL Debug logging is not active. To see debug logs, GRAPHQL_DEBUG must be enabled.",
        },
      ],
    },
  };
};

// export const getHeaderMenuApi = () => {
//   const query = `query menus {
//     menus {
//       nodes {
//         databaseId
//         name
//         menuItems {
//           nodes {
//             label
//             connectedObject {
//               ... on Page {
//                 databaseId
//                 pageKey {
//                   key
//                 }
//               }
//             }
//           }
//         }
//       }
//     }
//   }`;
//   return graphQlRequest(query);
// };

// export const getHomePageContentApi = (id) => {
//   const query = `
//     query HomePageContent {
//       page(id: "${id}", idType: DATABASE_ID) {
//         seo {
//           metaDesc
//           title
//           metaRobotsNofollow
//           metaRobotsNoindex
//         }

//         homeHeroSection: home {
//           bgImage {
//             node {
//               mediaItemUrl
//             }
//           }
//           heroHeading {
//             line
//           }
//           heroText
//         }
//         contentSection: home {
//           contentText
//           contentHeading
//           contentButton1
//           contentButton2
//         }
//         carSliderSection: home {
//           carSlider {
//             text
//             image {
//               node {
//                 mediaItemUrl
//               }
//             }
//             mobileImg {
//               node {
//                 mediaItemUrl
//               }
//             }
//           }
//           sliderSignatureImage {
//             node {
//               mediaItemUrl
//             }

//           }
//         }
//         carDetailsSliderSection: home {
//           contentSlider {
//             mainImage {
//               node {
//                 mediaItemUrl
//               }
//             }
//             subHeading
//             heading
//             text
//             button
//             buttonUrl
//           }
//         }

//         footerCtaSection: home {
//           fctaImage {
//             node {
//               mediaItemUrl
//             }
//           }
//           ctaImageMobile {
//             node {
//               mediaItemUrl
//             }
//           }
//           fctaHeading
//           fctaText
//           fctaButton
//           ctaSignatureImage {
//             node {
//               mediaItemUrl
//             }
//           }
//         }
//       }
//     }
//   `;
//   return graphQlRequest(query, { id });
// };

export const getHomePageContentApi = async (language) => {
  try {
    const response = await fetch(`${baseURL}/homepage?lang=${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return data?.page; // Return the parsed data
  } catch (error) {
    console.error("Error fetching home page data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const getAboutUsPageContentApi = async (language) => {
  try {
    const response = await fetch(`${baseURL}/aboutpage?lang=${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return data?.page; // Return the parsed data
  } catch (error) {
    console.error("Error fetching home page data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
export const getAdvisePageContentApi = async (language) => {
  try {
    const response = await fetch(
      `${baseURL}/restauratiepage?lang=${language}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return data?.page; // Return the parsed data
  } catch (error) {
    console.error("Error fetching home page data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};
export const getCollectionPageContentApi = async (language) => {
  try {
    const response = await fetch(`${baseURL}/collectiepage?lang=${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return data?.page;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const getCarDetailsContentApi = async () => {
  try {
    const response = await fetch(`${baseURL}/caradd`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();

    return data;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

// export const getCarDetailsContentApi = (language, categoryId) => {
//   const query = `
//   query CollectionPageContent($language: String!) {

//     collectionCarCategorySection: carCategories(where: {language: $language, orderby: NAME, order: DESC}) {
//       nodes {
//         databaseId
//         name
//         count
//       }

//     }
//     collectionCarsDataSection:cars(where: {language: $language},first: 200) {
//     nodes {
//       title
//       slug
//       translations {
//         languageCode
//         slug
//       }
//       databaseId
//       carCategories {
//         nodes {
//           name
//           databaseId
//         }
//       }
//       carData {
//         galleryImages {
//           image {
//             node {
//               mediaItemUrl
//             }
//           }
//         }
//         constructionYear
//         kmStand
//         price
//       }
//     }
//     }
//   }
//   `
//   return graphQlRequest(query, { language })
// }

// export const getAutomationPagaContentFetchApi = async (slug) => {
//   return graphQlRequestFetch(automationQueryBySlug, { slug });
// };

// export const getAutomationPageContentApi = (slug) => {
//   return graphQlRequest(automationQueryBySlug, { slug });
// };
export const getAutomationPageContentApi = async (slug, language) => {
  if (!slug || typeof slug !== "string") {
    console.error("Invalid slug provided:", slug);
    return;
  }

  try {
    const response = await fetch(
      `${baseURL}/caradd/${encodeURIComponent(slug)}?lang=${language}`,
      {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getNotFoundPageContentApi = (id) => {
  const query = `
    query PageNotFound($id: ID!) {
      page(id: $id, idType: DATABASE_ID) {
        seo {
          metaDesc
          title
          metaRobotsNofollow
          metaRobotsNoindex
        }
        bannerSection:notfound {
          bannerBgImage {
            node {
              mediaItemUrl
            }
          }
          bannerText
          bannerHeading
          bannerButton
        }
        ctaSection:notfound {
          ctaText
          ctaButton
          ctaHeading
          signatureImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  `;
  return graphQlRequest(query, { id });
};

// export const getContactPageContentApi = (id) => {
//   const query = `
//   query ContactPageContent($id: ID!) {
//     page(id: $id, idType: DATABASE_ID) {
//       seo {
//         metaDesc
//         title
//         metaRobotsNofollow
//         metaRobotsNoindex
//       }
//       contactHeroSection:contactPage {
//         bannertext
//         bannerHeading {
//           line
//         }
//         bannerBgImage {
//           node {
//             mediaItemUrl
//           }
//         }
//       }
//       contactSection:contactPage {
//         contactSubHeading
//         contactHeading
//         detailsHeading
//         address
//         kvkNumberTitle
//         kvkNumber
//         phoneNumber
//         email
//       }
//       contactUsFormSection:contactPage {
//         contactFormTab
//         contactnamelabel
//         contactEmailLabel
//         contactPhoneNumberLabel
//         contactMessageLabel
//         contactFormSendButton
//       }
//         privacyPolicySection:contactPage{
//           privacyPolicyPdf {
//                      node {
//                        mediaItemUrl
//                     }
//           }
//           privacyPolicyUrlText
//           privacyPolicyText
//       }
//       sellingFormSection:contactPage {
//         sellingTabTitle
//         sellingNameLabel
//         sellingEmailLabel
//         sellingPhoneLabel
//         sellingMessageLabel
//         placeLabel
//         licenseLabel
//         imageLabel
//         maxSizeLabel
//         sellingButtonText
//       }
//       articlesSection:contactPage {
//         articleSubHeading
//         articleHeading
//         articles {
//           title
//           buttonText
//           url
//         }
//       }
//       contactSliderSection:contactPage {
//         sliderTitle
//         sliderText
//         sliderItems {
//           image {
//             node {
//               mediaItemUrl
//             }
//           }
//         }
//       }
//     }
//   }
//   `
//   return graphQlRequest(query, { id })
// }
export const getContactPageContentApi = async (language) => {
  try {
    const response = await fetch(`${baseURL}/contactpage?lang=${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    return data?.page;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

export const getSpeedPageContentApi = async (language) => {
  try {
    const response = await fetch(`${baseURL}/speedpage?lang=${language}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data = await response.json();
    console.log("data speed", data);

    return data?.page;
  } catch (error) {
    console.error("Error fetching home page data:", error);
    throw error; // Rethrow the error for the caller to handle
  }
};

// export const getSpeedPageContentApi = (id) => {
//   const query = `
//     query SpeedPageContent {
//       page(id: "${id}", idType: DATABASE_ID) {
//         seo {
//           metaDesc
//           title
//           metaRobotsNofollow
//           metaRobotsNoindex
//         }
//         speedContentSection: speed {
//           contentHeading
//           contentText
//         }
//         speedHeroSection: speed {
//           bannerBgImage {
//             node {
//               mediaItemUrl
//             }
//           }
//           bannerHeading
//           bannerText
//           bannerSubHeading {
//             line
//           }
//         }
//         speedSliderSection: speed {
//           sliderItems {
//             image {
//               node {
//                 mediaItemUrl
//               }
//             }
//             mobileImage {
//               node {
//                 mediaItemUrl
//               }
//             }
//           }
//           sliderTitle
//           slidersubtitle
//         }
//         speedSliderContentSection: speed {
//           content2SubHeading
//           content2Heading
//           content2Text
//           galleryHeading
//         }
//         speedProjectCardSection: speed {
//           loadMore
//           projectHeading
//           projectCards {
//             image {
//               node {
//                 mediaItemUrl
//               }
//             }
//             subTitle
//             title
//           }
//         }
//         speedGallerySectionn:speed {
//           galleryItems {
//              subTitle
//             title
//             image {
//               node {
//                 mediaItemUrl
//               }
//             }

//           }
//         }
//         speedCtaSection:speed {
//           ctaImage {
//             node {
//               mediaItemUrl
//             }
//           }
//           ctaImageMobile{
//             node {
//               mediaItemUrl
//             }
//           }
//           ctaHeading
//           ctatext
//           ctaButton
//           signatureImage {
//             node {
//               mediaItemUrl
//             }
//           }
//         }
//       }
//     }
//   `;
//   return graphQlRequest(query, { id });
// };

export const getFutureProjectsApi = (id) => {
  const query = `query carList {
    cars(
      where: {taxQuery: {taxArray: {field: ID, taxonomy: CARCATEGORY, terms: "${id}"}}}
      first: 200
    ) {
      nodes {
        title
        databaseId
        slug
        carCategories {
          nodes {
            name
            databaseId
            translations {
              databaseId
              languageCode
            }
          }
        }
        carData {
          bannerBgImage {
            node {
              mediaItemUrl
            }
          }
        }
      }
    }
  }`;
  return graphQlRequest(query);
};

export const getFutureProjectCatergoryTrancelations = (id) => {
  const query = `query MyQuery2 {
  carCategory(id: "${id || 49}", idType: DATABASE_ID) {
    translations {
      databaseId
      languageCode
      name
    }
  }
}`;
  return graphQlRequest(query);
};

export const getCollectiePageLabelApi = (language) => {
  const query = `{
    translatedStrings(domain: "vandenberg-strings", language: "${language}") {
      id
      translated
    }
  }`;
  return graphQlRequest(query);
};

export const getAppDetailsApi = (language) => {
  return getRequest(`${baseURL}/globaldata?lang=${language}`);
};

export const postSellCarDetails = (payload) => {
  return postRequest(`${baseURL}/sellingporscheform`, payload);
};

export const postContactUsDetailsApi = (payload) => {
  return postRequest(`${baseURL}/contactusform`, payload);
};
