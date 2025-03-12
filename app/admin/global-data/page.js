"use client";

import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Dropzone from "react-dropzone";
import * as Yup from "yup";
import { useRouter } from "next/navigation";
import { uploadImageAndGetUrl } from "@/app/lib/UploadImageGetUrl";

const GlobalData = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const [formData, setFormData] = useState(null);
  const [language, setLanguage] = useState(typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${baseURL}/globaldata?edit=true`);
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
    <div>
      <button
        style={{
          border: "none",
          background: "transparent",
          cursor: "pointer",
          display: "flex",
          fontWeight: "bold",
          color: "#D0AF53",
        }}
        onClick={() => router.push("/admin")}
      >
        {language === "en" ? "Back" : "Terug"}
      </button>
      <Formik
        initialValues={formData}
        onSubmit={async (values, { resetForm }) => {
          setIsLoading(true);
          try {
            const response = await fetch(`${baseURL}/globaldata`, {
              method: "POST",
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error("Error updating global data:", errorData);
              alert(
                `Error: ${errorData.message || "Failed to update global data"}`
              );
              return;
            }

            const responseData = await response.json();
            console.log("Global data updated successfully:", responseData);
            setIsLoading(false);
            alert("Global data updated successfully!");
            resetForm();
          } catch (error) {
            console.error("Submission error:", error);
            alert("An unexpected error occurred. Please try again.");
            setIsLoading(false);
          }
        }}
      >
        {({ setFieldValue, values }) => (
          <Form className="globaldata-form">
            <div className="form-group">
              <label htmlFor="header_logo">{language === "en" ? "Header Logo" : "Header Logo"}</label>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  onDrop(acceptedFiles, setFieldValue, "header_logo")
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p style={{ margin: "0" }}>
                      {language === "en" ? "Drag & drop a file here, or click to select a file" : "Sleep een bestand hierheen of klik om een bestand te selecteren"}
                    </p>
                  </div>
                )}
              </Dropzone>
              {values.header_logo && (
                <img
                  src={values.header_logo}
                  alt="Header Logo"
                  className="image-preview"
                  style={{ width: "80px" }}
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="footer_logo">{language === "en" ? "Footer Logo" : "Footer Logo"}</label>
              <Dropzone
                onDrop={(acceptedFiles) =>
                  onDrop(acceptedFiles, setFieldValue, "footer_logo")
                }
              >
                {({ getRootProps, getInputProps }) => (
                  <div {...getRootProps({ className: "dropzone" })}>
                    <input {...getInputProps()} />
                    <p style={{ margin: "0" }}>
                      {language === "en" ? "Drag & drop a file here, or click to select a file" : "Sleep een bestand hierheen of klik om een bestand te selecteren"}
                    </p>
                  </div>
                )}
              </Dropzone>
              {values.footer_logo && (
                <img
                  src={values.footer_logo}
                  alt="Footer Logo"
                  className="image-preview"
                  style={{ width: "80px" }}
                />
              )}
            </div>

            <div className="form-group">
              <label htmlFor="fb_url">{language === "en" ? "Facebook URL" : "Facebook URL"}</label>
              <Field
                id="fb_url"
                name="fb_url"
                className="form-control"
                placeholder={language === "en" ? "Enter Facebook URL" : "Voer Facebook URL in"}
              />
              <ErrorMessage name="fb_url" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="tiktok_url">{language === "en" ? "TikTok URL" : "TikTok URL"}</label>
              <Field
                id="tiktok_url"
                name="tiktok_url"
                className="form-control"
                placeholder={language === "en" ? "Enter TikTok URL" : "Voer TikTok URL in"}
              />
              <ErrorMessage
                name="tiktok_url"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="instagram_url">{language === "en" ? "Instagram URL" : "Instagram URL"}</label>
              <Field
                id="instagram_url"
                name="instagram_url"
                className="form-control"
                placeholder={language === "en" ? "Enter Instagram URL" : "Voer Instagram URL in"}
              />
              <ErrorMessage
                name="instagram_url"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address_NL">{language === "en" ? "Address (NL)" : "Adres (NL)"}</label>
              <Field
                id="address_NL"
                name="address_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter address (NL)" : "Voer adres (NL) in"}
              />
              <ErrorMessage name="address_NL" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="address_EN">{language === "en" ? "Address (EN)" : "Adres (EN)"}</label>
              <Field
                id="address_EN"
                name="address_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter address (EN)" : "Voer adres (EN) in"}
              />
              <ErrorMessage name="address_EN" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="address_FR">{language === "en" ? "Address (FR)" : "Adres (FR)"}</label>
              <Field
                id="address_FR"
                name="address_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter address (FR)" : "Voer adres (FR) in"}
              />
              <ErrorMessage name="address_FR" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="address_DE">{language === "en" ? "Address (DE)" : "Adres (DE)"}</label>
              <Field
                id="address_DE"
                name="address_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter address (DE)" : "Voer adres (DE) in"}
              />
              <ErrorMessage name="address_DE" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="address_ES">{language === "en" ? "Address (ES)" : "Adres (ES)"}</label>
              <Field
                id="address_ES"
                name="address_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter address (ES)" : "Voer adres (ES) in"}
              />
              <ErrorMessage name="address_ES" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="address_url">{language === "en" ? "Address URL" : "Adres URL"}</label>
              <Field
                id="address_url"
                name="address_url"
                className="form-control"
                placeholder={language === "en" ? "Enter address URL" : "Voer adres URL in"}
              />
              <ErrorMessage
                name="address_url"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone_number">{language === "en" ? "Phone Number" : "Telefoonnummer"}</label>
              <Field
                id="phone_number"
                name="phone_number"
                className="form-control"
                placeholder={language === "en" ? "Enter phone number" : "Voer telefoonnummer in"}
              />
              <ErrorMessage
                name="phone_number"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <Field
                id="email"
                name="email"
                className="form-control"
                placeholder="Enter email"
              />
              <ErrorMessage name="email" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="website_owner">{language === "en" ? "Website Owner" : "Website Eigenaar"}</label>
              <Field
                id="website_owner"
                name="website_owner"
                className="form-control"
                placeholder={language === "en" ? "Enter website owner" : "Voer website eigenaar in"}
              />
              <ErrorMessage
                name="website_owner"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="owner_website">{language === "en" ? "Owner Website" : "Eigenaar Website"}</label>
              <Field
                id="owner_website"
                name="owner_website"
                className="form-control"
                placeholder={language === "en" ? "Enter owner website" : "Voer eigenaar website in"}
              />
              <ErrorMessage
                name="owner_website"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_image">{language === "en" ? "Auto CTA Image" : "Auto CTA Afbeelding"}</label>
              <Field
                type="checkbox"
                id="auto_cta_image"
                name="auto_cta_image"
                className="form-control"
              />
              <ErrorMessage
                name="auto_cta_image"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_image_mobile">{language === "en" ? "Auto CTA Image Mobile" : "Auto CTA Mobiele Afbeelding"}</label>
              <Field
                type="checkbox"
                id="auto_cta_image_mobile"
                name="auto_cta_image_mobile"
                className="form-control"
              />
              <ErrorMessage
                name="auto_cta_image_mobile"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_signature_image">{language === "en" ? "Auto Signature Image" : "Auto Handtekening Afbeelding"}</label>
              <Field
                id="auto_signature_image"
                name="auto_signature_image"
                className="form-control"
                placeholder={language === "en" ? "Enter auto signature image URL" : "Voer auto handtekening afbeelding URL in"}
              />
              <ErrorMessage
                name="auto_signature_image"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo_text_NL">{language === "en" ? "Logo Text (NL)" : "Logo Tekst (NL)"}</label>
              <Field
                id="logo_text_NL"
                name="logo_text_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter logo text (NL)" : "Voer logo tekst (NL) in"}
              />
              <ErrorMessage
                name="logo_text_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo_text_EN">{language === "en" ? "Logo Text (EN)" : "Logo Tekst (EN)"}</label>
              <Field
                id="logo_text_EN"
                name="logo_text_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter logo text (EN)" : "Voer logo tekst (EN) in"}
              />
              <ErrorMessage
                name="logo_text_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo_text_FR">{language === "en" ? "Logo Text (FR)" : "Logo Tekst (FR)"}</label>
              <Field
                id="logo_text_FR"
                name="logo_text_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter logo text (FR)" : "Voer logo tekst (FR) in"}
              />
              <ErrorMessage
                name="logo_text_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo_text_DE">{language === "en" ? "Logo Text (DE)" : "Logo Tekst (DE)"}</label>
              <Field
                id="logo_text_DE"
                name="logo_text_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter logo text (DE)" : "Voer logo tekst (DE) in"}
              />
              <ErrorMessage
                name="logo_text_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="logo_text_ES">{language === "en" ? "Logo Text (ES)" : "Logo Tekst (ES)"}</label>
              <Field
                id="logo_text_ES"
                name="logo_text_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter logo text (ES)" : "Voer logo tekst (ES) in"}
              />
              <ErrorMessage
                name="logo_text_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="copyright_text_NL">{language === "en" ? "Copyright Text (NL)" : "Copyright Tekst (NL)"}</label>
              <Field
                id="copyright_text_NL"
                name="copyright_text_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter copyright text (NL)" : "Voer copyright tekst (NL) in"}
              />
              <ErrorMessage
                name="copyright_text_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="copyright_text_EN">{language === "en" ? "Copyright Text (EN)" : "Copyright Tekst (EN)"}</label>
              <Field
                id="copyright_text_EN"
                name="copyright_text_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter copyright text (EN)" : "Voer copyright tekst (EN) in"}
              />
              <ErrorMessage
                name="copyright_text_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="copyright_text_FR">{language === "en" ? "Copyright Text (FR)" : "Copyright Tekst (FR)"}</label>
              <Field
                id="copyright_text_FR"
                name="copyright_text_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter copyright text (FR)" : "Voer copyright tekst (FR) in"}
              />
              <ErrorMessage
                name="copyright_text_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="copyright_text_DE">{language === "en" ? "Copyright Text (DE)" : "Copyright Tekst (DE)"}</label>
              <Field
                id="copyright_text_DE"
                name="copyright_text_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter copyright text (DE)" : "Voer copyright tekst (DE) in"}
              />
              <ErrorMessage
                name="copyright_text_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="copyright_text_ES">{language === "en" ? "Copyright Text (ES)" : "Copyright Tekst (ES)"}</label>
              <Field
                id="copyright_text_ES"
                name="copyright_text_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter copyright text (ES)" : "Voer copyright tekst (ES) in"}
              />
              <ErrorMessage
                name="copyright_text_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website_owner_text_NL">{language === "en" ? "Website Owner Text (NL)" : "Website Eigenaar Tekst (NL)"}</label>
              <Field
                id="website_owner_text_NL"
                name="website_owner_text_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter website owner text (NL)" : "Voer website eigenaar tekst (NL) in"}
              />
              <ErrorMessage
                name="website_owner_text_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website_owner_text_EN">{language === "en" ? "Website Owner Text (EN)" : "Website Eigenaar Tekst (EN)"}</label>
              <Field
                id="website_owner_text_EN"
                name="website_owner_text_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter website owner text (EN)" : "Voer website eigenaar tekst (EN) in"}
              />
              <ErrorMessage
                name="website_owner_text_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website_owner_text_FR">{language === "en" ? "Website Owner Text (FR)" : "Website Eigenaar Tekst (FR)"}</label>
              <Field
                id="website_owner_text_FR"
                name="website_owner_text_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter website owner text (FR)" : "Voer website eigenaar tekst (FR) in"}
              />
              <ErrorMessage
                name="website_owner_text_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website_owner_text_DE">{language === "en" ? "Website Owner Text (DE)" : "Website Eigenaar Tekst (DE)"}</label>
              <Field
                id="website_owner_text_DE"
                name="website_owner_text_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter website owner text (DE)" : "Voer website eigenaar tekst (DE) in"}
              />
              <ErrorMessage
                name="website_owner_text_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="website_owner_text_ES">{language === "en" ? "Website Owner Text (ES)" : "Website Eigenaar Tekst (ES)"}</label>
              <Field
                id="website_owner_text_ES"
                name="website_owner_text_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter website owner text (ES)" : "Voer website eigenaar tekst (ES) in"}
              />
              <ErrorMessage
                name="website_owner_text_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="menu_heading_NL">{language === "en" ? "Menu Heading (NL)" : "Menu Hoofding (NL)"}</label>
              <Field
                id="menu_heading_NL"
                name="menu_heading_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter menu heading (NL)" : "Voer menu hoofding (NL) in"}
              />
              <ErrorMessage
                name="menu_heading_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="menu_heading_EN">{language === "en" ? "Menu Heading (EN)" : "Menu Hoofding (EN)"}</label>
              <Field
                id="menu_heading_EN"
                name="menu_heading_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter menu heading (EN)" : "Voer menu hoofding (EN) in"}
              />
              <ErrorMessage
                name="menu_heading_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="menu_heading_FR">{language === "en" ? "Menu Heading (FR)" : "Menu Hoofding (FR)"}</label>
              <Field
                id="menu_heading_FR"
                name="menu_heading_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter menu heading (FR)" : "Voer menu hoofding (FR) in"}
              />
              <ErrorMessage
                name="menu_heading_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="menu_heading_DE">{language === "en" ? "Menu Heading (DE)" : "Menu Hoofding (DE)"}</label>
              <Field
                id="menu_heading_DE"
                name="menu_heading_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter menu heading (DE)" : "Voer menu hoofding (DE) in"}
              />
              <ErrorMessage
                name="menu_heading_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="menu_heading_ES">{language === "en" ? "Menu Heading (ES)" : "Menu Hoofding (ES)"}</label>
              <Field
                id="menu_heading_ES"
                name="menu_heading_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter menu heading (ES)" : "Voer menu hoofding (ES) in"}
              />
              <ErrorMessage
                name="menu_heading_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address_heading_NL">{language === "en" ? "Address Heading (NL)" : "Adres Hoofding (NL)"}</label>
              <Field
                id="address_heading_NL"
                name="address_heading_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter address heading (NL)" : "Voer adres hoofding (NL) in"}
              />
              <ErrorMessage
                name="address_heading_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address_heading_EN">{language === "en" ? "Address Heading (EN)" : "Adres Hoofding (EN)"}</label>
              <Field
                id="address_heading_EN"
                name="address_heading_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter address heading (EN)" : "Voer adres hoofding (EN) in"}
              />
              <ErrorMessage
                name="address_heading_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address_heading_FR">{language === "en" ? "Address Heading (FR)" : "Adres Hoofding (FR)"}</label>
              <Field
                id="address_heading_FR"
                name="address_heading_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter address heading (FR)" : "Voer adres hoofding (FR) in"}
              />
              <ErrorMessage
                name="address_heading_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address_heading_DE">{language === "en" ? "Address Heading (DE)" : "Adres Hoofding (DE)"}</label>
              <Field
                id="address_heading_DE"
                name="address_heading_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter address heading (DE)" : "Voer adres hoofding (DE) in"}
              />
              <ErrorMessage
                name="address_heading_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="address_heading_ES">{language === "en" ? "Address Heading (ES)" : "Adres Hoofding (ES)"}</label>
              <Field
                id="address_heading_ES"
                name="address_heading_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter address heading (ES)" : "Voer adres hoofding (ES) in"}
              />
              <ErrorMessage
                name="address_heading_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opening_hour_heading_NL">{language === "en" ? "Opening Hour Heading (NL)" : "Opening Hour Hoofding (NL)"}</label>
              <Field
                id="opening_hour_heading_NL"
                name="opening_hour_heading_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter opening hour heading (NL)" : "Voer opening hour hoofding (NL) in"}
              />
              <ErrorMessage
                name="opening_hour_heading_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opening_hour_heading_EN">{language === "en" ? "Opening Hour Heading (EN)" : "Opening Hour Hoofding (EN)"}</label>
              <Field
                id="opening_hour_heading_EN"
                name="opening_hour_heading_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter opening hour heading (EN)" : "Voer opening hour hoofding (EN) in"}
              />
              <ErrorMessage
                name="opening_hour_heading_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opening_hour_heading_FR">{language === "en" ? "Opening Hour Heading (FR)" : "Opening Hour Hoofding (FR)"}</label>
              <Field
                id="opening_hour_heading_FR"
                name="opening_hour_heading_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter opening hour heading (FR)" : "Voer opening hour hoofding (FR) in"}
              />
              <ErrorMessage
                name="opening_hour_heading_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opening_hour_heading_DE">{language === "en" ? "Opening Hour Heading (DE)" : "Opening Hour Hoofding (DE)"}</label>
              <Field
                id="opening_hour_heading_DE"
                name="opening_hour_heading_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter opening hour heading (DE)" : "Voer opening hour hoofding (DE) in"}
              />
              <ErrorMessage
                name="opening_hour_heading_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opening_hour_heading_ES">{language === "en" ? "Opening Hour Heading (ES)" : "Opening Hour Hoofding (ES)"}</label>
              <Field
                id="opening_hour_heading_ES"
                name="opening_hour_heading_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter opening hour heading (ES)" : "Voer opening hour hoofding (ES) in"}
              />
              <ErrorMessage
                name="opening_hour_heading_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opening_hours_text_NL">{language === "en" ? "Opening Hours Text (NL)" : "Opening Hours Tekst (NL)"}</label>
              <Field
                id="opening_hours_text_NL"
                name="opening_hours_text_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter opening hours text (NL)" : "Voer opening hours tekst (NL) in"}
              />
              <ErrorMessage
                name="opening_hours_text_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opening_hours_text_EN">{language === "en" ? "Opening Hours Text (EN)" : "Opening Hours Tekst (EN)"}</label>
              <Field
                id="opening_hours_text_EN"
                name="opening_hours_text_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter opening hours text (EN)" : "Voer opening hours tekst (EN) in"}
              />
              <ErrorMessage
                name="opening_hours_text_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opening_hours_text_FR">{language === "en" ? "Opening Hours Text (FR)" : "Opening Hours Tekst (FR)"}</label>
              <Field
                id="opening_hours_text_FR"
                name="opening_hours_text_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter opening hours text (FR)" : "Voer opening hours tekst (FR) in"}
              />
              <ErrorMessage
                name="opening_hours_text_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opening_hours_text_DE">{language === "en" ? "Opening Hours Text (DE)" : "Opening Hours Tekst (DE)"}</label>
              <Field
                id="opening_hours_text_DE"
                name="opening_hours_text_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter opening hours text (DE)" : "Voer opening hours tekst (DE) in"}
              />
              <ErrorMessage
                name="opening_hours_text_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="opening_hours_text_ES">{language === "en" ? "Opening Hours Text (ES)" : "Opening Hours Tekst (ES)"}</label>
              <Field
                id="opening_hours_text_ES"
                name="opening_hours_text_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter opening hours text (ES)" : "Voer opening hours tekst (ES) in"}
              />
              <ErrorMessage
                name="opening_hours_text_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slider_prev_text_NL">{language === "en" ? "Slider Previous Text (NL)" : "Slider Vorige Tekst (NL)"}</label>
              <Field
                id="slider_prev_text_NL"
                name="slider_prev_text_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter slider previous text (NL)" : "Voer slider vorige tekst (NL) in"}
              />
              <ErrorMessage
                name="slider_prev_text_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slider_prev_text_EN">{language === "en" ? "Slider Previous Text (EN)" : "Slider Vorige Tekst (EN)"}</label>
              <Field
                id="slider_prev_text_EN"
                name="slider_prev_text_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter slider previous text (EN)" : "Voer slider vorige tekst (EN) in"}
              />
              <ErrorMessage
                name="slider_prev_text_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slider_prev_text_FR">{language === "en" ? "Slider Previous Text (FR)" : "Slider Vorige Tekst (FR)"}</label>
              <Field
                id="slider_prev_text_FR"
                name="slider_prev_text_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter slider previous text (FR)" : "Voer slider vorige tekst (FR) in"}
              />
              <ErrorMessage
                name="slider_prev_text_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slider_prev_text_DE">{language === "en" ? "Slider Previous Text (DE)" : "Slider Vorige Tekst (DE)"}</label>
              <Field
                id="slider_prev_text_DE"
                name="slider_prev_text_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter slider previous text (DE)" : "Voer slider vorige tekst (DE) in"}
              />
              <ErrorMessage
                name="slider_prev_text_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slider_prev_text_ES">{language === "en" ? "Slider Previous Text (ES)" : "Slider Vorige Tekst (ES)"}</label>
              <Field
                id="slider_prev_text_ES"
                name="slider_prev_text_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter slider previous text (ES)" : "Voer slider vorige tekst (ES) in"}
              />
              <ErrorMessage
                name="slider_prev_text_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slider_next_text_NL">{language === "en" ? "Slider Next Text (NL)" : "Slider Volgende Tekst (NL)"}</label>
              <Field
                id="slider_next_text_NL"
                name="slider_next_text_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter slider next text (NL)" : "Voer slider volgende tekst (NL) in"}
              />
              <ErrorMessage
                name="slider_next_text_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slider_next_text_EN">{language === "en" ? "Slider Next Text (EN)" : "Slider Volgende Tekst (EN)"}</label>
              <Field
                id="slider_next_text_EN"
                name="slider_next_text_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter slider next text (EN)" : "Voer slider volgende tekst (EN) in"}
              />
              <ErrorMessage
                name="slider_next_text_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slider_next_text_FR">{language === "en" ? "Slider Next Text (FR)" : "Slider Volgende Tekst (FR)"}</label>
              <Field
                id="slider_next_text_FR"
                name="slider_next_text_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter slider next text (FR)" : "Voer slider volgende tekst (FR) in"}
              />
              <ErrorMessage
                name="slider_next_text_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slider_next_text_DE">{language === "en" ? "Slider Next Text (DE)" : "Slider Volgende Tekst (DE)"}</label>
              <Field
                id="slider_next_text_DE"
                name="slider_next_text_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter slider next text (DE)" : "Voer slider volgende tekst (DE) in"}
              />
              <ErrorMessage
                name="slider_next_text_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="slider_next_text_ES">{language === "en" ? "Slider Next Text (ES)" : "Slider Volgende Tekst (ES)"}</label>
              <Field
                id="slider_next_text_ES"
                name="slider_next_text_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter slider next text (ES)" : "Voer slider volgende tekst (ES) in"}
              />
              <ErrorMessage
                name="slider_next_text_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_heading_NL">{language === "en" ? "Auto CTA Heading (NL)" : "Auto CTA Hoofding (NL)"}</label>
              <Field
                id="auto_cta_heading_NL"
                name="auto_cta_heading_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA heading (NL)" : "Voer auto CTA hoofding (NL) in"}
              />
              <ErrorMessage
                name="auto_cta_heading_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_heading_EN">{language === "en" ? "Auto CTA Heading (EN)" : "Auto CTA Hoofding (EN)"}</label>
              <Field
                id="auto_cta_heading_EN"
                name="auto_cta_heading_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA heading (EN)" : "Voer auto CTA hoofding (EN) in"}
              />
              <ErrorMessage
                name="auto_cta_heading_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_heading_FR">{language === "en" ? "Auto CTA Heading (FR)" : "Auto CTA Hoofding (FR)"}</label>
              <Field
                id="auto_cta_heading_FR"
                name="auto_cta_heading_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA heading (FR)" : "Voer auto CTA hoofding (FR) in"}
              />
              <ErrorMessage
                name="auto_cta_heading_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_heading_DE">{language === "en" ? "Auto CTA Heading (DE)" : "Auto CTA Hoofding (DE)"}</label>
              <Field
                id="auto_cta_heading_DE"
                name="auto_cta_heading_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA heading (DE)" : "Voer auto CTA hoofding (DE) in"}
              />
              <ErrorMessage
                name="auto_cta_heading_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_heading_ES">{language === "en" ? "Auto CTA Heading (ES)" : "Auto CTA Hoofding (ES)"}</label>
              <Field
                id="auto_cta_heading_ES"
                name="auto_cta_heading_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA heading (ES)" : "Voer auto CTA hoofding (ES) in"}
              />
              <ErrorMessage
                name="auto_cta_heading_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_text_NL">{language === "en" ? "Auto CTA Text (NL)" : "Auto CTA Tekst (NL)"}</label>
              <Field
                id="auto_cta_text_NL"
                name="auto_cta_text_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA text (NL)" : "Voer auto CTA tekst (NL) in"}
              />
              <ErrorMessage
                name="auto_cta_text_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_text_EN">{language === "en" ? "Auto CTA Text (EN)" : "Auto CTA Tekst (EN)"}</label>
              <Field
                id="auto_cta_text_EN"
                name="auto_cta_text_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA text (EN)" : "Voer auto CTA tekst (EN) in"}
              />
              <ErrorMessage
                name="auto_cta_text_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_text_FR">{language === "en" ? "Auto CTA Text (FR)" : "Auto CTA Tekst (FR)"}</label>
              <Field
                id="auto_cta_text_FR"
                name="auto_cta_text_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA text (FR)" : "Voer auto CTA tekst (FR) in"}
              />
              <ErrorMessage
                name="auto_cta_text_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_text_DE">{language === "en" ? "Auto CTA Text (DE)" : "Auto CTA Tekst (DE)"}</label>
              <Field
                id="auto_cta_text_DE"
                name="auto_cta_text_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA text (DE)" : "Voer auto CTA tekst (DE) in"}
              />
              <ErrorMessage
                name="auto_cta_text_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_text_ES">{language === "en" ? "Auto CTA Text (ES)" : "Auto CTA Tekst (ES)"}</label>
              <Field
                id="auto_cta_text_ES"
                name="auto_cta_text_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA text (ES)" : "Voer auto CTA tekst (ES) in"}
              />
              <ErrorMessage
                name="auto_cta_text_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_button1_NL">{language === "en" ? "Auto CTA Button 1 (NL)" : "Auto CTA Knop 1 (NL)"}</label>
              <Field
                id="auto_cta_button1_NL"
                name="auto_cta_button1_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA button 1 text (NL)" : "Voer auto CTA knop 1 tekst (NL) in"}
              />
              <ErrorMessage
                name="auto_cta_button1_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_button1_EN">{language === "en" ? "Auto CTA Button 1 (EN)" : "Auto CTA Knop 1 (EN)"}</label>
              <Field
                id="auto_cta_button1_EN"
                name="auto_cta_button1_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA button 1 text (EN)" : "Voer auto CTA knop 1 tekst (EN) in"}
              />
              <ErrorMessage
                name="auto_cta_button1_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_button1_FR">{language === "en" ? "Auto CTA Button 1 (FR)" : "Auto CTA Knop 1 (FR)"}</label>
              <Field
                id="auto_cta_button1_FR"
                name="auto_cta_button1_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA button 1 text (FR)" : "Voer auto CTA knop 1 tekst (FR) in"}
              />
              <ErrorMessage
                name="auto_cta_button1_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_button1_DE">{language === "en" ? "Auto CTA Button 1 (DE)" : "Auto CTA Knop 1 (DE)"}</label>
              <Field
                id="auto_cta_button1_DE"
                name="auto_cta_button1_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA button 1 text (DE)" : "Voer auto CTA knop 1 tekst (DE) in"}
              />
              <ErrorMessage
                name="auto_cta_button1_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_button1_ES">{language === "en" ? "Auto CTA Button 1 (ES)" : "Auto CTA Knop 1 (ES)"}</label>
              <Field
                id="auto_cta_button1_ES"
                name="auto_cta_button1_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA button 1 text (ES)" : "Voer auto CTA knop 1 tekst (ES) in"}
              />
              <ErrorMessage
                name="auto_cta_button1_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_button2_NL">{language === "en" ? "Auto CTA Button 2 (NL)" : "Auto CTA Knop 2 (NL)"}</label>
              <Field
                id="auto_cta_button2_NL"
                name="auto_cta_button2_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA button 2 text (NL)" : "Voer auto CTA knop 2 tekst (NL) in"}
              />
              <ErrorMessage
                name="auto_cta_button2_NL"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_button2_EN">{language === "en" ? "Auto CTA Button 2 (EN)" : "Auto CTA Knop 2 (EN)"}</label>
              <Field
                id="auto_cta_button2_EN"
                name="auto_cta_button2_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA button 2 text (EN)" : "Voer auto CTA knop 2 tekst (EN) in"}
              />
              <ErrorMessage
                name="auto_cta_button2_EN"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_button2_FR">{language === "en" ? "Auto CTA Button 2 (FR)" : "Auto CTA Knop 2 (FR)"}</label>
              <Field
                id="auto_cta_button2_FR"
                name="auto_cta_button2_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA button 2 text (FR)" : "Voer auto CTA knop 2 tekst (FR) in"}
              />
              <ErrorMessage
                name="auto_cta_button2_FR"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_button2_DE">{language === "en" ? "Auto CTA Button 2 (DE)" : "Auto CTA Knop 2 (DE)"}</label>
              <Field
                id="auto_cta_button2_DE"
                name="auto_cta_button2_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA button 2 text (DE)" : "Voer auto CTA knop 2 tekst (DE) in"}
              />
              <ErrorMessage
                name="auto_cta_button2_DE"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="auto_cta_button2_ES">{language === "en" ? "Auto CTA Button 2 (ES)" : "Auto CTA Knop 2 (ES)"}</label>
              <Field
                id="auto_cta_button2_ES"
                name="auto_cta_button2_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter auto CTA button 2 text (ES)" : "Voer auto CTA knop 2 tekst (ES) in"}
              />
              <ErrorMessage
                name="auto_cta_button2_ES"
                component="div"
                className="error"
              />
            </div>

            <button type="submit" className="btn-submit">
                        {isLoading ? "Submitting" : "Submit"}
                    </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default GlobalData;
