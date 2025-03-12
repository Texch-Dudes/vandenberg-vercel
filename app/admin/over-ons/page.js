"use client";
import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { uploadImageAndGetUrl } from "@/app/lib/UploadImageGetUrl";

const OverOns = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [formData, setFormData] = useState(null);
    const [language, setLanguage] = useState(typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/aboutpage?edit=true`);
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
                <div {...getRootProps()} className={"dropzone"}>
                    <input {...getInputProps()} />
                    <p style={{ margin: "0" }}>
                        {language === "en" ? "Drag 'n' drop an image here, or click to select one" : "Sleep een afbeelding hierheen of klik om er een te selecteren"}
                    </p>
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
                    metaDesc: "",
                    title: "Over Ons",
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
            const response = await fetch(`${baseURL}/aboutpage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transformedData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit data');
            }
            setIsLoading(false);

            const result = await response.json();
            console.log('Success:', result);
            alert("Data submitted successfully");
        } catch (error) {
            console.error('Error:', error);
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
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values }) => (
                <Form>
                    {/* About Hore Section */}
                    <div>
                        <h2>{language === "en" ? "About Hore Section" : "Over Hore Sectie"}</h2>
                        {formData.page.aboutHoreSection.banerHeading.map((_, index) => (
                            <div key={index}>
                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (NL)` : `Banner Kopregel ${index + 1} (NL)`}</label>
                                <Field name={`page.aboutHoreSection.banerHeading[${index}].line_NL`} />
                                <ErrorMessage name={`page.aboutHoreSection.banerHeading[${index}].line_NL`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (EN)` : `Banner Kopregel ${index + 1} (EN)`}</label>
                                <Field name={`page.aboutHoreSection.banerHeading[${index}].line_EN`} />
                                <ErrorMessage name={`page.aboutHoreSection.banerHeading[${index}].line_EN`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (FR)` : `Banner Kopregel ${index + 1} (FR)`}</label>
                                <Field name={`page.aboutHoreSection.banerHeading[${index}].line_FR`} />
                                <ErrorMessage name={`page.aboutHoreSection.banerHeading[${index}].line_FR`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (DE)` : `Banner Kopregel ${index + 1} (DE)`}</label>
                                <Field name={`page.aboutHoreSection.banerHeading[${index}].line_DE`} />
                                <ErrorMessage name={`page.aboutHoreSection.banerHeading[${index}].line_DE`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (ES)` : `Banner Kopregel ${index + 1} (ES)`}</label>
                                <Field name={`page.aboutHoreSection.banerHeading[${index}].line_ES`} />
                                <ErrorMessage name={`page.aboutHoreSection.banerHeading[${index}].line_ES`} component="div" />
                            </div>
                        ))}
                        <div>
                            <label>{language === "en" ? "Banner Text (NL)" : "Banner Tekst (NL)"}</label>
                            <Field name="page.aboutHoreSection.bannerText_NL" as="textarea" />
                            <ErrorMessage name="page.aboutHoreSection.bannerText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (EN)" : "Banner Tekst (EN)"}</label>
                            <Field name="page.aboutHoreSection.bannerText_EN" as="textarea" />
                            <ErrorMessage name="page.aboutHoreSection.bannerText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (FR)" : "Banner Tekst (FR)"}</label>
                            <Field name="page.aboutHoreSection.bannerText_FR" as="textarea" />
                            <ErrorMessage name="page.aboutHoreSection.bannerText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (DE)" : "Banner Tekst (DE)"}</label>
                            <Field name="page.aboutHoreSection.bannerText_DE" as="textarea" />
                            <ErrorMessage name="page.aboutHoreSection.bannerText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (ES)" : "Banner Tekst (ES)"}</label>
                            <Field name="page.aboutHoreSection.bannerText_ES" as="textarea" />
                            <ErrorMessage name="page.aboutHoreSection.bannerText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Background Image" : "Banner Achtergrondafbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.aboutHoreSection.bannerBgImage.node.mediaItemUrl" />
                            {values.page.aboutHoreSection.bannerBgImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.aboutHoreSection.bannerBgImage.node.mediaItemUrl}
                                    alt="Banner Background"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.aboutHoreSection.bannerBgImage.node.mediaItemUrl" component="div" />
                        </div>
                    </div>

                    {/* Main Content Section */}
                    <div>
                        <h2>{language === "en" ? "Main Content Section" : "Hoofdinhoud Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Image Text (NL)" : "Afbeelding Tekst (NL)"}</label>
                            <Field name="page.mainContentSection.imageText_NL" />
                            <ErrorMessage name="page.mainContentSection.imageText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Image Text (EN)" : "Afbeelding Tekst (EN)"}</label>
                            <Field name="page.mainContentSection.imageText_EN" />
                            <ErrorMessage name="page.mainContentSection.imageText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Image Text (FR)" : "Afbeelding Tekst (FR)"}</label>
                            <Field name="page.mainContentSection.imageText_FR" />
                            <ErrorMessage name="page.mainContentSection.imageText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Image Text (DE)" : "Afbeelding Tekst (DE)"}</label>
                            <Field name="page.mainContentSection.imageText_DE" />
                            <ErrorMessage name="page.mainContentSection.imageText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Image Text (ES)" : "Afbeelding Tekst (ES)"}</label>
                            <Field name="page.mainContentSection.imageText_ES" />
                            <ErrorMessage name="page.mainContentSection.imageText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Text (NL)" : "Hoofdinhoud Tekst (NL)"}</label>
                            <Field name="page.mainContentSection.mainContentText_NL" as="textarea" />
                            <ErrorMessage name="page.mainContentSection.mainContentText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Text (EN)" : "Hoofdinhoud Tekst (EN)"}</label>
                            <Field name="page.mainContentSection.mainContentText_EN" as="textarea" />
                            <ErrorMessage name="page.mainContentSection.mainContentText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Text (FR)" : "Hoofdinhoud Tekst (FR)"}</label>
                            <Field name="page.mainContentSection.mainContentText_FR" as="textarea" />
                            <ErrorMessage name="page.mainContentSection.mainContentText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Text (DE)" : "Hoofdinhoud Tekst (DE)"}</label>
                            <Field name="page.mainContentSection.mainContentText_DE" as="textarea" />
                            <ErrorMessage name="page.mainContentSection.mainContentText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Text (ES)" : "Hoofdinhoud Tekst (ES)"}</label>
                            <Field name="page.mainContentSection.mainContentText_ES" as="textarea" />
                            <ErrorMessage name="page.mainContentSection.mainContentText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Heading (NL)" : "Hoofdinhoud Kop (NL)"}</label>
                            <Field name="page.mainContentSection.mainContentHeading_NL" />
                            <ErrorMessage name="page.mainContentSection.mainContentHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Heading (EN)" : "Hoofdinhoud Kop (EN)"}</label>
                            <Field name="page.mainContentSection.mainContentHeading_EN" />
                            <ErrorMessage name="page.mainContentSection.mainContentHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Heading (FR)" : "Hoofdinhoud Kop (FR)"}</label>
                            <Field name="page.mainContentSection.mainContentHeading_FR" />
                            <ErrorMessage name="page.mainContentSection.mainContentHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Heading (DE)" : "Hoofdinhoud Kop (DE)"}</label>
                            <Field name="page.mainContentSection.mainContentHeading_DE" />
                            <ErrorMessage name="page.mainContentSection.mainContentHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Heading (ES)" : "Hoofdinhoud Kop (ES)"}</label>
                            <Field name="page.mainContentSection.mainContentHeading_ES" />
                            <ErrorMessage name="page.mainContentSection.mainContentHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Mobile Image" : "Inhoud Mobiele Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.mainContentSection.contentMobileImg.node.mediaItemUrl" />
                            {values.page.mainContentSection.contentMobileImg.node.mediaItemUrl && (
                                <img
                                    src={values.page.mainContentSection.contentMobileImg.node.mediaItemUrl}
                                    alt="Content Mobile"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.mainContentSection.contentMobileImg.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Main Content Image" : "Hoofdinhoud Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.mainContentSection.mainContentImage.node.mediaItemUrl" />
                            {values.page.mainContentSection.mainContentImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.mainContentSection.mainContentImage.node.mediaItemUrl}
                                    alt="Main Content"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.mainContentSection.mainContentImage.node.mediaItemUrl" component="div" />
                        </div>
                    </div>

                    {/* Image and Text Section */}
                    <div>
                        <h2>{language === "en" ? "Image and Text Section" : "Afbeelding en Tekst Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Content 2 Heading (NL)" : "Inhoud 2 Kop (NL)"}</label>
                            <Field name="page.imageAndtextSection.content2Heading_NL" />
                            <ErrorMessage name="page.imageAndtextSection.content2Heading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Heading (EN)" : "Inhoud 2 Kop (EN)"}</label>
                            <Field name="page.imageAndtextSection.content2Heading_EN" />
                            <ErrorMessage name="page.imageAndtextSection.content2Heading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Heading (FR)" : "Inhoud 2 Kop (FR)"}</label>
                            <Field name="page.imageAndtextSection.content2Heading_FR" />
                            <ErrorMessage name="page.imageAndtextSection.content2Heading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Heading (DE)" : "Inhoud 2 Kop (DE)"}</label>
                            <Field name="page.imageAndtextSection.content2Heading_DE" />
                            <ErrorMessage name="page.imageAndtextSection.content2Heading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Heading (ES)" : "Inhoud 2 Kop (ES)"}</label>
                            <Field name="page.imageAndtextSection.content2Heading_ES" />
                            <ErrorMessage name="page.imageAndtextSection.content2Heading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Image Text (NL)" : "Inhoud 2 Afbeelding Tekst (NL)"}</label>
                            <Field name="page.imageAndtextSection.content2imageText_NL" />
                            <ErrorMessage name="page.imageAndtextSection.content2imageText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Image Text (EN)" : "Inhoud 2 Afbeelding Tekst (EN)"}</label>
                            <Field name="page.imageAndtextSection.content2imageText_EN" />
                            <ErrorMessage name="page.imageAndtextSection.content2imageText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Image Text (FR)" : "Inhoud 2 Afbeelding Tekst (FR)"}</label>
                            <Field name="page.imageAndtextSection.content2imageText_FR" />
                            <ErrorMessage name="page.imageAndtextSection.content2imageText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Image Text (DE)" : "Inhoud 2 Afbeelding Tekst (DE)"}</label>
                            <Field name="page.imageAndtextSection.content2imageText_DE" />
                            <ErrorMessage name="page.imageAndtextSection.content2imageText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Image Text (ES)" : "Inhoud 2 Afbeelding Tekst (ES)"}</label>
                            <Field name="page.imageAndtextSection.content2imageText_ES" />
                            <ErrorMessage name="page.imageAndtextSection.content2imageText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Text (NL)" : "Inhoud 2 Tekst (NL)"}</label>
                            <Field name="page.imageAndtextSection.content2Text_NL" as="textarea" />
                            <ErrorMessage name="page.imageAndtextSection.content2Text_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Text (EN)" : "Inhoud 2 Tekst (EN)"}</label>
                            <Field name="page.imageAndtextSection.content2Text_EN" as="textarea" />
                            <ErrorMessage name="page.imageAndtextSection.content2Text_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Text (FR)" : "Inhoud 2 Tekst (FR)"}</label>
                            <Field name="page.imageAndtextSection.content2Text_FR" as="textarea" />
                            <ErrorMessage name="page.imageAndtextSection.content2Text_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Text (DE)" : "Inhoud 2 Tekst (DE)"}</label>
                            <Field name="page.imageAndtextSection.content2Text_DE" as="textarea" />
                            <ErrorMessage name="page.imageAndtextSection.content2Text_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Text (ES)" : "Inhoud 2 Tekst (ES)"}</label>
                            <Field name="page.imageAndtextSection.content2Text_ES" as="textarea" />
                            <ErrorMessage name="page.imageAndtextSection.content2Text_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Image Mobile" : "Inhoud 2 Mobiele Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.imageAndtextSection.content2ImageMobile.node.mediaItemUrl" />
                            {values.page.imageAndtextSection.content2ImageMobile.node.mediaItemUrl && (
                                <img
                                    src={values.page.imageAndtextSection.content2ImageMobile.node.mediaItemUrl}
                                    alt="Content 2 Mobile"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.imageAndtextSection.content2ImageMobile.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Image" : "Inhoud 2 Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.imageAndtextSection.content2image.node.mediaItemUrl" />
                            {values.page.imageAndtextSection.content2image.node.mediaItemUrl && (
                                <img
                                    src={values.page.imageAndtextSection.content2image.node.mediaItemUrl}
                                    alt="Content 2"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.imageAndtextSection.content2image.node.mediaItemUrl" component="div" />
                        </div>
                    </div>

                    {/* Image and Text Second Section */}
                    <div>
                        <h2>{language === "en" ? "Image and Text Second Section" : "Afbeelding en Tekst Tweede Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Content 3 Heading (NL)" : "Inhoud 3 Kop (NL)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3Heading_NL" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Heading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Heading (EN)" : "Inhoud 3 Kop (EN)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3Heading_EN" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Heading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Heading (FR)" : "Inhoud 3 Kop (FR)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3Heading_FR" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Heading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Heading (DE)" : "Inhoud 3 Kop (DE)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3Heading_DE" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Heading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Heading (ES)" : "Inhoud 3 Kop (ES)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3Heading_ES" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Heading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Image Text (NL)" : "Inhoud 3 Afbeelding Tekst (NL)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3ImageText_NL" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3ImageText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Image Text (EN)" : "Inhoud 3 Afbeelding Tekst (EN)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3ImageText_EN" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3ImageText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Image Text (FR)" : "Inhoud 3 Afbeelding Tekst (FR)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3ImageText_FR" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3ImageText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Image Text (DE)" : "Inhoud 3 Afbeelding Tekst (DE)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3ImageText_DE" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3ImageText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Image Text (ES)" : "Inhoud 3 Afbeelding Tekst (ES)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3ImageText_ES" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3ImageText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Text (NL)" : "Inhoud 3 Tekst (NL)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3Text_NL" as="textarea" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Text_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Text (EN)" : "Inhoud 3 Tekst (EN)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3Text_EN" as="textarea" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Text_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Text (FR)" : "Inhoud 3 Tekst (FR)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3Text_FR" as="textarea" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Text_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Text (DE)" : "Inhoud 3 Tekst (DE)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3Text_DE" as="textarea" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Text_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Text (ES)" : "Inhoud 3 Tekst (ES)"}</label>
                            <Field name="page.imageAndtextSecondSection.content3Text_ES" as="textarea" />
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Text_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Image Mobile" : "Inhoud 3 Mobiele Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.imageAndtextSecondSection.content3ImageMobile.node.mediaItemUrl" />
                            {values.page.imageAndtextSecondSection.content3ImageMobile.node.mediaItemUrl && (
                                <img
                                    src={values.page.imageAndtextSecondSection.content3ImageMobile.node.mediaItemUrl}
                                    alt="Content 3 Mobile"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.imageAndtextSecondSection.content3ImageMobile.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 3 Image" : "Inhoud 3 Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.imageAndtextSecondSection.content3Image.node.mediaItemUrl" />
                            {values.page.imageAndtextSecondSection.content3Image.node.mediaItemUrl && (
                                <img
                                    src={values.page.imageAndtextSecondSection.content3Image.node.mediaItemUrl}
                                    alt="Content 3"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.imageAndtextSecondSection.content3Image.node.mediaItemUrl" component="div" />
                        </div>
                    </div>

                    {/* Text Second Section */}
                    <div>
                        <h2>{language === "en" ? "Text Second Section" : "Tekst Tweede Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Content 4 Heading (NL)" : "Inhoud 4 Kop (NL)"}</label>
                            <Field name="page.textSecondSection.content4Heading_NL" />
                            <ErrorMessage name="page.textSecondSection.content4Heading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 4 Heading (EN)" : "Inhoud 4 Kop (EN)"}</label>
                            <Field name="page.textSecondSection.content4Heading_EN" />
                            <ErrorMessage name="page.textSecondSection.content4Heading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 4 Heading (FR)" : "Inhoud 4 Kop (FR)"}</label>
                            <Field name="page.textSecondSection.content4Heading_FR" />
                            <ErrorMessage name="page.textSecondSection.content4Heading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 4 Heading (DE)" : "Inhoud 4 Kop (DE)"}</label>
                            <Field name="page.textSecondSection.content4Heading_DE" />
                            <ErrorMessage name="page.textSecondSection.content4Heading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 4 Heading (ES)" : "Inhoud 4 Kop (ES)"}</label>
                            <Field name="page.textSecondSection.content4Heading_ES" />
                            <ErrorMessage name="page.textSecondSection.content4Heading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 4 Text (NL)" : "Inhoud 4 Tekst (NL)"}</label>
                            <Field name="page.textSecondSection.content4Text_NL" as="textarea" />
                            <ErrorMessage name="page.textSecondSection.content4Text_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 4 Text (EN)" : "Inhoud 4 Tekst (EN)"}</label>
                            <Field name="page.textSecondSection.content4Text_EN" as="textarea" />
                            <ErrorMessage name="page.textSecondSection.content4Text_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 4 Text (FR)" : "Inhoud 4 Tekst (FR)"}</label>
                            <Field name="page.textSecondSection.content4Text_FR" as="textarea" />
                            <ErrorMessage name="page.textSecondSection.content4Text_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 4 Text (DE)" : "Inhoud 4 Tekst (DE)"}</label>
                            <Field name="page.textSecondSection.content4Text_DE" as="textarea" />
                            <ErrorMessage name="page.textSecondSection.content4Text_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 4 Text (ES)" : "Inhoud 4 Tekst (ES)"}</label>
                            <Field name="page.textSecondSection.content4Text_ES" as="textarea" />
                            <ErrorMessage name="page.textSecondSection.content4Text_ES" component="div" />
                        </div>
                    </div>

                    {/* Footer CTA Section */}
                    <div>
                        <h2>{language === "en" ? "Footer CTA Section" : "Footer CTA Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Footer CTA Image Text (NL)" : "Footer CTA Afbeelding Tekst (NL)"}</label>
                            <Field name="page.footerCtaSection.ctaImageText_NL" />
                            <ErrorMessage name="page.footerCtaSection.ctaImageText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Image Text (EN)" : "Footer CTA Afbeelding Tekst (EN)"}</label>
                            <Field name="page.footerCtaSection.ctaImageText_EN" />
                            <ErrorMessage name="page.footerCtaSection.ctaImageText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Image Text (FR)" : "Footer CTA Afbeelding Tekst (FR)"}</label>
                            <Field name="page.footerCtaSection.ctaImageText_FR" />
                            <ErrorMessage name="page.footerCtaSection.ctaImageText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Image Text (DE)" : "Footer CTA Afbeelding Tekst (DE)"}</label>
                            <Field name="page.footerCtaSection.ctaImageText_DE" />
                            <ErrorMessage name="page.footerCtaSection.ctaImageText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Image Text (ES)" : "Footer CTA Afbeelding Tekst (ES)"}</label>
                            <Field name="page.footerCtaSection.ctaImageText_ES" />
                            <ErrorMessage name="page.footerCtaSection.ctaImageText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Heading (NL)" : "Footer CTA Kop (NL)"}</label>
                            <Field name="page.footerCtaSection.ctaHeading_NL" />
                            <ErrorMessage name="page.footerCtaSection.ctaHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Heading (EN)" : "Footer CTA Kop (EN)"}</label>
                            <Field name="page.footerCtaSection.ctaHeading_EN" />
                            <ErrorMessage name="page.footerCtaSection.ctaHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Heading (FR)" : "Footer CTA Kop (FR)"}</label>
                            <Field name="page.footerCtaSection.ctaHeading_FR" />
                            <ErrorMessage name="page.footerCtaSection.ctaHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Heading (DE)" : "Footer CTA Kop (DE)"}</label>
                            <Field name="page.footerCtaSection.ctaHeading_DE" />
                            <ErrorMessage name="page.footerCtaSection.ctaHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Heading (ES)" : "Footer CTA Kop (ES)"}</label>
                            <Field name="page.footerCtaSection.ctaHeading_ES" />
                            <ErrorMessage name="page.footerCtaSection.ctaHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Text (NL)" : "Footer CTA Tekst (NL)"}</label>
                            <Field name="page.footerCtaSection.ctaText_NL" as="textarea" />
                            <ErrorMessage name="page.footerCtaSection.ctaText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Text (EN)" : "Footer CTA Tekst (EN)"}</label>
                            <Field name="page.footerCtaSection.ctaText_EN" as="textarea" />
                            <ErrorMessage name="page.footerCtaSection.ctaText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Text (FR)" : "Footer CTA Tekst (FR)"}</label>
                            <Field name="page.footerCtaSection.ctaText_FR" as="textarea" />
                            <ErrorMessage name="page.footerCtaSection.ctaText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Text (DE)" : "Footer CTA Tekst (DE)"}</label>
                            <Field name="page.footerCtaSection.ctaText_DE" as="textarea" />
                            <ErrorMessage name="page.footerCtaSection.ctaText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Text (ES)" : "Footer CTA Tekst (ES)"}</label>
                            <Field name="page.footerCtaSection.ctaText_ES" as="textarea" />
                            <ErrorMessage name="page.footerCtaSection.ctaText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Button (NL)" : "Footer CTA Knop (NL)"}</label>
                            <Field name="page.footerCtaSection.ctaButton_NL" />
                            <ErrorMessage name="page.footerCtaSection.ctaButton_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Button (EN)" : "Footer CTA Knop (EN)"}</label>
                            <Field name="page.footerCtaSection.ctaButton_EN" />
                            <ErrorMessage name="page.footerCtaSection.ctaButton_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Button (FR)" : "Footer CTA Knop (FR)"}</label>
                            <Field name="page.footerCtaSection.ctaButton_FR" />
                            <ErrorMessage name="page.footerCtaSection.ctaButton_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Button (DE)" : "Footer CTA Knop (DE)"}</label>
                            <Field name="page.footerCtaSection.ctaButton_DE" />
                            <ErrorMessage name="page.footerCtaSection.ctaButton_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Button (ES)" : "Footer CTA Knop (ES)"}</label>
                            <Field name="page.footerCtaSection.ctaButton_ES" />
                            <ErrorMessage name="page.footerCtaSection.ctaButton_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Image" : "Footer CTA Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.footerCtaSection.ctaImage.node.mediaItemUrl" />
                            {values.page.footerCtaSection.ctaImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.footerCtaSection.ctaImage.node.mediaItemUrl}
                                    alt="Footer CTA"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.footerCtaSection.ctaImage.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Footer CTA Image Mobile" : "Footer CTA Mobiele Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.footerCtaSection.ctaImageMobile.node.mediaItemUrl" />
                            {values.page.footerCtaSection.ctaImageMobile.node.mediaItemUrl && (
                                <img
                                    src={values.page.footerCtaSection.ctaImageMobile.node.mediaItemUrl}
                                    alt="Footer CTA Mobile"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.footerCtaSection.ctaImageMobile.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Signature Image" : "Handtekening Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.footerCtaSection.signatureImage.node.mediaItemUrl" />
                            {values.page.footerCtaSection.signatureImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.footerCtaSection.signatureImage.node.mediaItemUrl}
                                    alt="Signature"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.footerCtaSection.signatureImage.node.mediaItemUrl" component="div" />
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

export default OverOns;
