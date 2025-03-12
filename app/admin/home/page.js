"use client";
import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import Dropzone from "react-dropzone";
import { uploadImageAndGetUrl } from "@/app/lib/UploadImageGetUrl";

const Home = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const [formData, setFormData] = useState(null);
  const [language, setLanguage] = useState(typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/homepage?edit=true`);
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setFormData(data);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchData();
  }, [baseURL]);

  useEffect(() => {
    const handleLanguageChange = () => {
      if (typeof window !== "undefined") {
        setLanguage(localStorage.getItem("adminLanguage") || "nl");
      }
    };

    if (typeof window !== "undefined") {
      window.addEventListener("languageChange", handleLanguageChange);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("languageChange", handleLanguageChange);
      }
    };
  }, []);

  const transformData = (values) => {
    return values;
  };

  const postData = async (data) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${baseURL}/homepage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to post data");
      }
      setIsLoading(false);

      console.log("Data posted successfully");
      alert("Data submitted successfully");
    } catch (error) {
      console.error("Error posting data:", error.message);
      alert("Error submitting data");
      setIsLoading(false);
    }
  };

  const onDrop = async (acceptedFiles, setFieldValue, fieldName) => {
    try {
      const urls = await uploadImageAndGetUrl(acceptedFiles[0]);
      setFieldValue(fieldName, urls[0]);
    } catch (error) {
      console.error("Error uploading image:", error.message);
    }
  };

  if (!formData) {
    return <div>Loading...</div>;
  }

  return (
    <Formik
      initialValues={formData}
      onSubmit={(values) => {
        const transformedData = transformData(values);
        console.log("Transformed Data", transformedData);
        postData(transformedData); // Post the data to the API
      }}
    >
      {({ setFieldValue, values }) => (
        <Form>
          {/* Hero Section */}
          <div>
            <h2>{language === "en" ? "Home Hero Section" : "Home Hero Sectie"}</h2>
            <div>
              <label>{language === "en" ? "Hero Heading Line 1 (NL)" : "Hero Kopregel 1 (NL)"}</label>
              <Field name="page.homeHeroSection.heroHeading[0].line_NL" />
              <ErrorMessage name="page.homeHeroSection.heroHeading[0].line_NL" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Heading Line 1 (EN)" : "Hero Kopregel 1 (EN)"}</label>
              <Field name="page.homeHeroSection.heroHeading[0].line_EN" />
              <ErrorMessage name="page.homeHeroSection.heroHeading[0].line_EN" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Heading Line 1 (FR)" : "Hero Kopregel 1 (FR)"}</label>
              <Field name="page.homeHeroSection.heroHeading[0].line_FR" />
              <ErrorMessage name="page.homeHeroSection.heroHeading[0].line_FR" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Heading Line 1 (DE)" : "Hero Kopregel 1 (DE)"}</label>
              <Field name="page.homeHeroSection.heroHeading[0].line_DE" />
              <ErrorMessage name="page.homeHeroSection.heroHeading[0].line_DE" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Heading Line 1 (ES)" : "Hero Kopregel 1 (ES)"}</label>
              <Field name="page.homeHeroSection.heroHeading[0].line_ES" />
              <ErrorMessage name="page.homeHeroSection.heroHeading[0].line_ES" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Heading Line 2 (NL)" : "Hero Kopregel 2 (NL)"}</label>
              <Field name="page.homeHeroSection.heroHeading[1].line_NL" />
              <ErrorMessage name="page.homeHeroSection.heroHeading[1].line_NL" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Heading Line 2 (EN)" : "Hero Kopregel 2 (EN)"}</label>
              <Field name="page.homeHeroSection.heroHeading[1].line_EN" />
              <ErrorMessage name="page.homeHeroSection.heroHeading[1].line_EN" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Heading Line 2 (FR)" : "Hero Kopregel 2 (FR)"}</label>
              <Field name="page.homeHeroSection.heroHeading[1].line_FR" />
              <ErrorMessage name="page.homeHeroSection.heroHeading[1].line_FR" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Heading Line 2 (DE)" : "Hero Kopregel 2 (DE)"}</label>
              <Field name="page.homeHeroSection.heroHeading[1].line_DE" />
              <ErrorMessage name="page.homeHeroSection.heroHeading[1].line_DE" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Heading Line 2 (ES)" : "Hero Kopregel 2 (ES)"}</label>
              <Field name="page.homeHeroSection.heroHeading[1].line_ES" />
              <ErrorMessage name="page.homeHeroSection.heroHeading[1].line_ES" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Text (NL)" : "Hero Tekst (NL)"}</label>
              <Field name="page.homeHeroSection.heroText_NL" as="textarea" />
              <ErrorMessage name="page.homeHeroSection.heroText_NL" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Text (EN)" : "Hero Tekst (EN)"}</label>
              <Field name="page.homeHeroSection.heroText_EN" as="textarea" />
              <ErrorMessage name="page.homeHeroSection.heroText_EN" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Text (FR)" : "Hero Tekst (FR)"}</label>
              <Field name="page.homeHeroSection.heroText_FR" as="textarea" />
              <ErrorMessage name="page.homeHeroSection.heroText_FR" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Text (DE)" : "Hero Tekst (DE)"}</label>
              <Field name="page.homeHeroSection.heroText_DE" as="textarea" />
              <ErrorMessage name="page.homeHeroSection.heroText_DE" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Hero Text (ES)" : "Hero Tekst (ES)"}</label>
              <Field name="page.homeHeroSection.heroText_ES" as="textarea" />
              <ErrorMessage name="page.homeHeroSection.heroText_ES" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Background Image" : "Achtergrondafbeelding"}</label>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  onDrop(acceptedFiles, setFieldValue, "page.homeHeroSection.bgImage.node.mediaItemUrl")
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className={"dropzone"}>
                    <input {...getInputProps()} />
                    <p style={{ margin: "0" }}>
                      {language === "en" ? "Drag 'n' drop an image here, or click to select one" : "Sleep een afbeelding hierheen of klik om er een te selecteren"}
                    </p>
                  </div>
                )}
              </Dropzone>
              {values.page.homeHeroSection.bgImage.node.mediaItemUrl && (
                <img
                  src={values.page.homeHeroSection.bgImage.node.mediaItemUrl}
                  alt="Background"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
            </div>
          </div>

          {/* Content Section */}
          <div>
            <h2>{language === "en" ? "Content Section" : "Inhoud Sectie"}</h2>
            <div>
              <label>{language === "en" ? "Content Heading (NL)" : "Inhoud Kop (NL)"}</label>
              <Field name="page.contentSection.contentHeading_NL" />
              <ErrorMessage name="page.contentSection.contentHeading_NL" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Heading (EN)" : "Inhoud Kop (EN)"}</label>
              <Field name="page.contentSection.contentHeading_EN" />
              <ErrorMessage name="page.contentSection.contentHeading_EN" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Heading (FR)" : "Inhoud Kop (FR)"}</label>
              <Field name="page.contentSection.contentHeading_FR" />
              <ErrorMessage name="page.contentSection.contentHeading_FR" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Heading (DE)" : "Inhoud Kop (DE)"}</label>
              <Field name="page.contentSection.contentHeading_DE" />
              <ErrorMessage name="page.contentSection.contentHeading_DE" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Heading (ES)" : "Inhoud Kop (ES)"}</label>
              <Field name="page.contentSection.contentHeading_ES" />
              <ErrorMessage name="page.contentSection.contentHeading_ES" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Text (NL)" : "Inhoud Tekst (NL)"}</label>
              <Field name="page.contentSection.contentText_NL" as="textarea" />
              <ErrorMessage name="page.contentSection.contentText_NL" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Text (EN)" : "Inhoud Tekst (EN)"}</label>
              <Field name="page.contentSection.contentText_EN" as="textarea" />
              <ErrorMessage name="page.contentSection.contentText_EN" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Text (FR)" : "Inhoud Tekst (FR)"}</label>
              <Field name="page.contentSection.contentText_FR" as="textarea" />
              <ErrorMessage name="page.contentSection.contentText_FR" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Text (DE)" : "Inhoud Tekst (DE)"}</label>
              <Field name="page.contentSection.contentText_DE" as="textarea" />
              <ErrorMessage name="page.contentSection.contentText_DE" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Text (ES)" : "Inhoud Tekst (ES)"}</label>
              <Field name="page.contentSection.contentText_ES" as="textarea" />
              <ErrorMessage name="page.contentSection.contentText_ES" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Button 1 (NL)" : "Inhoud Knop 1 (NL)"}</label>
              <Field name="page.contentSection.contentButton1_NL" />
              <ErrorMessage name="page.contentSection.contentButton1_NL" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Button 1 (EN)" : "Inhoud Knop 1 (EN)"}</label>
              <Field name="page.contentSection.contentButton1_EN" />
              <ErrorMessage name="page.contentSection.contentButton1_EN" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Button 1 (FR)" : "Inhoud Knop 1 (FR)"}</label>
              <Field name="page.contentSection.contentButton1_FR" />
              <ErrorMessage name="page.contentSection.contentButton1_FR" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Button 1 (DE)" : "Inhoud Knop 1 (DE)"}</label>
              <Field name="page.contentSection.contentButton1_DE" />
              <ErrorMessage name="page.contentSection.contentButton1_DE" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Button 1 (ES)" : "Inhoud Knop 1 (ES)"}</label>
              <Field name="page.contentSection.contentButton1_ES" />
              <ErrorMessage name="page.contentSection.contentButton1_ES" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Button 2 (NL)" : "Inhoud Knop 2 (NL)"}</label>
              <Field name="page.contentSection.contentButton2_NL" />
              <ErrorMessage name="page.contentSection.contentButton2_NL" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Button 2 (EN)" : "Inhoud Knop 2 (EN)"}</label>
              <Field name="page.contentSection.contentButton2_EN" />
              <ErrorMessage name="page.contentSection.contentButton2_EN" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Button 2 (FR)" : "Inhoud Knop 2 (FR)"}</label>
              <Field name="page.contentSection.contentButton2_FR" />
              <ErrorMessage name="page.contentSection.contentButton2_FR" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Button 2 (DE)" : "Inhoud Knop 2 (DE)"}</label>
              <Field name="page.contentSection.contentButton2_DE" />
              <ErrorMessage name="page.contentSection.contentButton2_DE" component="div" />
            </div>
            <div>
              <label>{language === "en" ? "Content Button 2 (ES)" : "Inhoud Knop 2 (ES)"}</label>
              <Field name="page.contentSection.contentButton2_ES" />
              <ErrorMessage name="page.contentSection.contentButton2_ES" component="div" />
            </div>
          </div>

          {/* Car Slider Section */}
          <div>
            <h2>{language === "en" ? "Car Slider Section" : "Auto Slider Sectie"}</h2>
            {formData.page.carSliderSection.carSlider.map((_, index) => (
              <div key={index}>
                <label>{language === "en" ? `Slider Text (NL) ${index + 1}` : `Slider Tekst (NL) ${index + 1}`}</label>
                <Field name={`page.carSliderSection.carSlider[${index}].text_NL`} />
                <ErrorMessage name={`page.carSliderSection.carSlider[${index}].text_NL`} component="div" />

                <label>{language === "en" ? `Slider Text (EN) ${index + 1}` : `Slider Tekst (EN) ${index + 1}`}</label>
                <Field name={`page.carSliderSection.carSlider[${index}].text_EN`} />
                <ErrorMessage name={`page.carSliderSection.carSlider[${index}].text_EN`} component="div" />

                <label>{language === "en" ? `Slider Text (FR) ${index + 1}` : `Slider Tekst (FR) ${index + 1}`}</label>
                <Field name={`page.carSliderSection.carSlider[${index}].text_FR`} />
                <ErrorMessage name={`page.carSliderSection.carSlider[${index}].text_FR`} component="div" />

                <label>{language === "en" ? `Slider Text (DE) ${index + 1}` : `Slider Tekst (DE) ${index + 1}`}</label>
                <Field name={`page.carSliderSection.carSlider[${index}].text_DE`} />
                <ErrorMessage name={`page.carSliderSection.carSlider[${index}].text_DE`} component="div" />

                <label>{language === "en" ? `Slider Text (ES) ${index + 1}` : `Slider Tekst (ES) ${index + 1}`}</label>
                <Field name={`page.carSliderSection.carSlider[${index}].text_ES`} />
                <ErrorMessage name={`page.carSliderSection.carSlider[${index}].text_ES`} component="div" />

                <label>{language === "en" ? `Image URL ${index + 1}` : `Afbeelding URL ${index + 1}`}</label>
                <Dropzone
                  onDrop={(acceptedFiles) =>
                    onDrop(
                      acceptedFiles,
                      setFieldValue,
                      `page.carSliderSection.carSlider[${index}].image.node.mediaItemUrl`
                    )
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className={"dropzone"}>
                      <input {...getInputProps()} />
                      <p style={{ margin: "0" }}>
                        {language === "en" ? "Drag 'n' drop an image here, or click to select one" : "Sleep een afbeelding hierheen of klik om er een te selecteren"}
                      </p>
                    </div>
                  )}
                </Dropzone>
                {values.page.carSliderSection.carSlider[index].image?.node
                  .mediaItemUrl && (
                    <img
                      src={
                        values.page.carSliderSection.carSlider[index].image.node
                          .mediaItemUrl
                      }
                      alt={`Slider ${index + 1}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                <ErrorMessage
                  name={`page.carSliderSection.carSlider[${index}].image.node.mediaItemUrl`}
                  component="div"
                />

                <label>{language === "en" ? `Mobile Image URL ${index + 1}` : `Mobiele Afbeelding URL ${index + 1}`}</label>
                <Dropzone
                  onDrop={(acceptedFiles) =>
                    onDrop(
                      acceptedFiles,
                      setFieldValue,
                      `page.carSliderSection.carSlider[${index}].mobileImg.node.mediaItemUrl`
                    )
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <div {...getRootProps()} className={"dropzone"}>
                      <input {...getInputProps()} />
                      <p style={{ margin: "0" }}>
                        {language === "en" ? "Drag 'n' drop an image here, or click to select one" : "Sleep een afbeelding hierheen of klik om er een te selecteren"}
                      </p>
                    </div>
                  )}
                </Dropzone>
                {values.page.carSliderSection.carSlider[index].mobileImg?.node
                  .mediaItemUrl && (
                    <img
                      src={
                        values.page.carSliderSection.carSlider[index].mobileImg
                          .node.mediaItemUrl
                      }
                      alt={`Mobile Slider ${index + 1}`}
                      style={{ width: "100px", height: "100px" }}
                    />
                  )}
                <ErrorMessage
                  name={`page.carSliderSection.carSlider[${index}].mobileImg.node.mediaItemUrl`}
                  component="div"
                />
              </div>
            ))}
            <div>
              <label>{language === "en" ? "Slider Signature Image" : "Slider Handtekening Afbeelding"}</label>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  onDrop(
                    acceptedFiles,
                    setFieldValue,
                    "page.carSliderSection.sliderSignatureImage.node.mediaItemUrl"
                  )
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className={"dropzone"}>
                    <input {...getInputProps()} />
                    <p style={{ margin: "0" }}>
                      {language === "en" ? "Drag 'n' drop an image here, or click to select one" : "Sleep een afbeelding hierheen of klik om er een te selecteren"}
                    </p>
                  </div>
                )}
              </Dropzone>
              {values.page.carSliderSection.sliderSignatureImage?.node
                .mediaItemUrl && (
                  <img
                    src={
                      values.page.carSliderSection.sliderSignatureImage.node
                        .mediaItemUrl
                    }
                    alt="Slider Signature"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
              <ErrorMessage
                name="page.carSliderSection.sliderSignatureImage.node.mediaItemUrl"
                component="div"
              />
            </div>
          </div>

          {/* Car Details Slider Section */}
          <div>
            <h2>{language === "en" ? "Car Details Slider Section" : "Auto Details Slider Sectie"}</h2>
            {formData.page.carDetailsSliderSection.contentSlider.map(
              (_, index) => (
                <div key={index}>
                  <label>{language === "en" ? `Subheading (NL) ${index + 1}` : `Subkop (NL) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].subHeading_NL`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].subHeading_NL`}
                    component="div"
                  />

                  <label>{language === "en" ? `Subheading (EN) ${index + 1}` : `Subkop (EN) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].subHeading_EN`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].subHeading_EN`}
                    component="div"
                  />

                  <label>{language === "en" ? `Subheading (FR) ${index + 1}` : `Subkop (FR) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].subHeading_FR`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].subHeading_FR`}
                    component="div"
                  />

                  <label>{language === "en" ? `Subheading (DE) ${index + 1}` : `Subkop (DE) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].subHeading_DE`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].subHeading_DE`}
                    component="div"
                  />

                  <label>{language === "en" ? `Subheading (ES) ${index + 1}` : `Subkop (ES) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].subHeading_ES`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].subHeading_ES`}
                    component="div"
                  />

                  <label>{language === "en" ? `Heading (NL) ${index + 1}` : `Kop (NL) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].heading_NL`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].heading_NL`}
                    component="div"
                  />

                  <label>{language === "en" ? `Heading (EN) ${index + 1}` : `Kop (EN) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].heading_EN`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].heading_EN`}
                    component="div"
                  />

                  <label>{language === "en" ? `Heading (FR) ${index + 1}` : `Kop (FR) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].heading_FR`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].heading_FR`}
                    component="div"
                  />

                  <label>{language === "en" ? `Heading (DE) ${index + 1}` : `Kop (DE) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].heading_DE`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].heading_DE`}
                    component="div"
                  />

                  <label>{language === "en" ? `Heading (ES) ${index + 1}` : `Kop (ES) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].heading_ES`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].heading_ES`}
                    component="div"
                  />

                  <label>{language === "en" ? `Text (NL) ${index + 1}` : `Tekst (NL) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].text_NL`}
                    as="textarea"
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].text_NL`}
                    component="div"
                  />

                  <label>{language === "en" ? `Text (EN) ${index + 1}` : `Tekst (EN) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].text_EN`}
                    as="textarea"
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].text_EN`}
                    component="div"
                  />

                  <label>{language === "en" ? `Text (FR) ${index + 1}` : `Tekst (FR) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].text_FR`}
                    as="textarea"
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].text_FR`}
                    component="div"
                  />

                  <label>{language === "en" ? `Text (DE) ${index + 1}` : `Tekst (DE) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].text_DE`}
                    as="textarea"
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].text_DE`}
                    component="div"
                  />

                  <label>{language === "en" ? `Text (ES) ${index + 1}` : `Tekst (ES) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].text_ES`}
                    as="textarea"
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].text_ES`}
                    component="div"
                  />

                  <label>{language === "en" ? `Button Text (NL) ${index + 1}` : `Knop Tekst (NL) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].button_NL`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].button_NL`}
                    component="div"
                  />

                  <label>{language === "en" ? `Button Text (EN) ${index + 1}` : `Knop Tekst (EN) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].button_EN`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].button_EN`}
                    component="div"
                  />

                  <label>{language === "en" ? `Button Text (FR) ${index + 1}` : `Knop Tekst (FR) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].button_FR`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].button_FR`}
                    component="div"
                  />

                  <label>{language === "en" ? `Button Text (DE) ${index + 1}` : `Knop Tekst (DE) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].button_DE`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].button_DE`}
                    component="div"
                  />

                  <label>{language === "en" ? `Button Text (ES) ${index + 1}` : `Knop Tekst (ES) ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].button_ES`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].button_ES`}
                    component="div"
                  />

                  <label>{language === "en" ? `Button URL ${index + 1}` : `Knop URL ${index + 1}`}</label>
                  <Field
                    name={`page.carDetailsSliderSection.contentSlider[${index}].buttonUrl`}
                  />
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].buttonUrl`}
                    component="div"
                  />

                  <label>{language === "en" ? `Main Image URL ${index + 1}` : `Hoofdafbeelding URL ${index + 1}`}</label>
                  <Dropzone
                    onDrop={(acceptedFiles) =>
                      onDrop(
                        acceptedFiles,
                        setFieldValue,
                        `page.carDetailsSliderSection.contentSlider[${index}].mainImage.node.mediaItemUrl`
                      )
                    }
                  >
                    {({ getRootProps, getInputProps }) => (
                      <div {...getRootProps()} className={"dropzone"}>
                        <input {...getInputProps()} />
                        <p style={{ margin: "0" }}>
                          {language === "en" ? "Drag 'n' drop an image here, or click to select one" : "Sleep een afbeelding hierheen of klik om er een te selecteren"}
                        </p>
                      </div>
                    )}
                  </Dropzone>
                  {values.page.carDetailsSliderSection.contentSlider[index]
                    .mainImage?.node.mediaItemUrl && (
                      <img
                        src={
                          values.page.carDetailsSliderSection.contentSlider[index]
                            .mainImage.node.mediaItemUrl
                        }
                        alt={`Main Image ${index + 1}`}
                        style={{ width: "100px", height: "100px" }}
                      />
                    )}
                  <ErrorMessage
                    name={`page.carDetailsSliderSection.contentSlider[${index}].mainImage.node.mediaItemUrl`}
                    component="div"
                  />
                </div>
              )
            )}
          </div>

          <div>
            <h2>{language === "en" ? "Footer CTA Section" : "Footer CTA Sectie"}</h2>
            <div>
              <label>{language === "en" ? "Footer CTA Heading (NL)" : "Footer CTA Kop (NL)"}</label>
              <Field name="page.footerCtaSection.fctaHeading_NL" />
              <ErrorMessage
                name="page.footerCtaSection.fctaHeading_NL"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Heading (EN)" : "Footer CTA Kop (EN)"}</label>
              <Field name="page.footerCtaSection.fctaHeading_EN" />
              <ErrorMessage
                name="page.footerCtaSection.fctaHeading_EN"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Heading (FR)" : "Footer CTA Kop (FR)"}</label>
              <Field name="page.footerCtaSection.fctaHeading_FR" />
              <ErrorMessage
                name="page.footerCtaSection.fctaHeading_FR"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Heading (DE)" : "Footer CTA Kop (DE)"}</label>
              <Field name="page.footerCtaSection.fctaHeading_DE" />
              <ErrorMessage
                name="page.footerCtaSection.fctaHeading_DE"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Heading (ES)" : "Footer CTA Kop (ES)"}</label>
              <Field name="page.footerCtaSection.fctaHeading_ES" />
              <ErrorMessage
                name="page.footerCtaSection.fctaHeading_ES"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Text (NL)" : "Footer CTA Tekst (NL)"}</label>
              <Field name="page.footerCtaSection.fctaText_NL" as="textarea" />
              <ErrorMessage
                name="page.footerCtaSection.fctaText_NL"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Text (EN)" : "Footer CTA Tekst (EN)"}</label>
              <Field name="page.footerCtaSection.fctaText_EN" as="textarea" />
              <ErrorMessage
                name="page.footerCtaSection.fctaText_EN"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Text (FR)" : "Footer CTA Tekst (FR)"}</label>
              <Field name="page.footerCtaSection.fctaText_FR" as="textarea" />
              <ErrorMessage
                name="page.footerCtaSection.fctaText_FR"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Text (DE)" : "Footer CTA Tekst (DE)"}</label>
              <Field name="page.footerCtaSection.fctaText_DE" as="textarea" />
              <ErrorMessage
                name="page.footerCtaSection.fctaText_DE"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Text (ES)" : "Footer CTA Tekst (ES)"}</label>
              <Field name="page.footerCtaSection.fctaText_ES" as="textarea" />
              <ErrorMessage
                name="page.footerCtaSection.fctaText_ES"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Button (NL)" : "Footer CTA Knop (NL)"}</label>
              <Field name="page.footerCtaSection.fctaButton_NL" />
              <ErrorMessage
                name="page.footerCtaSection.fctaButton_NL"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Button (EN)" : "Footer CTA Knop (EN)"}</label>
              <Field name="page.footerCtaSection.fctaButton_EN" />
              <ErrorMessage
                name="page.footerCtaSection.fctaButton_EN"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Button (FR)" : "Footer CTA Knop (FR)"}</label>
              <Field name="page.footerCtaSection.fctaButton_FR" />
              <ErrorMessage
                name="page.footerCtaSection.fctaButton_FR"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Button (DE)" : "Footer CTA Knop (DE)"}</label>
              <Field name="page.footerCtaSection.fctaButton_DE" />
              <ErrorMessage
                name="page.footerCtaSection.fctaButton_DE"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Button (ES)" : "Footer CTA Knop (ES)"}</label>
              <Field name="page.footerCtaSection.fctaButton_ES" />
              <ErrorMessage
                name="page.footerCtaSection.fctaButton_ES"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Image" : "Footer CTA Afbeelding"}</label>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  onDrop(
                    acceptedFiles,
                    setFieldValue,
                    "page.footerCtaSection.fctaImage.node.mediaItemUrl"
                  )
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className={"dropzone"}>
                    <input {...getInputProps()} />
                    <p style={{ margin: "0" }}>
                      {language === "en" ? "Drag 'n' drop an image here, or click to select one" : "Sleep een afbeelding hierheen of klik om er een te selecteren"}
                    </p>
                  </div>
                )}
              </Dropzone>
              {values.page.footerCtaSection.fctaImage?.node.mediaItemUrl && (
                <img
                  src={values.page.footerCtaSection.fctaImage.node.mediaItemUrl}
                  alt="Footer CTA"
                  style={{ width: "100px", height: "100px" }}
                />
              )}
              <ErrorMessage
                name="page.footerCtaSection.fctaImage.node.mediaItemUrl"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Mobile Image" : "Footer CTA Mobiele Afbeelding"}</label>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  onDrop(
                    acceptedFiles,
                    setFieldValue,
                    "page.footerCtaSection.ctaImageMobile.node.mediaItemUrl"
                  )
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className={"dropzone"}>
                    <input {...getInputProps()} />
                    <p style={{ margin: "0" }}>
                      {language === "en" ? "Drag 'n' drop an image here, or click to select one" : "Sleep een afbeelding hierheen of klik om er een te selecteren"}
                    </p>
                  </div>
                )}
              </Dropzone>
              {values.page.footerCtaSection.ctaImageMobile?.node
                .mediaItemUrl && (
                  <img
                    src={
                      values.page.footerCtaSection.ctaImageMobile.node
                        .mediaItemUrl
                    }
                    alt="Footer CTA Mobile"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
              <ErrorMessage
                name="page.footerCtaSection.ctaImageMobile.node.mediaItemUrl"
                component="div"
              />
            </div>
            <div>
              <label>{language === "en" ? "Footer CTA Signature Image" : "Footer CTA Handtekening Afbeelding"}</label>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  onDrop(
                    acceptedFiles,
                    setFieldValue,
                    "page.footerCtaSection.ctaSignatureImage.node.mediaItemUrl"
                  )
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps()} className={"dropzone"}>
                    <input {...getInputProps()} />
                    <p style={{ margin: "0" }}>
                      {language === "en" ? "Drag 'n' drop an image here, or click to select one" : "Sleep een afbeelding hierheen of klik om er een te selecteren"}
                    </p>
                  </div>
                )}
              </Dropzone>
              {values.page.footerCtaSection.ctaSignatureImage?.node
                .mediaItemUrl && (
                  <img
                    src={
                      values.page.footerCtaSection.ctaSignatureImage.node
                        .mediaItemUrl
                    }
                    alt="Footer CTA Signature"
                    style={{ width: "100px", height: "100px" }}
                  />
                )}
              <ErrorMessage
                name="page.footerCtaSection.ctaSignatureImage.node.mediaItemUrl"
                component="div"
              />
            </div>
          </div>

          <button type="submit" className="btn-submit">
            {isLoading ? "Submitting" : "Submit"}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default Home;
