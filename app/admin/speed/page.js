"use client";
import { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import Dropzone from 'react-dropzone';
import { uploadImageAndGetUrl } from "@/app/lib/UploadImageGetUrl";

const Speed = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [formData, setFormData] = useState(null);
    const [language, setLanguage] = useState(typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl");
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`${baseURL}/speedpage?edit=true`);
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
                    title: "SPEED",
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
            const response = await fetch(`${baseURL}/speedpage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(transformedData),
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.error('Error:', errorData);
                alert('Failed to submit data');
            } else {
                const responseData = await response.json();
                console.log('Success:', responseData);
                alert('Data submitted successfully');
            }
            setIsLoading(false);
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting data');
            setIsLoading(false);
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
            onSubmit={handleSubmit}
        >
            {({ setFieldValue, values }) => (
                <Form>
                    {/* Speed Content Section */}
                    <div>
                        <h2>{language === "en" ? "Speed Content Section" : "Snelheid Inhoud Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Content Heading (NL)" : "Inhoud Kop (NL)"}</label>
                            <Field name="page.speedContentSection.contentHeading_NL" />
                            <ErrorMessage name="page.speedContentSection.contentHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Heading (EN)" : "Inhoud Kop (EN)"}</label>
                            <Field name="page.speedContentSection.contentHeading_EN" />
                            <ErrorMessage name="page.speedContentSection.contentHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Heading (FR)" : "Inhoud Kop (FR)"}</label>
                            <Field name="page.speedContentSection.contentHeading_FR" />
                            <ErrorMessage name="page.speedContentSection.contentHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Heading (DE)" : "Inhoud Kop (DE)"}</label>
                            <Field name="page.speedContentSection.contentHeading_DE" />
                            <ErrorMessage name="page.speedContentSection.contentHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Heading (ES)" : "Inhoud Kop (ES)"}</label>
                            <Field name="page.speedContentSection.contentHeading_ES" />
                            <ErrorMessage name="page.speedContentSection.contentHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (NL)" : "Inhoud Tekst (NL)"}</label>
                            <Field name="page.speedContentSection.contentText_NL" as="textarea" />
                            <ErrorMessage name="page.speedContentSection.contentText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (EN)" : "Inhoud Tekst (EN)"}</label>
                            <Field name="page.speedContentSection.contentText_EN" as="textarea" />
                            <ErrorMessage name="page.speedContentSection.contentText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (FR)" : "Inhoud Tekst (FR)"}</label>
                            <Field name="page.speedContentSection.contentText_FR" as="textarea" />
                            <ErrorMessage name="page.speedContentSection.contentText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (DE)" : "Inhoud Tekst (DE)"}</label>
                            <Field name="page.speedContentSection.contentText_DE" as="textarea" />
                            <ErrorMessage name="page.speedContentSection.contentText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content Text (ES)" : "Inhoud Tekst (ES)"}</label>
                            <Field name="page.speedContentSection.contentText_ES" as="textarea" />
                            <ErrorMessage name="page.speedContentSection.contentText_ES" component="div" />
                        </div>
                    </div>

                    {/* Speed Hero Section */}
                    <div>
                        <h2>{language === "en" ? "Speed Hero Section" : "Snelheid Hero Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Banner Heading (NL)" : "Banner Kop (NL)"}</label>
                            <Field name="page.speedHeroSection.bannerHeading_NL" />
                            <ErrorMessage name="page.speedHeroSection.bannerHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading (EN)" : "Banner Kop (EN)"}</label>
                            <Field name="page.speedHeroSection.bannerHeading_EN" />
                            <ErrorMessage name="page.speedHeroSection.bannerHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading (FR)" : "Banner Kop (FR)"}</label>
                            <Field name="page.speedHeroSection.bannerHeading_FR" />
                            <ErrorMessage name="page.speedHeroSection.bannerHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading (DE)" : "Banner Kop (DE)"}</label>
                            <Field name="page.speedHeroSection.bannerHeading_DE" />
                            <ErrorMessage name="page.speedHeroSection.bannerHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Heading (ES)" : "Banner Kop (ES)"}</label>
                            <Field name="page.speedHeroSection.bannerHeading_ES" />
                            <ErrorMessage name="page.speedHeroSection.bannerHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (NL)" : "Banner Tekst (NL)"}</label>
                            <Field name="page.speedHeroSection.bannerText_NL" as="textarea" />
                            <ErrorMessage name="page.speedHeroSection.bannerText_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (EN)" : "Banner Tekst (EN)"}</label>
                            <Field name="page.speedHeroSection.bannerText_EN" as="textarea" />
                            <ErrorMessage name="page.speedHeroSection.bannerText_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (FR)" : "Banner Tekst (FR)"}</label>
                            <Field name="page.speedHeroSection.bannerText_FR" as="textarea" />
                            <ErrorMessage name="page.speedHeroSection.bannerText_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (DE)" : "Banner Tekst (DE)"}</label>
                            <Field name="page.speedHeroSection.bannerText_DE" as="textarea" />
                            <ErrorMessage name="page.speedHeroSection.bannerText_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Text (ES)" : "Banner Tekst (ES)"}</label>
                            <Field name="page.speedHeroSection.bannerText_ES" as="textarea" />
                            <ErrorMessage name="page.speedHeroSection.bannerText_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Banner Background Image" : "Banner Achtergrondafbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.speedHeroSection.bannerBgImage.node.mediaItemUrl" />
                            {values.page.speedHeroSection.bannerBgImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.speedHeroSection.bannerBgImage.node.mediaItemUrl}
                                    alt="Banner Background"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.speedHeroSection.bannerBgImage.node.mediaItemUrl" component="div" />
                        </div>
                        {formData.page.speedHeroSection.bannerSubHeading.map((_, index) => (
                            <div key={index}>
                                <label>{language === "en" ? `Banner SubHeading Line ${index + 1} (NL)` : `Banner Subkop Regel ${index + 1} (NL)`}</label>
                                <Field name={`page.speedHeroSection.bannerSubHeading[${index}].line_NL`} />
                                <ErrorMessage name={`page.speedHeroSection.bannerSubHeading[${index}].line_NL`} component="div" />
                                <label>{language === "en" ? `Banner SubHeading Line ${index + 1} (EN)` : `Banner Subkop Regel ${index + 1} (EN)`}</label>
                                <Field name={`page.speedHeroSection.bannerSubHeading[${index}].line_EN`} />
                                <ErrorMessage name={`page.speedHeroSection.bannerSubHeading[${index}].line_EN`} component="div" />
                                <label>{language === "en" ? `Banner SubHeading Line ${index + 1} (FR)` : `Banner Subkop Regel ${index + 1} (FR)`}</label>
                                <Field name={`page.speedHeroSection.bannerSubHeading[${index}].line_FR`} />
                                <ErrorMessage name={`page.speedHeroSection.bannerSubHeading[${index}].line_FR`} component="div" />
                                <label>{language === "en" ? `Banner SubHeading Line ${index + 1} (DE)` : `Banner Subkop Regel ${index + 1} (DE)`}</label>
                                <Field name={`page.speedHeroSection.bannerSubHeading[${index}].line_DE`} />
                                <ErrorMessage name={`page.speedHeroSection.bannerSubHeading[${index}].line_DE`} component="div" />
                                <label>{language === "en" ? `Banner SubHeading Line ${index + 1} (ES)` : `Banner Subkop Regel ${index + 1} (ES)`}</label>
                                <Field name={`page.speedHeroSection.bannerSubHeading[${index}].line_ES`} />
                                <ErrorMessage name={`page.speedHeroSection.bannerSubHeading[${index}].line_ES`} component="div" />
                            </div>
                        ))}
                    </div>

                    {/* Speed Slider Section */}
                    <div>
                        <h2>{language === "en" ? "Speed Slider Section" : "Snelheid Slider Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Slider Title (NL)" : "Slider Titel (NL)"}</label>
                            <Field name="page.speedSliderSection.sliderTitle_NL" />
                            <ErrorMessage name="page.speedSliderSection.sliderTitle_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Title (EN)" : "Slider Titel (EN)"}</label>
                            <Field name="page.speedSliderSection.sliderTitle_EN" />
                            <ErrorMessage name="page.speedSliderSection.sliderTitle_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Title (FR)" : "Slider Titel (FR)"}</label>
                            <Field name="page.speedSliderSection.sliderTitle_FR" />
                            <ErrorMessage name="page.speedSliderSection.sliderTitle_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Title (DE)" : "Slider Titel (DE)"}</label>
                            <Field name="page.speedSliderSection.sliderTitle_DE" />
                            <ErrorMessage name="page.speedSliderSection.sliderTitle_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Title (ES)" : "Slider Titel (ES)"}</label>
                            <Field name="page.speedSliderSection.sliderTitle_ES" />
                            <ErrorMessage name="page.speedSliderSection.sliderTitle_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Subtitle (NL)" : "Slider Ondertitel (NL)"}</label>
                            <Field name="page.speedSliderSection.slidersubtitle_NL" />
                            <ErrorMessage name="page.speedSliderSection.slidersubtitle_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Subtitle (EN)" : "Slider Ondertitel (EN)"}</label>
                            <Field name="page.speedSliderSection.slidersubtitle_EN" />
                            <ErrorMessage name="page.speedSliderSection.slidersubtitle_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Subtitle (FR)" : "Slider Ondertitel (FR)"}</label>
                            <Field name="page.speedSliderSection.slidersubtitle_FR" />
                            <ErrorMessage name="page.speedSliderSection.slidersubtitle_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Subtitle (DE)" : "Slider Ondertitel (DE)"}</label>
                            <Field name="page.speedSliderSection.slidersubtitle_DE" />
                            <ErrorMessage name="page.speedSliderSection.slidersubtitle_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Slider Subtitle (ES)" : "Slider Ondertitel (ES)"}</label>
                            <Field name="page.speedSliderSection.slidersubtitle_ES" />
                            <ErrorMessage name="page.speedSliderSection.slidersubtitle_ES" component="div" />
                        </div>
                        {formData.page.speedSliderSection.sliderItems.map((_, index) => (
                            <div key={index}>
                                <label>{language === "en" ? `Slider Image ${index + 1}` : `Slider Afbeelding ${index + 1}`}</label>
                                <ImageDropzone setFieldValue={setFieldValue} fieldName={`page.speedSliderSection.sliderItems[${index}].image.node.mediaItemUrl`} />
                                {values.page.speedSliderSection.sliderItems[index].image.node.mediaItemUrl && (
                                    <img
                                        src={values.page.speedSliderSection.sliderItems[index].image.node.mediaItemUrl}
                                        alt={`Slider Image ${index + 1}`}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                )}
                                <ErrorMessage name={`page.speedSliderSection.sliderItems[${index}].image.node.mediaItemUrl`} component="div" />

                                <label>{language === "en" ? `Slider Mobile Image ${index + 1}` : `Slider Mobiele Afbeelding ${index + 1}`}</label>
                                <ImageDropzone setFieldValue={setFieldValue} fieldName={`page.speedSliderSection.sliderItems[${index}].mobileImage.node.mediaItemUrl`} />
                                {values.page.speedSliderSection.sliderItems[index].mobileImage.node.mediaItemUrl && (
                                    <img
                                        src={values.page.speedSliderSection.sliderItems[index].mobileImage.node.mediaItemUrl}
                                        alt={`Slider Mobile Image ${index + 1}`}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                )}
                                <ErrorMessage name={`page.speedSliderSection.sliderItems[${index}].mobileImage.node.mediaItemUrl`} component="div" />
                            </div>
                        ))}
                    </div>

                    {/* Speed Slider Content Section */}
                    <div>
                        <h2>{language === "en" ? "Speed Slider Content Section" : "Snelheid Slider Inhoud Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Content 2 SubHeading (NL)" : "Inhoud 2 Subkop (NL)"}</label>
                            <Field name="page.speedSliderContentSection.content2SubHeading_NL" />
                            <ErrorMessage name="page.speedSliderContentSection.content2SubHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 SubHeading (EN)" : "Inhoud 2 Subkop (EN)"}</label>
                            <Field name="page.speedSliderContentSection.content2SubHeading_EN" />
                            <ErrorMessage name="page.speedSliderContentSection.content2SubHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 SubHeading (FR)" : "Inhoud 2 Subkop (FR)"}</label>
                            <Field name="page.speedSliderContentSection.content2SubHeading_FR" />
                            <ErrorMessage name="page.speedSliderContentSection.content2SubHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 SubHeading (DE)" : "Inhoud 2 Subkop (DE)"}</label>
                            <Field name="page.speedSliderContentSection.content2SubHeading_DE" />
                            <ErrorMessage name="page.speedSliderContentSection.content2SubHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 SubHeading (ES)" : "Inhoud 2 Subkop (ES)"}</label>
                            <Field name="page.speedSliderContentSection.content2SubHeading_ES" />
                            <ErrorMessage name="page.speedSliderContentSection.content2SubHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Heading (NL)" : "Inhoud 2 Kop (NL)"}</label>
                            <Field name="page.speedSliderContentSection.content2Heading_NL" />
                            <ErrorMessage name="page.speedSliderContentSection.content2Heading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Heading (EN)" : "Inhoud 2 Kop (EN)"}</label>
                            <Field name="page.speedSliderContentSection.content2Heading_EN" />
                            <ErrorMessage name="page.speedSliderContentSection.content2Heading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Heading (FR)" : "Inhoud 2 Kop (FR)"}</label>
                            <Field name="page.speedSliderContentSection.content2Heading_FR" />
                            <ErrorMessage name="page.speedSliderContentSection.content2Heading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Heading (DE)" : "Inhoud 2 Kop (DE)"}</label>
                            <Field name="page.speedSliderContentSection.content2Heading_DE" />
                            <ErrorMessage name="page.speedSliderContentSection.content2Heading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Heading (ES)" : "Inhoud 2 Kop (ES)"}</label>
                            <Field name="page.speedSliderContentSection.content2Heading_ES" />
                            <ErrorMessage name="page.speedSliderContentSection.content2Heading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Text (NL)" : "Inhoud 2 Tekst (NL)"}</label>
                            <Field name="page.speedSliderContentSection.content2Text_NL" as="textarea" />
                            <ErrorMessage name="page.speedSliderContentSection.content2Text_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Text (EN)" : "Inhoud 2 Tekst (EN)"}</label>
                            <Field name="page.speedSliderContentSection.content2Text_EN" as="textarea" />
                            <ErrorMessage name="page.speedSliderContentSection.content2Text_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Text (FR)" : "Inhoud 2 Tekst (FR)"}</label>
                            <Field name="page.speedSliderContentSection.content2Text_FR" as="textarea" />
                            <ErrorMessage name="page.speedSliderContentSection.content2Text_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Text (DE)" : "Inhoud 2 Tekst (DE)"}</label>
                            <Field name="page.speedSliderContentSection.content2Text_DE" as="textarea" />
                            <ErrorMessage name="page.speedSliderContentSection.content2Text_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Content 2 Text (ES)" : "Inhoud 2 Tekst (ES)"}</label>
                            <Field name="page.speedSliderContentSection.content2Text_ES" as="textarea" />
                            <ErrorMessage name="page.speedSliderContentSection.content2Text_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Gallery Heading (NL)" : "Galerij Kop (NL)"}</label>
                            <Field name="page.speedSliderContentSection.galleryHeading_NL" />
                            <ErrorMessage name="page.speedSliderContentSection.galleryHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Gallery Heading (EN)" : "Galerij Kop (EN)"}</label>
                            <Field name="page.speedSliderContentSection.galleryHeading_EN" />
                            <ErrorMessage name="page.speedSliderContentSection.galleryHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Gallery Heading (FR)" : "Galerij Kop (FR)"}</label>
                            <Field name="page.speedSliderContentSection.galleryHeading_FR" />
                            <ErrorMessage name="page.speedSliderContentSection.galleryHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Gallery Heading (DE)" : "Galerij Kop (DE)"}</label>
                            <Field name="page.speedSliderContentSection.galleryHeading_DE" />
                            <ErrorMessage name="page.speedSliderContentSection.galleryHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Gallery Heading (ES)" : "Galerij Kop (ES)"}</label>
                            <Field name="page.speedSliderContentSection.galleryHeading_ES" />
                            <ErrorMessage name="page.speedSliderContentSection.galleryHeading_ES" component="div" />
                        </div>
                    </div>

                    {/* Speed Project Card Section */}
                    <div>
                        <h2>{language === "en" ? "Speed Project Card Section" : "Snelheid Projectkaart Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "Load More (NL)" : "Laad Meer (NL)"}</label>
                            <Field name="page.speedProjectCardSection.loadMore_NL" />
                            <ErrorMessage name="page.speedProjectCardSection.loadMore_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Load More (EN)" : "Laad Meer (EN)"}</label>
                            <Field name="page.speedProjectCardSection.loadMore_EN" />
                            <ErrorMessage name="page.speedProjectCardSection.loadMore_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Load More (FR)" : "Laad Meer (FR)"}</label>
                            <Field name="page.speedProjectCardSection.loadMore_FR" />
                            <ErrorMessage name="page.speedProjectCardSection.loadMore_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Load More (DE)" : "Laad Meer (DE)"}</label>
                            <Field name="page.speedProjectCardSection.loadMore_DE" />
                            <ErrorMessage name="page.speedProjectCardSection.loadMore_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Load More (ES)" : "Laad Meer (ES)"}</label>
                            <Field name="page.speedProjectCardSection.loadMore_ES" />
                            <ErrorMessage name="page.speedProjectCardSection.loadMore_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Project Heading (NL)" : "Project Kop (NL)"}</label>
                            <Field name="page.speedProjectCardSection.projectHeading_NL" />
                            <ErrorMessage name="page.speedProjectCardSection.projectHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Project Heading (EN)" : "Project Kop (EN)"}</label>
                            <Field name="page.speedProjectCardSection.projectHeading_EN" />
                            <ErrorMessage name="page.speedProjectCardSection.projectHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Project Heading (FR)" : "Project Kop (FR)"}</label>
                            <Field name="page.speedProjectCardSection.projectHeading_FR" />
                            <ErrorMessage name="page.speedProjectCardSection.projectHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Project Heading (DE)" : "Project Kop (DE)"}</label>
                            <Field name="page.speedProjectCardSection.projectHeading_DE" />
                            <ErrorMessage name="page.speedProjectCardSection.projectHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Project Heading (ES)" : "Project Kop (ES)"}</label>
                            <Field name="page.speedProjectCardSection.projectHeading_ES" />
                            <ErrorMessage name="page.speedProjectCardSection.projectHeading_ES" component="div" />
                        </div>
                    </div>

                    {/* Speed Gallery Section */}
                    <div>
                        <h2>{language === "en" ? "Speed Gallery Section" : "Snelheid Galerij Sectie"}</h2>
                        {formData.page.speedGallerySectionn.galleryItems.map((_, index) => (
                            <div key={index}>
                                <label>{language === "en" ? `Gallery Item Subtitle ${index + 1} (NL)` : `Galerij Item Subtitel ${index + 1} (NL)`}</label>
                                <Field name={`page.speedGallerySectionn.galleryItems[${index}].subTitle_NL`} />
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].subTitle_NL`} component="div" />

                                <label>{language === "en" ? `Gallery Item Subtitle ${index + 1} (EN)` : `Galerij Item Subtitel ${index + 1} (EN)`}</label>
                                <Field name={`page.speedGallerySectionn.galleryItems[${index}].subTitle_EN`} />
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].subTitle_EN`} component="div" />

                                <label>{language === "en" ? `Gallery Item Subtitle ${index + 1} (FR)` : `Galerij Item Subtitel ${index + 1} (FR)`}</label>
                                <Field name={`page.speedGallerySectionn.galleryItems[${index}].subTitle_FR`} />
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].subTitle_FR`} component="div" />

                                <label>{language === "en" ? `Gallery Item Subtitle ${index + 1} (DE)` : `Galerij Item Subtitel ${index + 1} (DE)`}</label>
                                <Field name={`page.speedGallerySectionn.galleryItems[${index}].subTitle_DE`} />
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].subTitle_DE`} component="div" />

                                <label>{language === "en" ? `Gallery Item Subtitle ${index + 1} (ES)` : `Galerij Item Subtitel ${index + 1} (ES)`}</label>
                                <Field name={`page.speedGallerySectionn.galleryItems[${index}].subTitle_ES`} />
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].subTitle_ES`} component="div" />

                                <label>{language === "en" ? `Gallery Item Title ${index + 1} (NL)` : `Galerij Item Titel ${index + 1} (NL)`}</label>
                                <Field name={`page.speedGallerySectionn.galleryItems[${index}].title_NL`} />
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].title_NL`} component="div" />

                                <label>{language === "en" ? `Gallery Item Title ${index + 1} (EN)` : `Galerij Item Titel ${index + 1} (EN)`}</label>
                                <Field name={`page.speedGallerySectionn.galleryItems[${index}].title_EN`} />
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].title_EN`} component="div" />

                                <label>{language === "en" ? `Gallery Item Title ${index + 1} (FR)` : `Galerij Item Titel ${index + 1} (FR)`}</label>
                                <Field name={`page.speedGallerySectionn.galleryItems[${index}].title_FR`} />
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].title_FR`} component="div" />

                                <label>{language === "en" ? `Gallery Item Title ${index + 1} (DE)` : `Galerij Item Titel ${index + 1} (DE)`}</label>
                                <Field name={`page.speedGallerySectionn.galleryItems[${index}].title_DE`} />
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].title_DE`} component="div" />

                                <label>{language === "en" ? `Gallery Item Title ${index + 1} (ES)` : `Galerij Item Titel ${index + 1} (ES)`}</label>
                                <Field name={`page.speedGallerySectionn.galleryItems[${index}].title_ES`} />
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].title_ES`} component="div" />

                                <label>{language === "en" ? `Gallery Item Image ${index + 1}` : `Galerij Item Afbeelding ${index + 1}`}</label>
                                <ImageDropzone setFieldValue={setFieldValue} fieldName={`page.speedGallerySectionn.galleryItems[${index}].image.node.mediaItemUrl`} />
                                {values.page.speedGallerySectionn.galleryItems[index].image.node.mediaItemUrl && (
                                    <img
                                        src={values.page.speedGallerySectionn.galleryItems[index].image.node.mediaItemUrl}
                                        alt={`Gallery Item Image ${index + 1}`}
                                        style={{ width: "100px", height: "100px" }}
                                    />
                                )}
                                <ErrorMessage name={`page.speedGallerySectionn.galleryItems[${index}].image.node.mediaItemUrl`} component="div" />
                            </div>
                        ))}
                    </div>

                    {/* Speed CTA Section */}
                    <div>
                        <h2>{language === "en" ? "Speed CTA Section" : "Snelheid CTA Sectie"}</h2>
                        <div>
                            <label>{language === "en" ? "CTA Heading (NL)" : "CTA Kop (NL)"}</label>
                            <Field name="page.speedCtaSection.ctaHeading_NL" />
                            <ErrorMessage name="page.speedCtaSection.ctaHeading_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Heading (EN)" : "CTA Kop (EN)"}</label>
                            <Field name="page.speedCtaSection.ctaHeading_EN" />
                            <ErrorMessage name="page.speedCtaSection.ctaHeading_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Heading (FR)" : "CTA Kop (FR)"}</label>
                            <Field name="page.speedCtaSection.ctaHeading_FR" />
                            <ErrorMessage name="page.speedCtaSection.ctaHeading_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Heading (DE)" : "CTA Kop (DE)"}</label>
                            <Field name="page.speedCtaSection.ctaHeading_DE" />
                            <ErrorMessage name="page.speedCtaSection.ctaHeading_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Heading (ES)" : "CTA Kop (ES)"}</label>
                            <Field name="page.speedCtaSection.ctaHeading_ES" />
                            <ErrorMessage name="page.speedCtaSection.ctaHeading_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Text (NL)" : "CTA Tekst (NL)"}</label>
                            <Field name="page.speedCtaSection.ctatext_NL" as="textarea" />
                            <ErrorMessage name="page.speedCtaSection.ctatext_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Text (EN)" : "CTA Tekst (EN)"}</label>
                            <Field name="page.speedCtaSection.ctatext_EN" as="textarea" />
                            <ErrorMessage name="page.speedCtaSection.ctatext_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Text (FR)" : "CTA Tekst (FR)"}</label>
                            <Field name="page.speedCtaSection.ctatext_FR" as="textarea" />
                            <ErrorMessage name="page.speedCtaSection.ctatext_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Text (DE)" : "CTA Tekst (DE)"}</label>
                            <Field name="page.speedCtaSection.ctatext_DE" as="textarea" />
                            <ErrorMessage name="page.speedCtaSection.ctatext_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Text (ES)" : "CTA Tekst (ES)"}</label>
                            <Field name="page.speedCtaSection.ctatext_ES" as="textarea" />
                            <ErrorMessage name="page.speedCtaSection.ctatext_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button (NL)" : "CTA Knop (NL)"}</label>
                            <Field name="page.speedCtaSection.ctaButton_NL" />
                            <ErrorMessage name="page.speedCtaSection.ctaButton_NL" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button (EN)" : "CTA Knop (EN)"}</label>
                            <Field name="page.speedCtaSection.ctaButton_EN" />
                            <ErrorMessage name="page.speedCtaSection.ctaButton_EN" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button (FR)" : "CTA Knop (FR)"}</label>
                            <Field name="page.speedCtaSection.ctaButton_FR" />
                            <ErrorMessage name="page.speedCtaSection.ctaButton_FR" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button (DE)" : "CTA Knop (DE)"}</label>
                            <Field name="page.speedCtaSection.ctaButton_DE" />
                            <ErrorMessage name="page.speedCtaSection.ctaButton_DE" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Button (ES)" : "CTA Knop (ES)"}</label>
                            <Field name="page.speedCtaSection.ctaButton_ES" />
                            <ErrorMessage name="page.speedCtaSection.ctaButton_ES" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Image" : "CTA Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.speedCtaSection.ctaImage.node.mediaItemUrl" />
                            {values.page.speedCtaSection.ctaImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.speedCtaSection.ctaImage.node.mediaItemUrl}
                                    alt="CTA"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.speedCtaSection.ctaImage.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "CTA Mobile Image" : "CTA Mobiele Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.speedCtaSection.ctaImageMobile.node.mediaItemUrl" />
                            {values.page.speedCtaSection.ctaImageMobile.node.mediaItemUrl && (
                                <img
                                    src={values.page.speedCtaSection.ctaImageMobile.node.mediaItemUrl}
                                    alt="CTA Mobile"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.speedCtaSection.ctaImageMobile.node.mediaItemUrl" component="div" />
                        </div>
                        <div>
                            <label>{language === "en" ? "Signature Image" : "Handtekening Afbeelding"}</label>
                            <ImageDropzone setFieldValue={setFieldValue} fieldName="page.speedCtaSection.signatureImage.node.mediaItemUrl" />
                            {values.page.speedCtaSection.signatureImage.node.mediaItemUrl && (
                                <img
                                    src={values.page.speedCtaSection.signatureImage.node.mediaItemUrl}
                                    alt="Signature"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                            <ErrorMessage name="page.speedCtaSection.signatureImage.node.mediaItemUrl" component="div" />
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

export default Speed;
