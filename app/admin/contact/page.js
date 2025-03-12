"use client";
import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import axios from 'axios';
import Dropzone from "react-dropzone";
import { uploadImageAndGetUrl } from "@/app/lib/UploadImageGetUrl";

const Contact = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [formData, setFormData] = useState(null);
    const [language, setLanguage] = useState(typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/contactpage?edit=true`);
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

    const handleSubmit = async (values) => {
        const transformedData = transformData(values);
        console.log('Transformed Data', transformedData);
        setIsLoading(true);
        try {
            const response = await fetch(`${baseURL}/contactpage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transformedData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit form');
            }

            const result = await response.json();
            console.log('Form submission successful:', result);
            setIsLoading(true);
            alert("Data submitted successfully");
        } catch (error) {
            console.error('Form submission error:', error);
            alert("Error submitting data" );
            setIsLoading(true);
        }
    };

    const handleImageUpload = async (acceptedFiles, setFieldValue, fieldName) => {
        try {
            const urls = await uploadImageAndGetUrl(acceptedFiles[0]);
            setFieldValue(fieldName, urls[0]);
        } catch (error) {
            console.error("Error uploading image:", error.message);
        }
    };

    const ImageDropzone = ({ setFieldValue, fieldName }) => (
        <Dropzone
            onDrop={(acceptedFiles) => handleImageUpload(acceptedFiles, setFieldValue, fieldName)}
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
    );

    if (!formData) {
        return <div>Loading...</div>;
    }

    return (
        <Formik
            initialValues={formData}
            // validationSchema={validationSchema}
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values }) => (
                <Form>
                    {/* Contact Hero Section */}
                    <div>
                        <h2>{language === "en" ? "Contact Hero Section" : "Contact Hero Sectie"}</h2>
                        {formData.page.contactHeroSection.bannerHeading.map((_, index) => (
                            <div key={index}>
                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (NL)` : `Banner Kopregel ${index + 1} (NL)`}</label>
                                <Field name={`page.contactHeroSection.bannerHeading[${index}].line_NL`} />
                                <ErrorMessage name={`page.contactHeroSection.bannerHeading[${index}].line_NL`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (EN)` : `Banner Kopregel ${index + 1} (EN)`}</label>
                                <Field name={`page.contactHeroSection.bannerHeading[${index}].line_EN`} />
                                <ErrorMessage name={`page.contactHeroSection.bannerHeading[${index}].line_EN`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (FR)` : `Banner Kopregel ${index + 1} (FR)`}</label>
                                <Field name={`page.contactHeroSection.bannerHeading[${index}].line_FR`} />
                                <ErrorMessage name={`page.contactHeroSection.bannerHeading[${index}].line_FR`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (DE)` : `Banner Kopregel ${index + 1} (DE)`}</label>
                                <Field name={`page.contactHeroSection.bannerHeading[${index}].line_DE`} />
                                <ErrorMessage name={`page.contactHeroSection.bannerHeading[${index}].line_DE`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (ES)` : `Banner Kopregel ${index + 1} (ES)`}</label>
                                <Field name={`page.contactHeroSection.bannerHeading[${index}].line_ES`} />
                                <ErrorMessage name={`page.contactHeroSection.bannerHeading[${index}].line_ES`} component="div" />
                            </div>
                        ))}
                        <div>
                            <label>{language === "en" ? "Banner Text (NL)" : "Banner Tekst (NL)"}</label>
                            <Field name="page.contactHeroSection.bannertext_NL" as="textarea" />
                            <ErrorMessage name="page.contactHeroSection.bannertext_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (EN)" : "Banner Tekst (EN)"}</label>
                            <Field name="page.contactHeroSection.bannertext_EN" as="textarea" />
                            <ErrorMessage name="page.contactHeroSection.bannertext_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (FR)" : "Banner Tekst (FR)"}</label>
                            <Field name="page.contactHeroSection.bannertext_FR" as="textarea" />
                            <ErrorMessage name="page.contactHeroSection.bannertext_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (DE)" : "Banner Tekst (DE)"}</label>
                            <Field name="page.contactHeroSection.bannertext_DE" as="textarea" />
                            <ErrorMessage name="page.contactHeroSection.bannertext_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (ES)" : "Banner Tekst (ES)"}</label>
                            <Field name="page.contactHeroSection.bannertext_ES" as="textarea" />
                            <ErrorMessage name="page.contactHeroSection.bannertext_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Background Image" : "Banner Achtergrondafbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.contactHeroSection.bannerBgImage.node.mediaItemUrl" />
                            {values.page.contactHeroSection.bannerBgImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.contactHeroSection.bannerBgImage.node.mediaItemUrl}
                                    alt="Banner Background"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.contactHeroSection.bannerBgImage.node.mediaItemUrl" component="div" />
                        </div>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h2>{language === "en" ? "Contact Section" : "Contact Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Contact SubHeading (NL)" : "Contact Subkop (NL)"}</label>
                            <Field name="page.contactSection.contactSubHeading_NL" />
                            <ErrorMessage name="page.contactSection.contactSubHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact SubHeading (EN)" : "Contact Subkop (EN)"}</label>
                            <Field name="page.contactSection.contactSubHeading_EN" />
                            <ErrorMessage name="page.contactSection.contactSubHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact SubHeading (FR)" : "Contact Subkop (FR)"}</label>
                            <Field name="page.contactSection.contactSubHeading_FR" />
                            <ErrorMessage name="page.contactSection.contactSubHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact SubHeading (DE)" : "Contact Subkop (DE)"}</label>
                            <Field name="page.contactSection.contactSubHeading_DE" />
                            <ErrorMessage name="page.contactSection.contactSubHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact SubHeading (ES)" : "Contact Subkop (ES)"}</label>
                            <Field name="page.contactSection.contactSubHeading_ES" />
                            <ErrorMessage name="page.contactSection.contactSubHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Heading (NL)" : "Contact Kop (NL)"}</label>
                            <Field name="page.contactSection.contactHeading_NL" />
                            <ErrorMessage name="page.contactSection.contactHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Heading (EN)" : "Contact Kop (EN)"}</label>
                            <Field name="page.contactSection.contactHeading_EN" />
                            <ErrorMessage name="page.contactSection.contactHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Heading (FR)" : "Contact Kop (FR)"}</label>
                            <Field name="page.contactSection.contactHeading_FR" />
                            <ErrorMessage name="page.contactSection.contactHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Heading (DE)" : "Contact Kop (DE)"}</label>
                            <Field name="page.contactSection.contactHeading_DE" />
                            <ErrorMessage name="page.contactSection.contactHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Heading (ES)" : "Contact Kop (ES)"}</label>
                            <Field name="page.contactSection.contactHeading_ES" />
                            <ErrorMessage name="page.contactSection.contactHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Details Heading (NL)" : "Details Kop (NL)"}</label>
                            <Field name="page.contactSection.detailsHeading_NL" />
                            <ErrorMessage name="page.contactSection.detailsHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Details Heading (EN)" : "Details Kop (EN)"}</label>
                            <Field name="page.contactSection.detailsHeading_EN" />
                            <ErrorMessage name="page.contactSection.detailsHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Details Heading (FR)" : "Details Kop (FR)"}</label>
                            <Field name="page.contactSection.detailsHeading_FR" />
                            <ErrorMessage name="page.contactSection.detailsHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Details Heading (DE)" : "Details Kop (DE)"}</label>
                            <Field name="page.contactSection.detailsHeading_DE" />
                            <ErrorMessage name="page.contactSection.detailsHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Details Heading (ES)" : "Details Kop (ES)"}</label>
                            <Field name="page.contactSection.detailsHeading_ES" />
                            <ErrorMessage name="page.contactSection.detailsHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Address (NL)" : "Adres (NL)"}</label>
                            <Field name="page.contactSection.address_NL" />
                            <ErrorMessage name="page.contactSection.address_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Address (EN)" : "Adres (EN)"}</label>
                            <Field name="page.contactSection.address_EN" />
                            <ErrorMessage name="page.contactSection.address_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Address (FR)" : "Adres (FR)"}</label>
                            <Field name="page.contactSection.address_FR" />
                            <ErrorMessage name="page.contactSection.address_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Address (DE)" : "Adres (DE)"}</label>
                            <Field name="page.contactSection.address_DE" />
                            <ErrorMessage name="page.contactSection.address_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Address (ES)" : "Adres (ES)"}</label>
                            <Field name="page.contactSection.address_ES" />
                            <ErrorMessage name="page.contactSection.address_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "KvK Number Title (NL)" : "KvK Nummer Titel (NL)"}</label>
                            <Field name="page.contactSection.kvkNumberTitle_NL" />
                            <ErrorMessage name="page.contactSection.kvkNumberTitle_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "KvK Number Title (EN)" : "KvK Nummer Titel (EN)"}</label>
                            <Field name="page.contactSection.kvkNumberTitle_EN" />
                            <ErrorMessage name="page.contactSection.kvkNumberTitle_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "KvK Number Title (FR)" : "KvK Nummer Titel (FR)"}</label>
                            <Field name="page.contactSection.kvkNumberTitle_FR" />
                            <ErrorMessage name="page.contactSection.kvkNumberTitle_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "KvK Number Title (DE)" : "KvK Nummer Titel (DE)"}</label>
                            <Field name="page.contactSection.kvkNumberTitle_DE" />
                            <ErrorMessage name="page.contactSection.kvkNumberTitle_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "KvK Number Title (ES)" : "KvK Nummer Titel (ES)"}</label>
                            <Field name="page.contactSection.kvkNumberTitle_ES" />
                            <ErrorMessage name="page.contactSection.kvkNumberTitle_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "KvK Number" : "KvK Nummer"}</label>
                            <Field name="page.contactSection.kvkNumber" />
                            <ErrorMessage name="page.contactSection.kvkNumber" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Phone Number" : "Telefoonnummer"}</label>
                            <Field name="page.contactSection.phoneNumber" />
                            <ErrorMessage name="page.contactSection.phoneNumber" component="div" />
                        </div>
                        <div>
                            <label>Email</label>
                            <Field name="page.contactSection.email" />
                            <ErrorMessage name="page.contactSection.email" component="div" />
                        </div>
                    </div>

                    {/* Contact Us Form Section */}
                    <div>
                        <h2>{language === "en" ? "Contact Us Form Section" : "Contactformulier Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Contact Form Tab (NL)" : "Contactformulier Tab (NL)"}</label>
                            <Field name="page.contactUsFormSection.contactFormTab_NL" />
                            <ErrorMessage name="page.contactUsFormSection.contactFormTab_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Form Tab (EN)" : "Contactformulier Tab (EN)"}</label>
                            <Field name="page.contactUsFormSection.contactFormTab_EN" />
                            <ErrorMessage name="page.contactUsFormSection.contactFormTab_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Form Tab (FR)" : "Contactformulier Tab (FR)"}</label>
                            <Field name="page.contactUsFormSection.contactFormTab_FR" />
                            <ErrorMessage name="page.contactUsFormSection.contactFormTab_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Form Tab (DE)" : "Contactformulier Tab (DE)"}</label>
                            <Field name="page.contactUsFormSection.contactFormTab_DE" />
                            <ErrorMessage name="page.contactUsFormSection.contactFormTab_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Form Tab (ES)" : "Contactformulier Tab (ES)"}</label>
                            <Field name="page.contactUsFormSection.contactFormTab_ES" />
                            <ErrorMessage name="page.contactUsFormSection.contactFormTab_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Name Label (NL)" : "Contact Naam Label (NL)"}</label>
                            <Field name="page.contactUsFormSection.contactnamelabel_NL" />
                            <ErrorMessage name="page.contactUsFormSection.contactnamelabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Name Label (EN)" : "Contact Naam Label (EN)"}</label>
                            <Field name="page.contactUsFormSection.contactnamelabel_EN" />
                            <ErrorMessage name="page.contactUsFormSection.contactnamelabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Name Label (FR)" : "Contact Naam Label (FR)"}</label>
                            <Field name="page.contactUsFormSection.contactnamelabel_FR" />
                            <ErrorMessage name="page.contactUsFormSection.contactnamelabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Name Label (DE)" : "Contact Naam Label (DE)"}</label>
                            <Field name="page.contactUsFormSection.contactnamelabel_DE" />
                            <ErrorMessage name="page.contactUsFormSection.contactnamelabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Name Label (ES)" : "Contact Naam Label (ES)"}</label>
                            <Field name="page.contactUsFormSection.contactnamelabel_ES" />
                            <ErrorMessage name="page.contactUsFormSection.contactnamelabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Email Label (NL)" : "Contact Email Label (NL)"}</label>
                            <Field name="page.contactUsFormSection.contactEmailLabel_NL" />
                            <ErrorMessage name="page.contactUsFormSection.contactEmailLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Email Label (EN)" : "Contact Email Label (EN)"}</label>
                            <Field name="page.contactUsFormSection.contactEmailLabel_EN" />
                            <ErrorMessage name="page.contactUsFormSection.contactEmailLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Email Label (FR)" : "Contact Email Label (FR)"}</label>
                            <Field name="page.contactUsFormSection.contactEmailLabel_FR" />
                            <ErrorMessage name="page.contactUsFormSection.contactEmailLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Email Label (DE)" : "Contact Email Label (DE)"}</label>
                            <Field name="page.contactUsFormSection.contactEmailLabel_DE" />
                            <ErrorMessage name="page.contactUsFormSection.contactEmailLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Email Label (ES)" : "Contact Email Label (ES)"}</label>
                            <Field name="page.contactUsFormSection.contactEmailLabel_ES" />
                            <ErrorMessage name="page.contactUsFormSection.contactEmailLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Phone Number Label (NL)" : "Contact Telefoonnummer Label (NL)"}</label>
                            <Field name="page.contactUsFormSection.contactPhoneNumberLabel_NL" />
                            <ErrorMessage name="page.contactUsFormSection.contactPhoneNumberLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Phone Number Label (EN)" : "Contact Telefoonnummer Label (EN)"}</label>
                            <Field name="page.contactUsFormSection.contactPhoneNumberLabel_EN" />
                            <ErrorMessage name="page.contactUsFormSection.contactPhoneNumberLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Phone Number Label (FR)" : "Contact Telefoonnummer Label (FR)"}</label>
                            <Field name="page.contactUsFormSection.contactPhoneNumberLabel_FR" />
                            <ErrorMessage name="page.contactUsFormSection.contactPhoneNumberLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Phone Number Label (DE)" : "Contact Telefoonnummer Label (DE)"}</label>
                            <Field name="page.contactUsFormSection.contactPhoneNumberLabel_DE" />
                            <ErrorMessage name="page.contactUsFormSection.contactPhoneNumberLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Phone Number Label (ES)" : "Contact Telefoonnummer Label (ES)"}</label>
                            <Field name="page.contactUsFormSection.contactPhoneNumberLabel_ES" />
                            <ErrorMessage name="page.contactUsFormSection.contactPhoneNumberLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Message Label (NL)" : "Contact Bericht Label (NL)"}</label>
                            <Field name="page.contactUsFormSection.contactMessageLabel_NL" as="textarea" />
                            <ErrorMessage name="page.contactUsFormSection.contactMessageLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Message Label (EN)" : "Contact Bericht Label (EN)"}</label>
                            <Field name="page.contactUsFormSection.contactMessageLabel_EN" as="textarea" />
                            <ErrorMessage name="page.contactUsFormSection.contactMessageLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Message Label (FR)" : "Contact Bericht Label (FR)"}</label>
                            <Field name="page.contactUsFormSection.contactMessageLabel_FR" as="textarea" />
                            <ErrorMessage name="page.contactUsFormSection.contactMessageLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Message Label (DE)" : "Contact Bericht Label (DE)"}</label>
                            <Field name="page.contactUsFormSection.contactMessageLabel_DE" as="textarea" />
                            <ErrorMessage name="page.contactUsFormSection.contactMessageLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Message Label (ES)" : "Contact Bericht Label (ES)"}</label>
                            <Field name="page.contactUsFormSection.contactMessageLabel_ES" as="textarea" />
                            <ErrorMessage name="page.contactUsFormSection.contactMessageLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Form Send Button (NL)" : "Contactformulier Verzenden Knop (NL)"}</label>
                            <Field name="page.contactUsFormSection.contactFormSendButton_NL" />
                            <ErrorMessage name="page.contactUsFormSection.contactFormSendButton_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Form Send Button (EN)" : "Contactformulier Verzenden Knop (EN)"}</label>
                            <Field name="page.contactUsFormSection.contactFormSendButton_EN" />
                            <ErrorMessage name="page.contactUsFormSection.contactFormSendButton_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Form Send Button (FR)" : "Contactformulier Verzenden Knop (FR)"}</label>
                            <Field name="page.contactUsFormSection.contactFormSendButton_FR" />
                            <ErrorMessage name="page.contactUsFormSection.contactFormSendButton_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Form Send Button (DE)" : "Contactformulier Verzenden Knop (DE)"}</label>
                            <Field name="page.contactUsFormSection.contactFormSendButton_DE" />
                            <ErrorMessage name="page.contactUsFormSection.contactFormSendButton_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Contact Form Send Button (ES)" : "Contactformulier Verzenden Knop (ES)"}</label>
                            <Field name="page.contactUsFormSection.contactFormSendButton_ES" />
                            <ErrorMessage name="page.contactUsFormSection.contactFormSendButton_ES" component="div" />
                        </div>
                    </div>

                    {/* Privacy Policy Section */}
                    <div>
                        <h2>{language === "en" ? "Privacy Policy Section" : "Privacybeleid Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Privacy Policy PDF URL" : "Privacybeleid PDF URL"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyPdf.node.mediaItemUrl" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyPdf.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Privacy Policy URL Text (NL)" : "Privacybeleid URL Tekst (NL)"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyUrlText_NL" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyUrlText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Privacy Policy URL Text (EN)" : "Privacybeleid URL Tekst (EN)"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyUrlText_EN" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyUrlText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Privacy Policy URL Text (FR)" : "Privacybeleid URL Tekst (FR)"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyUrlText_FR" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyUrlText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Privacy Policy URL Text (DE)" : "Privacybeleid URL Tekst (DE)"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyUrlText_DE" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyUrlText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Privacy Policy URL Text (ES)" : "Privacybeleid URL Tekst (ES)"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyUrlText_ES" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyUrlText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Privacy Policy Text (NL)" : "Privacybeleid Tekst (NL)"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyText_NL" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Privacy Policy Text (EN)" : "Privacybeleid Tekst (EN)"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyText_EN" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Privacy Policy Text (FR)" : "Privacybeleid Tekst (FR)"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyText_FR" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Privacy Policy Text (DE)" : "Privacybeleid Tekst (DE)"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyText_DE" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Privacy Policy Text (ES)" : "Privacybeleid Tekst (ES)"}</label>
                            <Field name="page.privacyPolicySection.privacyPolicyText_ES" />
                            <ErrorMessage name="page.privacyPolicySection.privacyPolicyText_ES" component="div" />
                        </div>
                    </div>

                    {/* Selling Form Section */}
                    <div>
                        <h2>{language === "en" ? "Selling Form Section" : "Verkoopformulier Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Selling Tab Title (NL)" : "Verkoop Tab Titel (NL)"}</label>
                            <Field name="page.sellingFormSection.sellingTabTitle_NL" />
                            <ErrorMessage name="page.sellingFormSection.sellingTabTitle_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Tab Title (EN)" : "Verkoop Tab Titel (EN)"}</label>
                            <Field name="page.sellingFormSection.sellingTabTitle_EN" />
                            <ErrorMessage name="page.sellingFormSection.sellingTabTitle_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Tab Title (FR)" : "Verkoop Tab Titel (FR)"}</label>
                            <Field name="page.sellingFormSection.sellingTabTitle_FR" />
                            <ErrorMessage name="page.sellingFormSection.sellingTabTitle_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Tab Title (DE)" : "Verkoop Tab Titel (DE)"}</label>
                            <Field name="page.sellingFormSection.sellingTabTitle_DE" />
                            <ErrorMessage name="page.sellingFormSection.sellingTabTitle_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Tab Title (ES)" : "Verkoop Tab Titel (ES)"}</label>
                            <Field name="page.sellingFormSection.sellingTabTitle_ES" />
                            <ErrorMessage name="page.sellingFormSection.sellingTabTitle_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Name Label (NL)" : "Verkoop Naam Label (NL)"}</label>
                            <Field name="page.sellingFormSection.sellingNameLabel_NL" />
                            <ErrorMessage name="page.sellingFormSection.sellingNameLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Name Label (EN)" : "Verkoop Naam Label (EN)"}</label>
                            <Field name="page.sellingFormSection.sellingNameLabel_EN" />
                            <ErrorMessage name="page.sellingFormSection.sellingNameLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Name Label (FR)" : "Verkoop Naam Label (FR)"}</label>
                            <Field name="page.sellingFormSection.sellingNameLabel_FR" />
                            <ErrorMessage name="page.sellingFormSection.sellingNameLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Name Label (DE)" : "Verkoop Naam Label (DE)"}</label>
                            <Field name="page.sellingFormSection.sellingNameLabel_DE" />
                            <ErrorMessage name="page.sellingFormSection.sellingNameLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Name Label (ES)" : "Verkoop Naam Label (ES)"}</label>
                            <Field name="page.sellingFormSection.sellingNameLabel_ES" />
                            <ErrorMessage name="page.sellingFormSection.sellingNameLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Email Label (NL)" : "Verkoop Email Label (NL)"}</label>
                            <Field name="page.sellingFormSection.sellingEmailLabel_NL" />
                            <ErrorMessage name="page.sellingFormSection.sellingEmailLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Email Label (EN)" : "Verkoop Email Label (EN)"}</label>
                            <Field name="page.sellingFormSection.sellingEmailLabel_EN" />
                            <ErrorMessage name="page.sellingFormSection.sellingEmailLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Email Label (FR)" : "Verkoop Email Label (FR)"}</label>
                            <Field name="page.sellingFormSection.sellingEmailLabel_FR" />
                            <ErrorMessage name="page.sellingFormSection.sellingEmailLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Email Label (DE)" : "Verkoop Email Label (DE)"}</label>
                            <Field name="page.sellingFormSection.sellingEmailLabel_DE" />
                            <ErrorMessage name="page.sellingFormSection.sellingEmailLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Email Label (ES)" : "Verkoop Email Label (ES)"}</label>
                            <Field name="page.sellingFormSection.sellingEmailLabel_ES" />
                            <ErrorMessage name="page.sellingFormSection.sellingEmailLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Phone Label (NL)" : "Verkoop Telefoon Label (NL)"}</label>
                            <Field name="page.sellingFormSection.sellingPhoneLabel_NL" />
                            <ErrorMessage name="page.sellingFormSection.sellingPhoneLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Phone Label (EN)" : "Verkoop Telefoon Label (EN)"}</label>
                            <Field name="page.sellingFormSection.sellingPhoneLabel_EN" />
                            <ErrorMessage name="page.sellingFormSection.sellingPhoneLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Phone Label (FR)" : "Verkoop Telefoon Label (FR)"}</label>
                            <Field name="page.sellingFormSection.sellingPhoneLabel_FR" />
                            <ErrorMessage name="page.sellingFormSection.sellingPhoneLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Phone Label (DE)" : "Verkoop Telefoon Label (DE)"}</label>
                            <Field name="page.sellingFormSection.sellingPhoneLabel_DE" />
                            <ErrorMessage name="page.sellingFormSection.sellingPhoneLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Phone Label (ES)" : "Verkoop Telefoon Label (ES)"}</label>
                            <Field name="page.sellingFormSection.sellingPhoneLabel_ES" />
                            <ErrorMessage name="page.sellingFormSection.sellingPhoneLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Message Label (NL)" : "Verkoop Bericht Label (NL)"}</label>
                            <Field name="page.sellingFormSection.sellingMessageLabel_NL" as="textarea" />
                            <ErrorMessage name="page.sellingFormSection.sellingMessageLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Message Label (EN)" : "Verkoop Bericht Label (EN)"}</label>
                            <Field name="page.sellingFormSection.sellingMessageLabel_EN" as="textarea" />
                            <ErrorMessage name="page.sellingFormSection.sellingMessageLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Message Label (FR)" : "Verkoop Bericht Label (FR)"}</label>
                            <Field name="page.sellingFormSection.sellingMessageLabel_FR" as="textarea" />
                            <ErrorMessage name="page.sellingFormSection.sellingMessageLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Message Label (DE)" : "Verkoop Bericht Label (DE)"}</label>
                            <Field name="page.sellingFormSection.sellingMessageLabel_DE" as="textarea" />
                            <ErrorMessage name="page.sellingFormSection.sellingMessageLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Message Label (ES)" : "Verkoop Bericht Label (ES)"}</label>
                            <Field name="page.sellingFormSection.sellingMessageLabel_ES" as="textarea" />
                            <ErrorMessage name="page.sellingFormSection.sellingMessageLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Place Label (NL)" : "Plaats Label (NL)"}</label>
                            <Field name="page.sellingFormSection.placeLabel_NL" />
                            <ErrorMessage name="page.sellingFormSection.placeLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Place Label (EN)" : "Plaats Label (EN)"}</label>
                            <Field name="page.sellingFormSection.placeLabel_EN" />
                            <ErrorMessage name="page.sellingFormSection.placeLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Place Label (FR)" : "Plaats Label (FR)"}</label>
                            <Field name="page.sellingFormSection.placeLabel_FR" />
                            <ErrorMessage name="page.sellingFormSection.placeLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Place Label (DE)" : "Plaats Label (DE)"}</label>
                            <Field name="page.sellingFormSection.placeLabel_DE" />
                            <ErrorMessage name="page.sellingFormSection.placeLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Place Label (ES)" : "Plaats Label (ES)"}</label>
                            <Field name="page.sellingFormSection.placeLabel_ES" />
                            <ErrorMessage name="page.sellingFormSection.placeLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "License Label (NL)" : "Licentie Label (NL)"}</label>
                            <Field name="page.sellingFormSection.licenseLabel_NL" />
                            <ErrorMessage name="page.sellingFormSection.licenseLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "License Label (EN)" : "Licentie Label (EN)"}</label>
                            <Field name="page.sellingFormSection.licenseLabel_EN" />
                            <ErrorMessage name="page.sellingFormSection.licenseLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "License Label (FR)" : "Licentie Label (FR)"}</label>
                            <Field name="page.sellingFormSection.licenseLabel_FR" />
                            <ErrorMessage name="page.sellingFormSection.licenseLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "License Label (DE)" : "Licentie Label (DE)"}</label>
                            <Field name="page.sellingFormSection.licenseLabel_DE" />
                            <ErrorMessage name="page.sellingFormSection.licenseLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "License Label (ES)" : "Licentie Label (ES)"}</label>
                            <Field name="page.sellingFormSection.licenseLabel_ES" />
                            <ErrorMessage name="page.sellingFormSection.licenseLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Image Label (NL)" : "Afbeelding Label (NL)"}</label>
                            <Field name="page.sellingFormSection.imageLabel_NL" />
                            <ErrorMessage name="page.sellingFormSection.imageLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Image Label (EN)" : "Afbeelding Label (EN)"}</label>
                            <Field name="page.sellingFormSection.imageLabel_EN" />
                            <ErrorMessage name="page.sellingFormSection.imageLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Image Label (FR)" : "Afbeelding Label (FR)"}</label>
                            <Field name="page.sellingFormSection.imageLabel_FR" />
                            <ErrorMessage name="page.sellingFormSection.imageLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Image Label (DE)" : "Afbeelding Label (DE)"}</label>
                            <Field name="page.sellingFormSection.imageLabel_DE" />
                            <ErrorMessage name="page.sellingFormSection.imageLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Image Label (ES)" : "Afbeelding Label (ES)"}</label>
                            <Field name="page.sellingFormSection.imageLabel_ES" />
                            <ErrorMessage name="page.sellingFormSection.imageLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Image" : "Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.sellingFormSection.images" />
                            {values.page.sellingFormSection.images && (
                                <img
                                    src={values.page.sellingFormSection.images}
                                    alt="Selling Image"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.sellingFormSection.images" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Max Size Label (NL)" : "Maximale Grootte Label (NL)"}</label>
                            <Field name="page.sellingFormSection.maxSizeLabel_NL" />
                            <ErrorMessage name="page.sellingFormSection.maxSizeLabel_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Max Size Label (EN)" : "Maximale Grootte Label (EN)"}</label>
                            <Field name="page.sellingFormSection.maxSizeLabel_EN" />
                            <ErrorMessage name="page.sellingFormSection.maxSizeLabel_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Max Size Label (FR)" : "Maximale Grootte Label (FR)"}</label>
                            <Field name="page.sellingFormSection.maxSizeLabel_FR" />
                            <ErrorMessage name="page.sellingFormSection.maxSizeLabel_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Max Size Label (DE)" : "Maximale Grootte Label (DE)"}</label>
                            <Field name="page.sellingFormSection.maxSizeLabel_DE" />
                            <ErrorMessage name="page.sellingFormSection.maxSizeLabel_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Max Size Label (ES)" : "Maximale Grootte Label (ES)"}</label>
                            <Field name="page.sellingFormSection.maxSizeLabel_ES" />
                            <ErrorMessage name="page.sellingFormSection.maxSizeLabel_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Button Text (NL)" : "Verkoop Knop Tekst (NL)"}</label>
                            <Field name="page.sellingFormSection.sellingButtonText_NL" />
                            <ErrorMessage name="page.sellingFormSection.sellingButtonText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Button Text (EN)" : "Verkoop Knop Tekst (EN)"}</label>
                            <Field name="page.sellingFormSection.sellingButtonText_EN" />
                            <ErrorMessage name="page.sellingFormSection.sellingButtonText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Button Text (FR)" : "Verkoop Knop Tekst (FR)"}</label>
                            <Field name="page.sellingFormSection.sellingButtonText_FR" />
                            <ErrorMessage name="page.sellingFormSection.sellingButtonText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Button Text (DE)" : "Verkoop Knop Tekst (DE)"}</label>
                            <Field name="page.sellingFormSection.sellingButtonText_DE" />
                            <ErrorMessage name="page.sellingFormSection.sellingButtonText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Selling Button Text (ES)" : "Verkoop Knop Tekst (ES)"}</label>
                            <Field name="page.sellingFormSection.sellingButtonText_ES" />
                            <ErrorMessage name="page.sellingFormSection.sellingButtonText_ES" component="div" />
                        </div>
                    </div>

                    {/* Articles Section */}
                    <div>
                        <h2>{language === "en" ? "Articles Section" : "Artikelen Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Article SubHeading (NL)" : "Artikel Subkop (NL)"}</label>
                            <Field name="page.articlesSection.articleSubHeading_NL" />
                            <ErrorMessage name="page.articlesSection.articleSubHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Article SubHeading (EN)" : "Artikel Subkop (EN)"}</label>
                            <Field name="page.articlesSection.articleSubHeading_EN" />
                            <ErrorMessage name="page.articlesSection.articleSubHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Article SubHeading (FR)" : "Artikel Subkop (FR)"}</label>
                            <Field name="page.articlesSection.articleSubHeading_FR" />
                            <ErrorMessage name="page.articlesSection.articleSubHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Article SubHeading (DE)" : "Artikel Subkop (DE)"}</label>
                            <Field name="page.articlesSection.articleSubHeading_DE" />
                            <ErrorMessage name="page.articlesSection.articleSubHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Article SubHeading (ES)" : "Artikel Subkop (ES)"}</label>
                            <Field name="page.articlesSection.articleSubHeading_ES" />
                            <ErrorMessage name="page.articlesSection.articleSubHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Article Heading (NL)" : "Artikel Kop (NL)"}</label>
                            <Field name="page.articlesSection.articleHeading_NL" />
                            <ErrorMessage name="page.articlesSection.articleHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Article Heading (EN)" : "Artikel Kop (EN)"}</label>
                            <Field name="page.articlesSection.articleHeading_EN" />
                            <ErrorMessage name="page.articlesSection.articleHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Article Heading (FR)" : "Artikel Kop (FR)"}</label>
                            <Field name="page.articlesSection.articleHeading_FR" />
                            <ErrorMessage name="page.articlesSection.articleHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Article Heading (DE)" : "Artikel Kop (DE)"}</label>
                            <Field name="page.articlesSection.articleHeading_DE" />
                            <ErrorMessage name="page.articlesSection.articleHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Article Heading (ES)" : "Artikel Kop (ES)"}</label>
                            <Field name="page.articlesSection.articleHeading_ES" />
                            <ErrorMessage name="page.articlesSection.articleHeading_ES" component="div" />
                        </div>
                        {formData.page.articlesSection.articles.map((_, index) => (
                            <div key={index}>
                                <label>{language === "en" ? `Article Title ${index + 1} (NL)` : `Artikel Titel ${index + 1} (NL)`}</label>
                                <Field name={`page.articlesSection.articles[${index}].title_NL`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].title_NL`} component="div" />
                                <label>{language === "en" ? `Article Title ${index + 1} (EN)` : `Artikel Titel ${index + 1} (EN)`}</label>
                                <Field name={`page.articlesSection.articles[${index}].title_EN`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].title_EN`} component="div" />
                                <label>{language === "en" ? `Article Title ${index + 1} (FR)` : `Artikel Titel ${index + 1} (FR)`}</label>
                                <Field name={`page.articlesSection.articles[${index}].title_FR`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].title_FR`} component="div" />
                                <label>{language === "en" ? `Article Title ${index + 1} (DE)` : `Artikel Titel ${index + 1} (DE)`}</label>
                                <Field name={`page.articlesSection.articles[${index}].title_DE`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].title_DE`} component="div" />
                                <label>{language === "en" ? `Article Title ${index + 1} (ES)` : `Artikel Titel ${index + 1} (ES)`}</label>
                                <Field name={`page.articlesSection.articles[${index}].title_ES`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].title_ES`} component="div" />
                                <label>{language === "en" ? `Article Button Text ${index + 1} (NL)` : `Artikel Knop Tekst ${index + 1} (NL)`}</label>
                                <Field name={`page.articlesSection.articles[${index}].buttonText_NL`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].buttonText_NL`} component="div" />
                                <label>{language === "en" ? `Article Button Text ${index + 1} (EN)` : `Artikel Knop Tekst ${index + 1} (EN)`}</label>
                                <Field name={`page.articlesSection.articles[${index}].buttonText_EN`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].buttonText_EN`} component="div" />
                                <label>{language === "en" ? `Article Button Text ${index + 1} (FR)` : `Artikel Knop Tekst ${index + 1} (FR)`}</label>
                                <Field name={`page.articlesSection.articles[${index}].buttonText_FR`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].buttonText_FR`} component="div" />
                                <label>{language === "en" ? `Article Button Text ${index + 1} (DE)` : `Artikel Knop Tekst ${index + 1} (DE)`}</label>
                                <Field name={`page.articlesSection.articles[${index}].buttonText_DE`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].buttonText_DE`} component="div" />
                                <label>{language === "en" ? `Article Button Text ${index + 1} (ES)` : `Artikel Knop Tekst ${index + 1} (ES)`}</label>
                                <Field name={`page.articlesSection.articles[${index}].buttonText_ES`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].buttonText_ES`} component="div" />
                                <label>{language === "en" ? `Article URL ${index + 1}` : `Artikel URL ${index + 1}`}</label>
                                <Field name={`page.articlesSection.articles[${index}].url`} />
                                <ErrorMessage name={`page.articlesSection.articles[${index}].url`} component="div" />
                            </div>
                        ))}
                    </div>

                    {/* Contact Slider Section */}
                    <div>
                        <h2>{language === "en" ? "Contact Slider Section" : "Contact Slider Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Slider Title (NL)" : "Slider Titel (NL)"}</label>
                            <Field name="page.contactSliderSection.sliderTitle_NL" />
                            <ErrorMessage name="page.contactSliderSection.sliderTitle_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Title (EN)" : "Slider Titel (EN)"}</label>
                            <Field name="page.contactSliderSection.sliderTitle_EN" />
                            <ErrorMessage name="page.contactSliderSection.sliderTitle_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Title (FR)" : "Slider Titel (FR)"}</label>
                            <Field name="page.contactSliderSection.sliderTitle_FR" />
                            <ErrorMessage name="page.contactSliderSection.sliderTitle_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Title (DE)" : "Slider Titel (DE)"}</label>
                            <Field name="page.contactSliderSection.sliderTitle_DE" />
                            <ErrorMessage name="page.contactSliderSection.sliderTitle_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Title (ES)" : "Slider Titel (ES)"}</label>
                            <Field name="page.contactSliderSection.sliderTitle_ES" />
                            <ErrorMessage name="page.contactSliderSection.sliderTitle_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Text (NL)" : "Slider Tekst (NL)"}</label>
                            <Field name="page.contactSliderSection.sliderText_NL" />
                            <ErrorMessage name="page.contactSliderSection.sliderText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Text (EN)" : "Slider Tekst (EN)"}</label>
                            <Field name="page.contactSliderSection.sliderText_EN" />
                            <ErrorMessage name="page.contactSliderSection.sliderText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Text (FR)" : "Slider Tekst (FR)"}</label>
                            <Field name="page.contactSliderSection.sliderText_FR" />
                            <ErrorMessage name="page.contactSliderSection.sliderText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Text (DE)" : "Slider Tekst (DE)"}</label>
                            <Field name="page.contactSliderSection.sliderText_DE" />
                            <ErrorMessage name="page.contactSliderSection.sliderText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Text (ES)" : "Slider Tekst (ES)"}</label>
                            <Field name="page.contactSliderSection.sliderText_ES" />
                            <ErrorMessage name="page.contactSliderSection.sliderText_ES" component="div" />
                        </div>
                        {formData.page.contactSliderSection.sliderItems.map((_, index) => (
                            <div key={index}>
                                <label>{language === "en" ? `Slider Image URL ${index + 1}` : `Slider Afbeelding URL ${index + 1}`}</label>
                                <ImageDropzone setFieldValue={setFieldValue} fieldName={`page.contactSliderSection.sliderItems[${index}].image.node.mediaItemUrl`} />
                                {values.page.contactSliderSection.sliderItems[index].image.node.mediaItemUrl && (
                                    <img
                                        src={values.page.contactSliderSection.sliderItems[index].image.node.mediaItemUrl}
                                        alt={`Slider Image ${index + 1}`}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                )}
                                <ErrorMessage name={`page.contactSliderSection.sliderItems[${index}].image.node.mediaItemUrl`} component="div" />
                            </div>
                        ))}
                    </div>

                    <button type="submit" className="btn-submit">
                        {isLoading ? "Submitting" : "Submit"}
                    </button>
                </Form>
            )}
        </Formik>
    );
};

export default Contact;
