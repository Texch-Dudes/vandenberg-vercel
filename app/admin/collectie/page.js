"use client";
import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import Dropzone from "react-dropzone";
import { uploadImageAndGetUrl } from "@/app/lib/UploadImageGetUrl";

const Collectie = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [formData, setFormData] = useState(null);
    const [language, setLanguage] = useState(typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/collectiepage?edit=true`);
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
        return {
            ...values,
            page: {
                ...values.page,
                seo: {
                    metaDesc: "",
                    title: "COLLECTIE",
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
            const response = await axios.post(`${baseURL}/collectiepage`, transformedData);
            console.log('Response:', response.data);
            alert("Data submitted successfully");
            setIsLoading(false);
            // Handle success (e.g., show a success message)
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
            alert("Error submitting data");
            setIsLoading(false);
            // Handle error (e.g., show an error message)
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
            onSubmit={handleSubmit} // Use handleSubmit function
        >
            {({ setFieldValue, values }) => (
                <Form>
                    {/* Collection Hero Section */}
                    <div>
                        <h2>{language === "en" ? "Collection Hero Section" : "Collectie Hero Sectie"}</h2>
                        {formData.page.collectionHeroSection.bannerHeading.map((_, index) => (
                            <div key={index}>
                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (NL)` : `Banner Kopregel ${index + 1} (NL)`}</label>
                                <Field name={`page.collectionHeroSection.bannerHeading[${index}].line_NL`} />
                                <ErrorMessage name={`page.collectionHeroSection.bannerHeading[${index}].line_NL`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (EN)` : `Banner Kopregel ${index + 1} (EN)`}</label>
                                <Field name={`page.collectionHeroSection.bannerHeading[${index}].line_EN`} />
                                <ErrorMessage name={`page.collectionHeroSection.bannerHeading[${index}].line_EN`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (FR)` : `Banner Kopregel ${index + 1} (FR)`}</label>
                                <Field name={`page.collectionHeroSection.bannerHeading[${index}].line_FR`} />
                                <ErrorMessage name={`page.collectionHeroSection.bannerHeading[${index}].line_FR`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (DE)` : `Banner Kopregel ${index + 1} (DE)`}</label>
                                <Field name={`page.collectionHeroSection.bannerHeading[${index}].line_DE`} />
                                <ErrorMessage name={`page.collectionHeroSection.bannerHeading[${index}].line_DE`} component="div" />

                                <label>{language === "en" ? `Banner Heading Line ${index + 1} (ES)` : `Banner Kopregel ${index + 1} (ES)`}</label>
                                <Field name={`page.collectionHeroSection.bannerHeading[${index}].line_ES`} />
                                <ErrorMessage name={`page.collectionHeroSection.bannerHeading[${index}].line_ES`} component="div" />
                            </div>
                        ))}
                        <div>
                            <label>{language === "en" ? "Banner Text (NL)" : "Banner Tekst (NL)"}</label>
                            <Field name="page.collectionHeroSection.bannerText_NL" as="textarea" />
                            <ErrorMessage name="page.collectionHeroSection.bannerText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (EN)" : "Banner Tekst (EN)"}</label>
                            <Field name="page.collectionHeroSection.bannerText_EN" as="textarea" />
                            <ErrorMessage name="page.collectionHeroSection.bannerText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (FR)" : "Banner Tekst (FR)"}</label>
                            <Field name="page.collectionHeroSection.bannerText_FR" as="textarea" />
                            <ErrorMessage name="page.collectionHeroSection.bannerText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (DE)" : "Banner Tekst (DE)"}</label>
                            <Field name="page.collectionHeroSection.bannerText_DE" as="textarea" />
                            <ErrorMessage name="page.collectionHeroSection.bannerText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (ES)" : "Banner Tekst (ES)"}</label>
                            <Field name="page.collectionHeroSection.bannerText_ES" as="textarea" />
                            <ErrorMessage name="page.collectionHeroSection.bannerText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Background Image" : "Banner Achtergrondafbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.collectionHeroSection.bannerBgImage.node.mediaItemUrl" />
                            {values.page.collectionHeroSection.bannerBgImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.collectionHeroSection.bannerBgImage.node.mediaItemUrl}
                                    alt="Banner Background"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.collectionHeroSection.bannerBgImage.node.mediaItemUrl" component="div" />
                        </div>
                    </div>

                    {/* Collection Content Section */}
                    <div>
                        <h2>{language === "en" ? "Collection Content Section" : "Collectie Inhoud Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Content Heading (NL)" : "Inhoud Kop (NL)"}</label>
                            <Field name="page.collectionContentSection.contentHeading_NL" />
                            <ErrorMessage name="page.collectionContentSection.contentHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Heading (EN)" : "Inhoud Kop (EN)"}</label>
                            <Field name="page.collectionContentSection.contentHeading_EN" />
                            <ErrorMessage name="page.collectionContentSection.contentHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Heading (FR)" : "Inhoud Kop (FR)"}</label>
                            <Field name="page.collectionContentSection.contentHeading_FR" />
                            <ErrorMessage name="page.collectionContentSection.contentHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Heading (DE)" : "Inhoud Kop (DE)"}</label>
                            <Field name="page.collectionContentSection.contentHeading_DE" />
                            <ErrorMessage name="page.collectionContentSection.contentHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Heading (ES)" : "Inhoud Kop (ES)"}</label>
                            <Field name="page.collectionContentSection.contentHeading_ES" />
                            <ErrorMessage name="page.collectionContentSection.contentHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content SubHeading (NL)" : "Inhoud Subkop (NL)"}</label>
                            <Field name="page.collectionContentSection.contentSubHeading_NL" />
                            <ErrorMessage name="page.collectionContentSection.contentSubHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content SubHeading (EN)" : "Inhoud Subkop (EN)"}</label>
                            <Field name="page.collectionContentSection.contentSubHeading_EN" />
                            <ErrorMessage name="page.collectionContentSection.contentSubHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content SubHeading (FR)" : "Inhoud Subkop (FR)"}</label>
                            <Field name="page.collectionContentSection.contentSubHeading_FR" />
                            <ErrorMessage name="page.collectionContentSection.contentSubHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content SubHeading (DE)" : "Inhoud Subkop (DE)"}</label>
                            <Field name="page.collectionContentSection.contentSubHeading_DE" />
                            <ErrorMessage name="page.collectionContentSection.contentSubHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content SubHeading (ES)" : "Inhoud Subkop (ES)"}</label>
                            <Field name="page.collectionContentSection.contentSubHeading_ES" />
                            <ErrorMessage name="page.collectionContentSection.contentSubHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (NL)" : "Inhoud Tekst (NL)"}</label>
                            <Field name="page.collectionContentSection.contentText_NL" as="textarea" />
                            <ErrorMessage name="page.collectionContentSection.contentText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (EN)" : "Inhoud Tekst (EN)"}</label>
                            <Field name="page.collectionContentSection.contentText_EN" as="textarea" />
                            <ErrorMessage name="page.collectionContentSection.contentText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (FR)" : "Inhoud Tekst (FR)"}</label>
                            <Field name="page.collectionContentSection.contentText_FR" as="textarea" />
                            <ErrorMessage name="page.collectionContentSection.contentText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (DE)" : "Inhoud Tekst (DE)"}</label>
                            <Field name="page.collectionContentSection.contentText_DE" as="textarea" />
                            <ErrorMessage name="page.collectionContentSection.contentText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (ES)" : "Inhoud Tekst (ES)"}</label>
                            <Field name="page.collectionContentSection.contentText_ES" as="textarea" />
                            <ErrorMessage name="page.collectionContentSection.contentText_ES" component="div" />
                        </div>
                    </div>

                    {/* Collection CTA Section */}
                    <div>
                        <h2>{language === "en" ? "Collection CTA Section" : "Collectie CTA Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "CTA Heading (NL)" : "CTA Kop (NL)"}</label>
                            <Field name="page.collectionCtaSection.ctaHeading_NL" />
                            <ErrorMessage name="page.collectionCtaSection.ctaHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Heading (EN)" : "CTA Kop (EN)"}</label>
                            <Field name="page.collectionCtaSection.ctaHeading_EN" />
                            <ErrorMessage name="page.collectionCtaSection.ctaHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Heading (FR)" : "CTA Kop (FR)"}</label>
                            <Field name="page.collectionCtaSection.ctaHeading_FR" />
                            <ErrorMessage name="page.collectionCtaSection.ctaHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Heading (DE)" : "CTA Kop (DE)"}</label>
                            <Field name="page.collectionCtaSection.ctaHeading_DE" />
                            <ErrorMessage name="page.collectionCtaSection.ctaHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Heading (ES)" : "CTA Kop (ES)"}</label>
                            <Field name="page.collectionCtaSection.ctaHeading_ES" />
                            <ErrorMessage name="page.collectionCtaSection.ctaHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Text (NL)" : "CTA Tekst (NL)"}</label>
                            <Field name="page.collectionCtaSection.ctaText_NL" as="textarea" />
                            <ErrorMessage name="page.collectionCtaSection.ctaText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Text (EN)" : "CTA Tekst (EN)"}</label>
                            <Field name="page.collectionCtaSection.ctaText_EN" as="textarea" />
                            <ErrorMessage name="page.collectionCtaSection.ctaText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Text (FR)" : "CTA Tekst (FR)"}</label>
                            <Field name="page.collectionCtaSection.ctaText_FR" as="textarea" />
                            <ErrorMessage name="page.collectionCtaSection.ctaText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Text (DE)" : "CTA Tekst (DE)"}</label>
                            <Field name="page.collectionCtaSection.ctaText_DE" as="textarea" />
                            <ErrorMessage name="page.collectionCtaSection.ctaText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Text (ES)" : "CTA Tekst (ES)"}</label>
                            <Field name="page.collectionCtaSection.ctaText_ES" as="textarea" />
                            <ErrorMessage name="page.collectionCtaSection.ctaText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 1 (NL)" : "CTA Knop 1 (NL)"}</label>
                            <Field name="page.collectionCtaSection.ctaButton1_NL" />
                            <ErrorMessage name="page.collectionCtaSection.ctaButton1_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 1 (EN)" : "CTA Knop 1 (EN)"}</label>
                            <Field name="page.collectionCtaSection.ctaButton1_EN" />
                            <ErrorMessage name="page.collectionCtaSection.ctaButton1_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 1 (FR)" : "CTA Knop 1 (FR)"}</label>
                            <Field name="page.collectionCtaSection.ctaButton1_FR" />
                            <ErrorMessage name="page.collectionCtaSection.ctaButton1_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 1 (DE)" : "CTA Knop 1 (DE)"}</label>
                            <Field name="page.collectionCtaSection.ctaButton1_DE" />
                            <ErrorMessage name="page.collectionCtaSection.ctaButton1_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 1 (ES)" : "CTA Knop 1 (ES)"}</label>
                            <Field name="page.collectionCtaSection.ctaButton1_ES" />
                            <ErrorMessage name="page.collectionCtaSection.ctaButton1_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 2 (NL)" : "CTA Knop 2 (NL)"}</label>
                            <Field name="page.collectionCtaSection.ctaButton2_NL" />
                            <ErrorMessage name="page.collectionCtaSection.ctaButton2_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 2 (EN)" : "CTA Knop 2 (EN)"}</label>
                            <Field name="page.collectionCtaSection.ctaButton2_EN" />
                            <ErrorMessage name="page.collectionCtaSection.ctaButton2_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 2 (FR)" : "CTA Knop 2 (FR)"}</label>
                            <Field name="page.collectionCtaSection.ctaButton2_FR" />
                            <ErrorMessage name="page.collectionCtaSection.ctaButton2_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 2 (DE)" : "CTA Knop 2 (DE)"}</label>
                            <Field name="page.collectionCtaSection.ctaButton2_DE" />
                            <ErrorMessage name="page.collectionCtaSection.ctaButton2_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button 2 (ES)" : "CTA Knop 2 (ES)"}</label>
                            <Field name="page.collectionCtaSection.ctaButton2_ES" />
                            <ErrorMessage name="page.collectionCtaSection.ctaButton2_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Image" : "CTA Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.collectionCtaSection.ctaImage.node.mediaItemUrl" />
                            {values.page.collectionCtaSection.ctaImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.collectionCtaSection.ctaImage.node.mediaItemUrl}
                                    alt="CTA"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.collectionCtaSection.ctaImage.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Mobile Image" : "CTA Mobiele Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.collectionCtaSection.ctaImageMobile.node.mediaItemUrl" />
                            {values.page.collectionCtaSection.ctaImageMobile.node.mediaItemUrl && (
                                <img
                                    src={values.page.collectionCtaSection.ctaImageMobile.node.mediaItemUrl}
                                    alt="CTA Mobile"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.collectionCtaSection.ctaImageMobile.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Signature Image" : "Handtekening Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.collectionCtaSection.signatureImage.node.mediaItemUrl" />
                            {values.page.collectionCtaSection.signatureImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.collectionCtaSection.signatureImage.node.mediaItemUrl}
                                    alt="Signature"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.collectionCtaSection.signatureImage.node.mediaItemUrl" component="div" />
                        </div>
                    </div>

                    {/* Collection Buttons */}
                    <div>
                        <h2>{language === "en" ? "Collection Buttons" : "Collectie Knoppen"}</h2>
                        <div>
                            <label>{language === "en" ? "View All (NL)" : "Bekijk Alles (NL)"}</label>
                            <Field name="page.collectionButtons.viewAll_NL" />
                            <ErrorMessage name="page.collectionButtons.viewAll_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "View All (EN)" : "Bekijk Alles (EN)"}</label>
                            <Field name="page.collectionButtons.viewAll_EN" />
                            <ErrorMessage name="page.collectionButtons.viewAll_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "View All (FR)" : "Bekijk Alles (FR)"}</label>
                            <Field name="page.collectionButtons.viewAll_FR" />
                            <ErrorMessage name="page.collectionButtons.viewAll_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "View All (DE)" : "Bekijk Alles (DE)"}</label>
                            <Field name="page.collectionButtons.viewAll_DE" />
                            <ErrorMessage name="page.collectionButtons.viewAll_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "View All (ES)" : "Bekijk Alles (ES)"}</label>
                            <Field name="page.collectionButtons.viewAll_ES" />
                            <ErrorMessage name="page.collectionButtons.viewAll_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "View Modal (NL)" : "Bekijk Modal (NL)"}</label>
                            <Field name="page.collectionButtons.vewModal_NL" />
                            <ErrorMessage name="page.collectionButtons.vewModal_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "View Modal (EN)" : "Bekijk Modal (EN)"}</label>
                            <Field name="page.collectionButtons.vewModal_EN" />
                            <ErrorMessage name="page.collectionButtons.vewModal_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "View Modal (FR)" : "Bekijk Modal (FR)"}</label>
                            <Field name="page.collectionButtons.vewModal_FR" />
                            <ErrorMessage name="page.collectionButtons.vewModal_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "View Modal (DE)" : "Bekijk Modal (DE)"}</label>
                            <Field name="page.collectionButtons.vewModal_DE" />
                            <ErrorMessage name="page.collectionButtons.vewModal_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "View Modal (ES)" : "Bekijk Modal (ES)"}</label>
                            <Field name="page.collectionButtons.vewModal_ES" />
                            <ErrorMessage name="page.collectionButtons.vewModal_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Load More (NL)" : "Laad Meer (NL)"}</label>
                            <Field name="page.collectionButtons.loadMore_NL" />
                            <ErrorMessage name="page.collectionButtons.loadMore_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Load More (EN)" : "Laad Meer (EN)"}</label>
                            <Field name="page.collectionButtons.loadMore_EN" />
                            <ErrorMessage name="page.collectionButtons.loadMore_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Load More (FR)" : "Laad Meer (FR)"}</label>
                            <Field name="page.collectionButtons.loadMore_FR" />
                            <ErrorMessage name="page.collectionButtons.loadMore_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Load More (DE)" : "Laad Meer (DE)"}</label>
                            <Field name="page.collectionButtons.loadMore_DE" />
                            <ErrorMessage name="page.collectionButtons.loadMore_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Load More (ES)" : "Laad Meer (ES)"}</label>
                            <Field name="page.collectionButtons.loadMore_ES" />
                            <ErrorMessage name="page.collectionButtons.loadMore_ES" component="div" />
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

export default Collectie;
