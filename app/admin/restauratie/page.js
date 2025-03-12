"use client";
import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import { uploadImageAndGetUrl } from "@/app/lib/UploadImageGetUrl";

const Restauratie = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [formData, setFormData] = useState(null);
    const [language, setLanguage] = useState(typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/restauratiepage?edit=true`);
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
                <div {...getRootProps()} style={{ border: '1px dashed #000', padding: '20px', textAlign: 'center' }}>
                    <input {...getInputProps()} />
                    <p>{language === "en" ? "Drag 'n' drop an image here, or click to select one" : "Sleep een afbeelding hierheen of klik om er een te selecteren"}</p>
                </div>
            )}
        </Dropzone>
    );

    const transformData = (values) => {
        return {
            ...values,
            page: {
                ...values.page,
                seo: {
                    metaDesc: "Static Meta Description",
                    title: "RESTAURATIE",
                    metaRobotsNofollow: "follow",
                    metaRobotsNoindex: "index"
                }
            }
        };
    };

    const handleSubmit = async (values) => {
        const transformedData = transformData(values);
        console.log('Transformed Data', transformedData);
        setIsLoading(true);
        try {
            const response = await fetch(`${baseURL}/restauratiepage`, {
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
            console.log('Form submitted successfully', result);
            alert("Data submitted successfully");
            setIsLoading(false);
        } catch (error) {
            console.error('Error submitting form', error);
            alert("Error submitting data");
            setIsLoading(false);
        }
    };

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
                    {/* Hero Section */}
                    <div>
                        <h2>{language === "en" ? "Advice Hero Section" : "Advies Hero Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 1 (NL)" : "Banner Kopregel 1 (NL)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[0].line_NL" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[0].line_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 1 (EN)" : "Banner Kopregel 1 (EN)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[0].line_EN" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[0].line_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 1 (FR)" : "Banner Kopregel 1 (FR)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[0].line_FR" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[0].line_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 1 (DE)" : "Banner Kopregel 1 (DE)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[0].line_DE" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[0].line_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 1 (ES)" : "Banner Kopregel 1 (ES)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[0].line_ES" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[0].line_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 2 (NL)" : "Banner Kopregel 2 (NL)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[1].line_NL" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[1].line_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 2 (EN)" : "Banner Kopregel 2 (EN)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[1].line_EN" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[1].line_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 2 (FR)" : "Banner Kopregel 2 (FR)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[1].line_FR" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[1].line_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 2 (DE)" : "Banner Kopregel 2 (DE)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[1].line_DE" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[1].line_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 2 (ES)" : "Banner Kopregel 2 (ES)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[1].line_ES" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[1].line_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 3 (NL)" : "Banner Kopregel 3 (NL)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[2].line_NL" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[2].line_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 3 (EN)" : "Banner Kopregel 3 (EN)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[2].line_EN" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[2].line_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 3 (FR)" : "Banner Kopregel 3 (FR)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[2].line_FR" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[2].line_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 3 (DE)" : "Banner Kopregel 3 (DE)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[2].line_DE" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[2].line_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading Line 3 (ES)" : "Banner Kopregel 3 (ES)"}</label>
                            <Field name="page.adviceHeroSection.bannerHeading[2].line_ES" />
                            <ErrorMessage name="page.adviceHeroSection.bannerHeading[2].line_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (NL)" : "Banner Tekst (NL)"}</label>
                            <Field name="page.adviceHeroSection.bannerText_NL" as="textarea" />
                            <ErrorMessage name="page.adviceHeroSection.bannerText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (EN)" : "Banner Tekst (EN)"}</label>
                            <Field name="page.adviceHeroSection.bannerText_EN" as="textarea" />
                            <ErrorMessage name="page.adviceHeroSection.bannerText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (FR)" : "Banner Tekst (FR)"}</label>
                            <Field name="page.adviceHeroSection.bannerText_FR" as="textarea" />
                            <ErrorMessage name="page.adviceHeroSection.bannerText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (DE)" : "Banner Tekst (DE)"}</label>
                            <Field name="page.adviceHeroSection.bannerText_DE" as="textarea" />
                            <ErrorMessage name="page.adviceHeroSection.bannerText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (ES)" : "Banner Tekst (ES)"}</label>
                            <Field name="page.adviceHeroSection.bannerText_ES" as="textarea" />
                            <ErrorMessage name="page.adviceHeroSection.bannerText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Background Image" : "Banner Achtergrondafbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.adviceHeroSection.bannerBgImage.node.mediaItemUrl" />
                            {values.page.adviceHeroSection.bannerBgImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.adviceHeroSection.bannerBgImage.node.mediaItemUrl}
                                    alt="Banner Background"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.adviceHeroSection.bannerBgImage.node.mediaItemUrl" component="div" />
                        </div>
                    </div>

                    {/* Content Section */}
                    <div>
                        <h2>{language === "en" ? "Advice Content Section" : "Advies Inhoud Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Heading (NL)" : "Kop (NL)"}</label>
                            <Field name="page.adviceContentSection.heading_NL" />
                            <ErrorMessage name="page.adviceContentSection.heading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Heading (EN)" : "Kop (EN)"}</label>
                            <Field name="page.adviceContentSection.heading_EN" />
                            <ErrorMessage name="page.adviceContentSection.heading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Heading (FR)" : "Kop (FR)"}</label>
                            <Field name="page.adviceContentSection.heading_FR" />
                            <ErrorMessage name="page.adviceContentSection.heading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Heading (DE)" : "Kop (DE)"}</label>
                            <Field name="page.adviceContentSection.heading_DE" />
                            <ErrorMessage name="page.adviceContentSection.heading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Heading (ES)" : "Kop (ES)"}</label>
                            <Field name="page.adviceContentSection.heading_ES" />
                            <ErrorMessage name="page.adviceContentSection.heading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (NL)" : "Inhoud Tekst (NL)"}</label>
                            <Field name="page.adviceContentSection.contentText_NL" as="textarea" />
                            <ErrorMessage name="page.adviceContentSection.contentText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (EN)" : "Inhoud Tekst (EN)"}</label>
                            <Field name="page.adviceContentSection.contentText_EN" as="textarea" />
                            <ErrorMessage name="page.adviceContentSection.contentText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (FR)" : "Inhoud Tekst (FR)"}</label>
                            <Field name="page.adviceContentSection.contentText_FR" as="textarea" />
                            <ErrorMessage name="page.adviceContentSection.contentText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (DE)" : "Inhoud Tekst (DE)"}</label>
                            <Field name="page.adviceContentSection.contentText_DE" as="textarea" />
                            <ErrorMessage name="page.adviceContentSection.contentText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (ES)" : "Inhoud Tekst (ES)"}</label>
                            <Field name="page.adviceContentSection.contentText_ES" as="textarea" />
                            <ErrorMessage name="page.adviceContentSection.contentText_ES" component="div" />
                        </div>
                    </div>

                    <div>
                        <h2>{language === "en" ? "Advice Footer CTA Section" : "Advies Footer CTA Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Footer CTA Heading (NL)" : "Footer CTA Kop (NL)"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaHeading_NL" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Heading (EN)" : "Footer CTA Kop (EN)"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaHeading_EN" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Heading (FR)" : "Footer CTA Kop (FR)"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaHeading_FR" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Heading (DE)" : "Footer CTA Kop (DE)"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaHeading_DE" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Heading (ES)" : "Footer CTA Kop (ES)"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaHeading_ES" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Text (NL)" : "Footer CTA Tekst (NL)"}</label>
                            <Field name="page.adviceFooterCtaSection.contentText_NL" as="textarea" />
                            <ErrorMessage name="page.adviceFooterCtaSection.contentText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Text (EN)" : "Footer CTA Tekst (EN)"}</label>
                            <Field name="page.adviceFooterCtaSection.contentText_EN" as="textarea" />
                            <ErrorMessage name="page.adviceFooterCtaSection.contentText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Text (FR)" : "Footer CTA Tekst (FR)"}</label>
                            <Field name="page.adviceFooterCtaSection.contentText_FR" as="textarea" />
                            <ErrorMessage name="page.adviceFooterCtaSection.contentText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Text (DE)" : "Footer CTA Tekst (DE)"}</label>
                            <Field name="page.adviceFooterCtaSection.contentText_DE" as="textarea" />
                            <ErrorMessage name="page.adviceFooterCtaSection.contentText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Text (ES)" : "Footer CTA Tekst (ES)"}</label>
                            <Field name="page.adviceFooterCtaSection.contentText_ES" as="textarea" />
                            <ErrorMessage name="page.adviceFooterCtaSection.contentText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 1 (NL)" : "CTA Knop 1 (NL)"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaButton1_NL" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaButton1_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 1 (EN)" : "CTA Knop 1 (EN)"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaButton1_EN" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaButton1_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 1 (FR)" : "CTA Knop 1 (FR)"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaButton1_FR" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaButton1_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 1 (DE)" : "CTA Knop 1 (DE)"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaButton1_DE" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaButton1_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 1 (ES)" : "CTA Knop 1 (ES)"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaButton1_ES" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaButton1_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 2" : "CTA Knop 2"}</label>
                            <Field name="page.adviceFooterCtaSection.ctaButton2" />
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaButton2" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Image" : "CTA Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.adviceFooterCtaSection.ctaImage.node.mediaItemUrl" />
                            {values.page.adviceFooterCtaSection.ctaImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.adviceFooterCtaSection.ctaImage.node.mediaItemUrl}
                                    alt="CTA"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.adviceFooterCtaSection.ctaImage.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Signature Image" : "Handtekening Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.adviceFooterCtaSection.signatureImage.node.mediaItemUrl" />
                            {values.page.adviceFooterCtaSection.signatureImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.adviceFooterCtaSection.signatureImage.node.mediaItemUrl}
                                    alt="Signature"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.adviceFooterCtaSection.signatureImage.node.mediaItemUrl" component="div" />
                        </div>
                    </div>

                    {/* Properties Section */}
                    <div>
                        <h2>{language === "en" ? "Advice Properties Section" : "Advies Eigenschappen Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Properties Subheading (NL)" : "Eigenschappen Subkop (NL)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesSubHeading_NL" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesSubHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Subheading (EN)" : "Eigenschappen Subkop (EN)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesSubHeading_EN" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesSubHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Subheading (FR)" : "Eigenschappen Subkop (FR)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesSubHeading_FR" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesSubHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Subheading (DE)" : "Eigenschappen Subkop (DE)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesSubHeading_DE" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesSubHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Subheading (ES)" : "Eigenschappen Subkop (ES)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesSubHeading_ES" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesSubHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Heading (NL)" : "Eigenschappen Kop (NL)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesHeading_NL" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Heading (EN)" : "Eigenschappen Kop (EN)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesHeading_EN" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Heading (FR)" : "Eigenschappen Kop (FR)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesHeading_FR" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Heading (DE)" : "Eigenschappen Kop (DE)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesHeading_DE" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Heading (ES)" : "Eigenschappen Kop (ES)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesHeading_ES" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Text (NL)" : "Eigenschappen Tekst (NL)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesText_NL" as="textarea" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Text (EN)" : "Eigenschappen Tekst (EN)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesText_EN" as="textarea" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Text (FR)" : "Eigenschappen Tekst (FR)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesText_FR" as="textarea" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Text (DE)" : "Eigenschappen Tekst (DE)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesText_DE" as="textarea" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Properties Text (ES)" : "Eigenschappen Tekst (ES)"}</label>
                            <Field name="page.advicePropertiesSection.propertiesText_ES" as="textarea" />
                            <ErrorMessage name="page.advicePropertiesSection.propertiesText_ES" component="div" />
                        </div>
                        {formData.page.advicePropertiesSection.accordion.map((_, index) => (
                            <div key={index}>
                                <label>{language === "en" ? `Accordion Title ${index + 1} (NL)` : `Accordeon Titel ${index + 1} (NL)`}</label>
                                <Field name={`page.advicePropertiesSection.accordion[${index}].title_NL`} />
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].title_NL`} component="div" />

                                <label>{language === "en" ? `Accordion Title ${index + 1} (EN)` : `Accordeon Titel ${index + 1} (EN)`}</label>
                                <Field name={`page.advicePropertiesSection.accordion[${index}].title_EN`} />
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].title_EN`} component="div" />

                                <label>{language === "en" ? `Accordion Title ${index + 1} (FR)` : `Accordeon Titel ${index + 1} (FR)`}</label>
                                <Field name={`page.advicePropertiesSection.accordion[${index}].title_FR`} />
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].title_FR`} component="div" />

                                <label>{language === "en" ? `Accordion Title ${index + 1} (DE)` : `Accordeon Titel ${index + 1} (DE)`}</label>
                                <Field name={`page.advicePropertiesSection.accordion[${index}].title_DE`} />
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].title_DE`} component="div" />

                                <label>{language === "en" ? `Accordion Title ${index + 1} (ES)` : `Accordeon Titel ${index + 1} (ES)`}</label>
                                <Field name={`page.advicePropertiesSection.accordion[${index}].title_ES`} />
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].title_ES`} component="div" />

                                <label>{language === "en" ? `Accordion Description ${index + 1} (NL)` : `Accordeon Beschrijving ${index + 1} (NL)`}</label>
                                <Field name={`page.advicePropertiesSection.accordion[${index}].description_NL`} as="textarea" />
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].description_NL`} component="div" />

                                <label>{language === "en" ? `Accordion Description ${index + 1} (EN)` : `Accordeon Beschrijving ${index + 1} (EN)`}</label>
                                <Field name={`page.advicePropertiesSection.accordion[${index}].description_EN`} as="textarea" />
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].description_EN`} component="div" />

                                <label>{language === "en" ? `Accordion Description ${index + 1} (FR)` : `Accordeon Beschrijving ${index + 1} (FR)`}</label>
                                <Field name={`page.advicePropertiesSection.accordion[${index}].description_FR`} as="textarea" />
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].description_FR`} component="div" />

                                <label>{language === "en" ? `Accordion Description ${index + 1} (DE)` : `Accordeon Beschrijving ${index + 1} (DE)`}</label>
                                <Field name={`page.advicePropertiesSection.accordion[${index}].description_DE`} as="textarea" />
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].description_DE`} component="div" />

                                <label>{language === "en" ? `Accordion Description ${index + 1} (ES)` : `Accordeon Beschrijving ${index + 1} (ES)`}</label>
                                <Field name={`page.advicePropertiesSection.accordion[${index}].description_ES`} as="textarea" />
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].description_ES`} component="div" />

                                <ImageDropzone setFieldValue={setFieldValue} fieldName={`page.advicePropertiesSection.accordion[${index}].image.node.mediaItemUrl`} />
                                {values.page.advicePropertiesSection.accordion[index].image.node.mediaItemUrl && (
                                    <img
                                        src={values.page.advicePropertiesSection.accordion[index].image.node.mediaItemUrl}
                                        alt={`Accordion ${index + 1}`}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                )}
                                <ErrorMessage name={`page.advicePropertiesSection.accordion[${index}].image.node.mediaItemUrl`} component="div" />
                            </div>
                        ))}
                    </div>

                    {/* Car Slider Section */}
                    <div>
                        <h2>{language === "en" ? "Advice Car Slider Section" : "Advies Auto Slider Sectie"}</h2>
                        {formData.page.adviceCarSliderSection.carslider.map((_, index) => (
                            <div key={index}>
                                <label>{language === "en" ? `Slider Title ${index + 1} (NL)` : `Slider Titel ${index + 1} (NL)`}</label>
                                <Field name={`page.adviceCarSliderSection.carslider[${index}].title_NL`} />
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].title_NL`} component="div" />

                                <label>{language === "en" ? `Slider Title ${index + 1} (EN)` : `Slider Titel ${index + 1} (EN)`}</label>
                                <Field name={`page.adviceCarSliderSection.carslider[${index}].title_EN`} />
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].title_EN`} component="div" />

                                <label>{language === "en" ? `Slider Title ${index + 1} (FR)` : `Slider Titel ${index + 1} (FR)`}</label>
                                <Field name={`page.adviceCarSliderSection.carslider[${index}].title_FR`} />
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].title_FR`} component="div" />

                                <label>{language === "en" ? `Slider Title ${index + 1} (DE)` : `Slider Titel ${index + 1} (DE)`}</label>
                                <Field name={`page.adviceCarSliderSection.carslider[${index}].title_DE`} />
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].title_DE`} component="div" />

                                <label>{language === "en" ? `Slider Title ${index + 1} (ES)` : `Slider Titel ${index + 1} (ES)`}</label>
                                <Field name={`page.adviceCarSliderSection.carslider[${index}].title_ES`} />
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].title_ES`} component="div" />

                                <label>{language === "en" ? `Car Name ${index + 1} (NL)` : `Auto Naam ${index + 1} (NL)`}</label>
                                <Field name={`page.adviceCarSliderSection.carslider[${index}].carName_NL`} />
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].carName_NL`} component="div" />

                                <label>{language === "en" ? `Car Name ${index + 1} (EN)` : `Auto Naam ${index + 1} (EN)`}</label>
                                <Field name={`page.adviceCarSliderSection.carslider[${index}].carName_EN`} />
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].carName_EN`} component="div" />

                                <label>{language === "en" ? `Car Name ${index + 1} (FR)` : `Auto Naam ${index + 1} (FR)`}</label>
                                <Field name={`page.adviceCarSliderSection.carslider[${index}].carName_FR`} />
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].carName_FR`} component="div" />

                                <label>{language === "en" ? `Car Name ${index + 1} (DE)` : `Auto Naam ${index + 1} (DE)`}</label>
                                <Field name={`page.adviceCarSliderSection.carslider[${index}].carName_DE`} />
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].carName_DE`} component="div" />

                                <label>{language === "en" ? `Car Name ${index + 1} (ES)` : `Auto Naam ${index + 1} (ES)`}</label>
                                <Field name={`page.adviceCarSliderSection.carslider[${index}].carName_ES`} />
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].carName_ES`} component="div" />

                                <ImageDropzone setFieldValue={setFieldValue} fieldName={`page.adviceCarSliderSection.carslider[${index}].sliderImage.node.mediaItemUrl`} />
                                {values.page.adviceCarSliderSection.carslider[index].sliderImage.node.mediaItemUrl && (
                                    <img
                                        src={values.page.adviceCarSliderSection.carslider[index].sliderImage.node.mediaItemUrl}
                                        alt={`Slider ${index + 1}`}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                )}
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].sliderImage.node.mediaItemUrl`} component="div" />

                                <ImageDropzone setFieldValue={setFieldValue} fieldName={`page.adviceCarSliderSection.carslider[${index}].sliderMobileImage.node.mediaItemUrl`} />
                                {values.page.adviceCarSliderSection.carslider[index].sliderMobileImage.node.mediaItemUrl && (
                                    <img
                                        src={values.page.adviceCarSliderSection.carslider[index].sliderMobileImage.node.mediaItemUrl}
                                        alt={`Slider Mobile ${index + 1}`}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                )}
                                <ErrorMessage name={`page.adviceCarSliderSection.carslider[${index}].sliderMobileImage.node.mediaItemUrl`} component="div" />
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

export default Restauratie;
