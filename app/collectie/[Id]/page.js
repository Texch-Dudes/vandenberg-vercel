"use client";
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Parallax } from "@/components/Parallax/Parallax";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";

import Banner from "@/components/Banner";
import LightBox from "@/components/LightBox/LightBox";

import Cookies from "js-cookies";

import ArrowBackward from "../../../public/arrowBackward.svg";
import ArrowForward from "../../../public/arrowForward.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "../../../styles/highlighter.scss";
import "../../../styles/collectionSingle.scss";
import "../../../styles/globals.scss";

import { fetchCollectionDetailsPageData } from "@/store/pages/action";
import {
  COLLECTION_LABELS_ID,
  DATA_BASE_CAR_ID,
  LANGAUGE,
  LOCAL_STORAGE,
  NOT_FOUND_PATH,
  PAGES_LINKS,
} from "@/constant";
import { formatNumbersInString } from "@/utils";
import Image from "next/image";

const Loader = () => (
  <div className="page-loader">
    <div className="loader-spinner"></div>
  </div>
);

export default function Page() {
  const params = useParams();
  console.log("params", params);
  const { freshLoad, showNav } = useSelector((state) => state.common) || {};
  const router = useRouter();
  const [nav1, setNav1] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLightBoxOpen, setIsLightBoxOpen] = useState(false);
  const [activeSlide, setActiveSlide] = useState(0);
  const [nav2, setNav2] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobileSliderVisible, setIsMobileSliderVisible] = useState(false);
  const dispatch = useDispatch();
  const sectionRef = useRef(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);
  const {
    carCategories,
    heroSection,
    featureSection,
    sliderSection,
    detailsSection,
    labelData,
  } = useSelector((state) => state?.pages?.collectionDetails) || {};
  const ctaSection = useSelector((state) => state?.common?.appDetails);
  const sliderData =
    sliderSection?.sliderItems
      ?.map(({ image, text, mobileImage }) => {
        return image
          ? {
            bgImage: image?.node?.mediaItemUrl,
            bgMobileImage: mobileImage?.node?.mediaItemUrl,
            text,
          }
          : null;
      })
      .filter((item) => item !== null) || [];
  const { translatedStrings = [] } = labelData || {};

  const formatText = (text) => {
    const hasNumber = /\d/.test(text);
    if (hasNumber) {
      return `€${text},-`;
    }
    return text;
  };
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        if (isVisible) return;
        const rect = sectionRef?.current?.getBoundingClientRect();
        if (rect?.top - sectionRef?.current?.offsetHeight < 0) {
          setIsVisible(true);
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  useEffect(() => {
    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, [sliderRef1, sliderRef2, sliderSection]);
  function SampleNextArrow(props) {
    const { className, style, onClick, currentSlide, slideCount } = props;
    return (
      <button className={className} style={style} onClick={onClick}>
        {" "}
        <ArrowForward />
      </button>
    );
  }
  function SamplePrevArrow(props) {
    const { className, style, onClick, currentSlide } = props;
    return (
      <button className={className} style={style} onClick={onClick}>
        <ArrowBackward />
      </button>
    );
  }
  const setting = {
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
    arrows: true,
    speed: 400,
    infinite: true,
    fade: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          variableWidth: false,
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const settingThumb = {
    slidesToScroll: 1,
    pauseOnHover: false,
    slidesToShow: 6,
    swipeToSlide: true,
    focusOnSelect: true,
    variableWidth: true,
    infinite: true,
    arrows: false,
    centermode: true,
    responsive: [
      {
        breakpoint: 767,
        settings: {
          variableWidth: false,
          initialSlide: 1,
          slidesToShow: 4.5,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const language =
    localStorage.getItem(LOCAL_STORAGE.LANGUAGE_KEY) ||
    LANGAUGE.DEFAULT_LANGUAGE_CODE;
  useEffect(() => {
    if (params?.Id) {
      setIsLoading(true);
      console.log("Fetching data with slug:", params?.Id);

      // Ensure slug is a string
      const slug =
        typeof params?.Id === "string" ? params?.Id : params?.Id?.toString();

      dispatch(fetchCollectionDetailsPageData(slug)).finally(() =>
        setIsLoading(false)
      );
    } else {
      router.push(NOT_FOUND_PATH);
    }
  }, [dispatch, router, params?.Id, language]); // Ensure `language` is included

  const openLightBox = (index = 0) => {
    console.log("Opening LightBox, index:", index);
    setActiveSlide(index);
    setTimeout(() => setIsLightBoxOpen(true), 100); // Add delay to force re-render
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("lightbox-overlay")) {
      console.log("Clicked outside, closing LightBox");
      setIsLightBoxOpen(false);
    }
  };
  const [selectedLanguage, setSelectedLanguage] = useState("nl");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedLanguage(localStorage.getItem("language") || "nl");
    }
  }, []);

console.log("featureSection price", featureSection);``

  const properties = [
    {
      key: "type",
      title: {
        NL: "Type",
        EN: "Type",
        FR: "Type",
        DE: "Typ",
        ES: "Tipo",
      },
      value: featureSection?.type,
    },
    {
      key: "motor",
      title: {
        NL: "Motor",
        EN: "Engine",
        FR: "Moteur",
        DE: "Motor",
        ES: "Motor",
      },
      value: featureSection?.motor,
    },
    {
      key: "body",
      title: {
        NL: "Carrosserie",
        EN: "Body",
        FR: "Carrosserie",
        DE: "Karosserie",
        ES: "Carrocería",
      },
      value: featureSection?.body,
    },
    {
      key: "constructionYear",
      title: {
        NL: "Bouwjaar",
        EN: "Year of manufacture",
        FR: "Année de fabrication",
        DE: "Baujahr",
        ES: "Año de fabricación",
      },
      value: featureSection?.constructionYear,
    },
    {
      key: "kmStand",
      title: {
        NL: "Km Stand",
        EN: "Mileage",
        FR: "Kilométrage",
        DE: "Kilometerstand",
        ES: "Kilometraje",
      },
      value: featureSection?.kmStand,
    },
    {
      key: "colour",
      title: {
        NL: "Kleur",
        EN: "Color",
        FR: "Couleur",
        DE: "Farbe",
        ES: "Color",
      },
      value: featureSection?.colour,
    },
    {
      key: "status",
      title: {
        NL: "Status",
        EN: "Status",
        FR: "Statut",
        DE: "Status",
        ES: "Estado",
      },
      value: featureSection?.status,
    },
    {
      key: "price",
      title: {
        NL: "Prijs",
        EN: "Price",
        FR: "Prix",
        DE: "Preis",
        ES: "Precio",
      },
      value:featureSection?.price ? formatText(featureSection?.price) : null,
    },
  ];

  return (
    <>
      {isLoading && <Loader />}

      <Banner
        scale={false}
        clipPath={false}
        bgImage={heroSection?.bannerBgImage?.node?.mediaItemUrl}
        headingText={heroSection?.bannerText || []}
        className={"collectieSingleBanner"}
        id={params?.Id}
      />
      <section
        className={`${freshLoad ? "bannerSection" : ""
          } bannerEffect collectieSingleBannerMbl   banner`}
        style={{ minHeight: freshLoad ? "100vh" : "" }}
      >
        <div className="container">
          <div className="block">
            <h1>
              {heroSection?.bannerText?.map((data, index) => (
                <span key={index}>
                  <span>{data?.line}</span>
                </span>
              ))}
            </h1>
          </div>
        </div>
        <div className="imgWrapper">
          <Image
            src={heroSection?.bannerBgImage?.node?.mediaItemUrl || <Loader />}
            alt=""
            layout="responsive"
            priority={isLoading}
            width={100}
            height={100}
          />
        </div>
      </section>
      {
        featureSection?.type && (
          <section className="carInformation">
            <div className="container">
              <div className="infoContainer lgBlock">
                <div className="carInfoBlock topBlock flexWrapper">
                  {properties.map(
                    ({ key, title, value }) =>
                      value && (
                        <div key={key} className="carInfoInnerBlock">
                          <span>{title[selectedLanguage]}</span>
                          <p>{value}</p>
                        </div>
                      )
                  )}
                </div>
              </div>
            </div>
          </section>
        )
      }
      {sliderData?.length === 0 ? null : (
        <>
          <section className="SinglePageSlider" ref={sectionRef}>
            <div className="slidesImageBlock">
              <div className="container">
                <Slider
                  beforeChange={(oldIndex, newIndex) =>
                    setActiveSlide(newIndex)
                  }
                  {...setting}
                  asNavFor={nav2}
                  ref={(slider) => (sliderRef1 = slider)}
                >
                  {sliderData?.map((item, index) => (
                    <div key={index} className="sliderBlock">
                      <picture>
                        <source
                          media={"(max-width:767px)"}
                          srcSet={item.bgImage}
                        />
                        <img src={item.bgImage} alt="slider" />
                      </picture>
                    </div>
                  ))}
                </Slider>
              </div>
              <div className="container">
                <div className="sliderContent">
                  <p
                    dangerouslySetInnerHTML={{ __html: sliderData?.[0]?.text }}
                  />
                </div>
              </div>
            </div>
            <div className="ThumbsBlock slickThumbs" id="unique">
              <Slider
                {...settingThumb}
                asNavFor={nav1}
                ref={(slider) => (sliderRef2 = slider)}
              >
                {sliderData.map((item, i) => (
                  <div
                    key={i}
                    className={`sliderThumbsBlock img-box ${activeSlide === i ? "active" : ""
                      }`}
                    onClick={() => {
                      console.log("Thumbnail clicked, opening LightBox");
                      openLightBox(i);
                    }}
                  >
                    <img src={item.bgImage} alt="slider" />
                  </div>
                ))}
              </Slider>
            </div>
          </section>
          <div className="collectieSingleBannerMbl">
            <img src={sliderData[0].bgImage} alt="Banner" />

            <div className="gridImageBlock">
              {sliderData.slice(1, 4).map((item, index) => (
                <img
                  key={index}
                  src={item.bgImage}
                  alt={`Grid item ${index + 1}`}
                />
              ))}

              <div
                className="allFotosContainer"
                onClick={() => {
                  console.log("Clicked on Alle foto’s");
                  openLightBox(0);
                }}
              >
                <img
                  src={sliderData[4]?.bgImage || sliderData[0].bgImage}
                  alt="Gallery"
                />
                <div className="overlay">
                  <div className="iconWithText">
                    <img src="/img.png" alt="Gallery Icon" />
                    <span>Alle foto’s</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {sliderData?.length || detailsSection?.description ? (
        <section
          className="carDescription"
          style={
            detailsSection?.description
              ? {}
              : { padding: "23rem 0rem 0rem 0rem" }
          }
        >
          {detailsSection?.description ? (
            <div className="container">
              <div className="infoContainer">
                <div className="descriptionBlock flexWrapper">
                  <div className="descriptionHeading">
                    <h2>{detailsSection?.descriptionTitle}</h2>
                  </div>
                  <div
                    className="descriptionContent"
                    dangerouslySetInnerHTML={{
                      __html: detailsSection?.description,
                    }}
                  ></div>
                </div>
              </div>
            </div>
          ) : null}
        </section>
      ) : null}
      {detailsSection?.motorHighlights ? (
        <section className="carHighLight">
          <div className="container">
            <div className="infoContainer">
              <div className="carHighLightBlock  carHighLightTop flexWrapper">
                {detailsSection?.motorHighlights?.length ? (
                  <div className="CarHighLightInnerBlock">
                    <h2>
                      {detailsSection?.motorHighHeading}{" "}
                      <span>{detailsSection?.highlightsTitle}</span>
                    </h2>
                    <ul>
                      {detailsSection?.motorHighlights?.map(
                        ({ points }, index) => (
                          <li key={index}>{points}</li>
                        )
                      )}
                    </ul>
                  </div>
                ) : null}
                {detailsSection?.exteriorHighlights?.length ? (
                  <div className="CarHighLightInnerBlock">
                    <h2>
                      {detailsSection?.exteriorHighheading}
                      <span> {detailsSection?.highlightsTitle}</span>
                    </h2>
                    <ul>
                      {detailsSection?.exteriorHighlights?.map(
                        ({ points }, index) => (
                          <li key={index}>{points}</li>
                        )
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>
              <div className="carHighLightBlock carHighLightbottom flexWrapper">
                {detailsSection?.interiorhighlights?.length ? (
                  <div className="CarHighLightInnerBlock">
                    <h2>
                      {detailsSection?.interiorHighHeading}{" "}
                      <span>{detailsSection?.highlightsTitle}</span>
                    </h2>
                    <ul>
                      {detailsSection?.interiorhighlights?.map(
                        ({ points }, index) => (
                          <li key={index}>{points}</li>
                        )
                      )}
                    </ul>
                  </div>
                ) : null}
                {detailsSection?.exteriorHighlights?.length ? (
                  <div className="CarHighLightInnerBlock">
                    <h2>
                      {detailsSection?.exteriorHighheading}{" "}
                      <span>{detailsSection?.highlightsTitle}</span>
                    </h2>
                    <ul>
                      {detailsSection?.exteriorHighlights?.map(
                        ({ points }, index) => (
                          <li key={index}>{points}</li>
                        )
                      )}
                    </ul>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {ctaSection?.auto_cta_image_mobile || ctaSection?.auto_cta_image ? (
        <section className="zoomImageContainer">
          <Parallax speed={1} aspectRatio className="zoomImageHome">
            <picture>
              <source
                media={"(max-width:575px)"}
                srcSet={ctaSection?.auto_cta_image_mobile}
              />
              <img src={ctaSection?.auto_cta_image} alt="slider" />
            </picture>
          </Parallax>
        </section>
      ) : null}
      {ctaSection ? (
        <section className="highlighter light alt adviseAlt">
          <div className="container">
            <div className="flexWrapper">
              <h2>{ctaSection?.auto_cta_heading}</h2>
              <div className="content">
                <p>{ctaSection?.auto_cta_text}</p>
                <div className="btn_wrapper">
                  <div className="btnWrapper">
                    <Link href={PAGES_LINKS.CONTACT} className="btn">
                      {ctaSection?.auto_cta_button1}
                    </Link>
                  </div>
                  <div className="btnWrapper">
                    <Link
                      href={PAGES_LINKS.CONTACT_SELLING_CAR}
                      className="btn"
                    >
                      {ctaSection?.auto_cta_buton2}
                    </Link>
                  </div>
                </div>
                {ctaSection?.auto_signature_image ? (
                  <Image
                    src={ctaSection?.auto_signature_image}
                    alt="peter signature"
                    width={292}
                    height={72}
                  />
                ) : null}
              </div>
            </div>
          </div>
        </section>
      ) : null}
      {isLightBoxOpen && (
        <div className="lightbox-overlay" onClick={handleOutsideClick}>
          <LightBox
            key={activeSlide}
            data={sliderData}
            activeSlide={activeSlide}
            isOpen={true}
            onClose={() => {
              console.log("Closing LightBox via onClose");
              setIsLightBoxOpen(false);
            }}
          />
        </div>
      )}
    </>
  );
}
