"use client";

import { useState, useEffect } from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useDropzone } from "react-dropzone";
import * as Yup from "yup";
import { useRouter, useParams } from "next/navigation";
import { FaChevronLeft } from "react-icons/fa";
import { uploadImageAndGetUrl } from "@/app/lib/UploadImageGetUrl";

const AddCars = () => {
  const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
  const router = useRouter();
  const { slug } = useParams();
  const [bannerImage, setBannerImage] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    slug: "",
    carCategories: {
      nodes: [{ databaseId: "" }],
    },
    seo: {
      metaDesc: "",
      title: "",
      metaRobotsNofollow: "follow",
      metaRobotsNoindex: "index",
    },
    heroSection: {
      bannerBgImage: {
        node: {
          mediaItemUrl: "",
        },
      },
      bannerText: [{ line: "" }],
    },
    featureSection: {
      type: "",
      motor: "",
      body: "",
      constructionYear: "",
      kmStand: "",
      colour: "",
      status: "",
      price: "",
    },
    sliderSection: {
      sliderItems: [
        {
          image: {
            node: {
              mediaItemUrl: "",
            },
          },
          mobileImage: "",
          text: "",
        },
      ],
    },
    detailsSection: {
      descriptionTitle_NL: "",
      descriptionTitle_EN: "",
      descriptionTitle_FR: "",
      descriptionTitle_DE: "",
      descriptionTitle_ES: "",
      description_NL: "",
      description_EN: "",
      description_FR: "",
      description_DE: "",
      description_ES: "",
      highlightsTitle_NL: "",
      highlightsTitle_EN: "",
      highlightsTitle_FR: "",
      highlightsTitle_DE: "",
      highlightsTitle_ES: "",
      motorHighHeading_NL: "",
      motorHighHeading_EN: "",
      motorHighHeading_FR: "",
      motorHighHeading_DE: "",
      motorHighHeading_ES: "",
      motorHighlights_NL: "",
      motorHighlights_EN: "",
      motorHighlights_FR: "",
      motorHighlights_DE: "",
      motorHighlights_ES: "",
      exteriorHighheading_NL: "",
      exteriorHighheading_EN: "",
      exteriorHighheading_FR: "",
      exteriorHighheading_DE: "",
      exteriorHighheading_ES: "",
      exteriorHighlights_NL: "",
      exteriorHighlights_EN: "",
      exteriorHighlights_FR: "",
      exteriorHighlights_DE: "",
      exteriorHighlights_ES: "",
      interiorHighHeading_NL: "",
      interiorHighHeading_EN: "",
      interiorHighHeading_FR: "",
      interiorHighHeading_DE: "",
      interiorHighHeading_ES: "",
      interiorhighlights_NL: "",
      interiorhighlights_EN: "",
      interiorhighlights_FR: "",
      interiorhighlights_DE: "",
      interiorhighlights_ES: "",
      safetyHighHeading_NL: "",
      safetyHighHeading_EN: "",
      safetyHighHeading_FR: "",
      safetyHighHeading_DE: "",
      safetyHighHeading_ES: "",
      safetyHighlights_NL: "",
      safetyHighlights_EN: "",
      safetyHighlights_FR: "",
      safetyHighlights_DE: "",
      safetyHighlights_ES: "",
    },
  });

  const [categories, setCategories] = useState([]);
  const [language, setLanguage] = useState(typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${baseURL}/collectioncarcategory`);
        if (!response.ok) throw new Error("Failed to fetch categories");

        const data = await response.json();
        const categoriesData = (data.collectionCarCategorySection?.nodes || []).filter(
          (category) => category.name !== "Inruilers"
        );
        setCategories(categoriesData);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, [baseURL]);

  useEffect(() => {
    if (slug) {
      const fetchCarData = async () => {
        try {
          const response = await fetch(`${baseURL}/caradd/${slug}`);
          if (!response.ok) throw new Error("Failed to fetch car data");

          const data = await response.json();
          setFormData(data.data.car);
        } catch (error) {
          console.error("Error fetching car data:", error);
        }
      };

      fetchCarData();
    }
  }, [slug, baseURL]);

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

  const {
    getRootProps: getBannerRootProps,
    getInputProps: getBannerInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setBannerImage(acceptedFiles[0]);
    },
  });

  const {
    getRootProps: getSliderRootProps,
    getInputProps: getSliderInputProps,
  } = useDropzone({
    onDrop: (acceptedFiles) => {
      setSliderImages((prevImages) => [...prevImages, ...acceptedFiles]);
    },
  });

  const removeSliderImage = (index) => {
    setSliderImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  return (
    <div>
      <button
        style={{
          border: "none",
          background: "transparent",
          paddingTop: "10px",
          cursor: "pointer",
          display: "flex",
          fontSize: "2rem",
          fontWeight: "bold",
          color: "#D0AF53",
        }}
        onClick={() => router.push("/admin/cars")}
      >
        <FaChevronLeft color="#D0AF53" size={24} />
        {language === "en" ? "Cars" : "Auto's"}
      </button>
      <Formik
        enableReinitialize
        initialValues={formData}
        onSubmit={async (values, { resetForm }) => {
          console.log("Submitting form...");
          setIsLoading(true);
          try {
            console.log("Form values:", values); // Log form values

            // Upload banner image and get URL
            if (bannerImage) {
              const [bannerImageUrl] = await uploadImageAndGetUrl(bannerImage);
              values.heroSection.bannerBgImage.node.mediaItemUrl =
                bannerImageUrl;
            }

            // Upload slider images and get URLs
            const sliderImageUrls = await Promise.all(
              sliderImages.map(async (imageFile) => {
                const [imageUrl] = await uploadImageAndGetUrl(imageFile);
                return imageUrl;
              })
            );

            values.sliderSection.sliderItems = sliderImageUrls.map(
              (url, index) => ({
                ...values.sliderSection.sliderItems[index],
                image: { node: { mediaItemUrl: url } },
              })
            );

            const method = slug ? "PUT" : "POST";
            const response = await fetch(`${baseURL}/caradd${slug ? `/${slug}` : ""}`, {
              method,
              body: JSON.stringify(values),
              headers: {
                "Content-Type": "application/json",
              },
            });

            if (!response.ok) {
              const errorData = await response.json();
              console.error("Error adding/updating car:", errorData);
              alert(`Error: ${errorData.message || "Failed to add/update car"}`);
              return;
            }

            // Handle success
            const responseData = await response.json();
            console.log("Car added/updated successfully:", responseData);
            alert(`Car ${slug ? "updated" : "added"} successfully!`);
            router.push('/admin/cars'); // Navigates to /about
            resetForm(); // Reset the form after submission
            setBannerImage(null); // Clear banner image
            setSliderImages([]); // Clear slider images
            setIsLoading(false);
            if (!slug) router.push("/admin/cars");
          } catch (error) {
            console.error("Submission error:", error);
            alert("An unexpected error occurred. Please try again.");
            setIsLoading(false);
          }
        }}
      >
        {({ values }) => (
          <Form className="add-cars-form">
            <div className="form-group">
              <label htmlFor="slug">{language === "en" ? "Car Title" : "Auto Title"}</label>
              <Field
                id="slug"
                name="slug"
                className="form-control"
                placeholder={language === "en" ? "Enter car slug" : "Voer auto slug in"}
              />
              <ErrorMessage name="slug" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="category">{language === "en" ? "Car Category" : "Autocategorie"}</label>
              <Field
                as="select"
                id="category"
                name="carCategories.nodes[0].databaseId"
                className="form-control"
              >
                <option value="">{language === "en" ? "Select a category" : "Selecteer een categorie"}</option>
                {categories.map((category, i) => (
                  <option key={i} value={category.databaseId}>
                    {category.name}
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="carCategories.nodes[0].databaseId"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label>{language === "en" ? "Upload Banner Background Image" : "Upload Banner Achtergrondafbeelding"}</label>
              <div {...getBannerRootProps({ className: "dropzone" })}>
                <input {...getBannerInputProps()} />
                <p style={{ margin: "0" }}>
                  {language === "en" ? "Drag & drop a file here, or click to select a file" : "Sleep een bestand hierheen of klik om een bestand te selecteren"}
                </p>
              </div>
              {bannerImage && (
                <div className="uploaded-image">
                  <img
                    src={URL.createObjectURL(bannerImage)}
                    alt="Banner"
                    className="image-preview"
                    style={{ width: "80px" }}
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={() => setBannerImage(null)}
                    style={{
                      backgroundColor: "transparent",
                      border: "none",
                      color: "red",
                      cursor: "pointer",
                    }}
                  >
                    {language === "en" ? "Delete" : "Verwijderen"}
                  </button>
                </div>
              )}
            </div>

            {values.heroSection.bannerText.map((text, textIndex) => (
              <div className="form-group" key={textIndex}>
                <label htmlFor={`bannerText-${textIndex}`}>
                  {language === "en" ? `Banner Text Line ${textIndex + 1}` : `Banner Tekst Regel ${textIndex + 1}`}
                </label>
                <Field
                  id={`bannerText-${textIndex}`}
                  name={`heroSection.bannerText[${textIndex}].line`}
                  className="form-control"
                  placeholder={language === "en" ? `Enter banner text line ${textIndex + 1}` : `Voer banner tekst regel ${textIndex + 1} in`}
                />
                <ErrorMessage
                  name={`heroSection.bannerText[${textIndex}].line`}
                  component="div"
                  className="error"
                />
              </div>
            ))}

            <div className="form-group">
              <label htmlFor="seoTitle">{language === "en" ? "SEO Title" : "SEO Titel"}</label>
              <Field
                id="seoTitle"
                name="seo.title"
                className="form-control"
                placeholder={language === "en" ? "Enter SEO title" : "Voer SEO titel in"}
              />
              <ErrorMessage name="seo.title" component="div" className="error" />
            </div>

            <div className="form-group">
              <label htmlFor="featureType">{language === "en" ? "Type" : "Type"}</label>
              <Field
                id="featureType"
                name="featureSection.type"
                className="form-control"
                placeholder={language === "en" ? "Enter feature type" : "Voer kenmerk type in"}
              />
              <ErrorMessage
                name="featureSection.type"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="featureMotor">{language === "en" ? "Motor" : "Motor"}</label>
              <Field
                id="featureMotor"
                name="featureSection.motor"
                className="form-control"
                placeholder={language === "en" ? "Enter feature motor" : "Voer kenmerk motor in"}
              />
              <ErrorMessage
                name="featureSection.motor"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="featureBody">{language === "en" ? "Body" : "Carrosserie"}</label>
              <Field
                id="featureBody"
                name="featureSection.body"
                className="form-control"
                placeholder={language === "en" ? "Enter feature body" : "Voer kenmerk carrosserie in"}
              />
              <ErrorMessage
                name="featureSection.body"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="featureConstructionYear">
                {language === "en" ? "Construction Year" : "Bouwjaar"}
              </label>
              <Field
                id="featureConstructionYear"
                name="featureSection.constructionYear"
                className="form-control"
                placeholder={language === "en" ? "Enter feature construction year" : "Voer kenmerk bouwjaar in"}
              />
              <ErrorMessage
                name="featureSection.constructionYear"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="featureKmStand">{language === "en" ? "KM Stand" : "KM Stand"}</label>
              <Field
                id="featureKmStand"
                name="featureSection.kmStand"
                className="form-control"
                placeholder={language === "en" ? "Enter feature kilometers" : "Voer kenmerk kilometers in"}
              />
              <ErrorMessage
                name="featureSection.kmStand"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="featureColour">{language === "en" ? "Colour" : "Kleur"}</label>
              <Field
                id="featureColour"
                name="featureSection.colour"
                className="form-control"
                placeholder={language === "en" ? "Enter feature colour" : "Voer kenmerk kleur in"}
              />
              <ErrorMessage
                name="featureSection.colour"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="featureStatus">{language === "en" ? "Status" : "Status"}</label>
              <Field
                id="featureStatus"
                name="featureSection.status"
                className="form-control"
                placeholder={language === "en" ? "Enter feature status" : "Voer kenmerk status in"}
              />
              <ErrorMessage
                name="featureSection.status"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="featurePrice">{language === "en" ? "Price" : "Prijs"}</label>
              <Field
                id="featurePrice"
                name="featureSection.price"
                className="form-control"
                placeholder={language === "en" ? "Enter feature price" : "Voer kenmerk prijs in"}
              />
              <ErrorMessage
                name="featureSection.price"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label>{language === "en" ? "Upload Slider Images" : "Upload Slider Afbeeldingen"}</label>
              <div {...getSliderRootProps({ className: "dropzone" })}>
                <input {...getSliderInputProps()} />
                <p style={{ margin: "0" }}>
                  {language === "en" ? "Drag & drop some files here, or click to select files" : "Sleep enkele bestanden hierheen of klik om bestanden te selecteren"}
                </p>
              </div>
              <div
                className="uploaded-images"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(2, 1fr)",
                  gap: "10px",
                }}
              >
                {sliderImages.map((image, idx) => (
                  <div key={idx} className="uploaded-image">
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Uploaded ${idx}`}
                      className="image-preview"
                      style={{ width: "80px" }}
                    />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeSliderImage(idx)}
                      style={{
                        backgroundColor: "transparent",
                        border: "none",
                        color: "red",
                        cursor: "pointer",
                      }}
                    >
                      {language === "en" ? "Delete" : "Verwijderen"}
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="descriptionTitle_NL">{language === "en" ? "Description Title (NL)" : "Beschrijving Titel (NL)"}</label>
              <Field
                id="descriptionTitle_NL"
                name="detailsSection.descriptionTitle_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter description title (NL)" : "Voer beschrijving titel (NL) in"}
              />
              <ErrorMessage
                name="detailsSection.descriptionTitle_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionTitle_EN">Description Title (EN)</label>
              <Field
                id="descriptionTitle_EN"
                name="detailsSection.descriptionTitle_EN"
                className="form-control"
                placeholder="Enter description title (EN)"
              />
              <ErrorMessage
                name="detailsSection.descriptionTitle_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionTitle_FR">Description Title (FR)</label>
              <Field
                id="descriptionTitle_FR"
                name="detailsSection.descriptionTitle_FR"
                className="form-control"
                placeholder="Enter description title (FR)"
              />
              <ErrorMessage
                name="detailsSection.descriptionTitle_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionTitle_DE">Description Title (DE)</label>
              <Field
                id="descriptionTitle_DE"
                name="detailsSection.descriptionTitle_DE"
                className="form-control"
                placeholder="Enter description title (DE)"
              />
              <ErrorMessage
                name="detailsSection.descriptionTitle_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionTitle_ES">Description Title (ES)</label>
              <Field
                id="descriptionTitle_ES"
                name="detailsSection.descriptionTitle_ES"
                className="form-control"
                placeholder="Enter description title (ES)"
              />
              <ErrorMessage
                name="detailsSection.descriptionTitle_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_NL">Description (NL)</label>
              <Field
                id="description_NL"
                name="detailsSection.description_NL"
                className="form-control"
                placeholder="Enter description (NL)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.description_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_EN">Description (EN)</label>
              <Field
                id="description_EN"
                name="detailsSection.description_EN"
                className="form-control"
                placeholder="Enter description (EN)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.description_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_FR">Description (FR)</label>
              <Field
                id="description_FR"
                name="detailsSection.description_FR"
                className="form-control"
                placeholder="Enter description (FR)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.description_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_DE">Description (DE)</label>
              <Field
                id="description_DE"
                name="detailsSection.description_DE"
                className="form-control"
                placeholder="Enter description (DE)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.description_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_ES">Description (ES)</label>
              <Field
                id="description_ES"
                name="detailsSection.description_ES"
                className="form-control"
                placeholder="Enter description (ES)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.description_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="highlightsTitle_NL">Highlights Title (NL)</label>
              <Field
                id="highlightsTitle_NL"
                name="detailsSection.highlightsTitle_NL"
                className="form-control"
                placeholder="Enter highlights title (NL)"
              />
              <ErrorMessage
                name="detailsSection.highlightsTitle_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="highlightsTitle_EN">Highlights Title (EN)</label>
              <Field
                id="highlightsTitle_EN"
                name="detailsSection.highlightsTitle_EN"
                className="form-control"
                placeholder="Enter highlights title (EN)"
              />
              <ErrorMessage
                name="detailsSection.highlightsTitle_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="highlightsTitle_FR">Highlights Title (FR)</label>
              <Field
                id="highlightsTitle_FR"
                name="detailsSection.highlightsTitle_FR"
                className="form-control"
                placeholder="Enter highlights title (FR)"
              />
              <ErrorMessage
                name="detailsSection.highlightsTitle_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="highlightsTitle_DE">Highlights Title (DE)</label>
              <Field
                id="highlightsTitle_DE"
                name="detailsSection.highlightsTitle_DE"
                className="form-control"
                placeholder="Enter highlights title (DE)"
              />
              <ErrorMessage
                name="detailsSection.highlightsTitle_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="highlightsTitle_ES">Highlights Title (ES)</label>
              <Field
                id="highlightsTitle_ES"
                name="detailsSection.highlightsTitle_ES"
                className="form-control"
                placeholder="Enter highlights title (ES)"
              />
              <ErrorMessage
                name="detailsSection.highlightsTitle_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="motorHighHeading_NL">Motor High Heading (NL)</label>
              <Field
                id="motorHighHeading_NL"
                name="detailsSection.motorHighHeading_NL"
                className="form-control"
                placeholder="Enter motor high heading (NL)"
              />
              <ErrorMessage
                name="detailsSection.motorHighHeading_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighHeading_EN">Motor High Heading (EN)</label>
              <Field
                id="motorHighHeading_EN"
                name="detailsSection.motorHighHeading_EN"
                className="form-control"
                placeholder="Enter motor high heading (EN)"
              />
              <ErrorMessage
                name="detailsSection.motorHighHeading_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighHeading_FR">Motor High Heading (FR)</label>
              <Field
                id="motorHighHeading_FR"
                name="detailsSection.motorHighHeading_FR"
                className="form-control"
                placeholder="Enter motor high heading (FR)"
              />
              <ErrorMessage
                name="detailsSection.motorHighHeading_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighHeading_DE">Motor High Heading (DE)</label>
              <Field
                id="motorHighHeading_DE"
                name="detailsSection.motorHighHeading_DE"
                className="form-control"
                placeholder="Enter motor high heading (DE)"
              />
              <ErrorMessage
                name="detailsSection.motorHighHeading_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighHeading_ES">Motor High Heading (ES)</label>
              <Field
                id="motorHighHeading_ES"
                name="detailsSection.motorHighHeading_ES"
                className="form-control"
                placeholder="Enter motor high heading (ES)"
              />
              <ErrorMessage
                name="detailsSection.motorHighHeading_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="motorHighlights_NL">Motor Highlights (NL)</label>
              <Field
                id="motorHighlights_NL"
                name="detailsSection.motorHighlights_NL"
                className="form-control"
                placeholder="Enter motor highlights (NL)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.motorHighlights_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighlights_EN">Motor Highlights (EN)</label>
              <Field
                id="motorHighlights_EN"
                name="detailsSection.motorHighlights_EN"
                className="form-control"
                placeholder="Enter motor highlights (EN)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.motorHighlights_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighlights_FR">Motor Highlights (FR)</label>
              <Field
                id="motorHighlights_FR"
                name="detailsSection.motorHighlights_FR"
                className="form-control"
                placeholder="Enter motor highlights (FR)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.motorHighlights_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighlights_DE">Motor Highlights (DE)</label>
              <Field
                id="motorHighlights_DE"
                name="detailsSection.motorHighlights_DE"
                className="form-control"
                placeholder="Enter motor highlights (DE)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.motorHighlights_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighlights_ES">Motor Highlights (ES)</label>
              <Field
                id="motorHighlights_ES"
                name="detailsSection.motorHighlights_ES"
                className="form-control"
                placeholder="Enter motor highlights (ES)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.motorHighlights_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exteriorHighheading_NL">Exterior High Heading (NL)</label>
              <Field
                id="exteriorHighheading_NL"
                name="detailsSection.exteriorHighheading_NL"
                className="form-control"
                placeholder="Enter exterior high heading (NL)"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighheading_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighheading_EN">Exterior High Heading (EN)</label>
              <Field
                id="exteriorHighheading_EN"
                name="detailsSection.exteriorHighheading_EN"
                className="form-control"
                placeholder="Enter exterior high heading (EN)"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighheading_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighheading_FR">Exterior High Heading (FR)</label>
              <Field
                id="exteriorHighheading_FR"
                name="detailsSection.exteriorHighheading_FR"
                className="form-control"
                placeholder="Enter exterior high heading (FR)"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighheading_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighheading_DE">Exterior High Heading (DE)</label>
              <Field
                id="exteriorHighheading_DE"
                name="detailsSection.exteriorHighheading_DE"
                className="form-control"
                placeholder="Enter exterior high heading (DE)"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighheading_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighheading_ES">Exterior High Heading (ES)</label>
              <Field
                id="exteriorHighheading_ES"
                name="detailsSection.exteriorHighheading_ES"
                className="form-control"
                placeholder="Enter exterior high heading (ES)"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighheading_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="exteriorHighlights_NL">Exterior Highlights (NL)</label>
              <Field
                id="exteriorHighlights_NL"
                name="detailsSection.exteriorHighlights_NL"
                className="form-control"
                placeholder="Enter exterior highlights (NL)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighlights_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighlights_EN">Exterior Highlights (EN)</label>
              <Field
                id="exteriorHighlights_EN"
                name="detailsSection.exteriorHighlights_EN"
                className="form-control"
                placeholder="Enter exterior highlights (EN)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighlights_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighlights_FR">Exterior Highlights (FR)</label>
              <Field
                id="exteriorHighlights_FR"
                name="detailsSection.exteriorHighlights_FR"
                className="form-control"
                placeholder="Enter exterior highlights (FR)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighlights_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighlights_DE">Exterior Highlights (DE)</label>
              <Field
                id="exteriorHighlights_DE"
                name="detailsSection.exteriorHighlights_DE"
                className="form-control"
                placeholder="Enter exterior highlights (DE)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighlights_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighlights_ES">Exterior Highlights (ES)</label>
              <Field
                id="exteriorHighlights_ES"
                name="detailsSection.exteriorHighlights_ES"
                className="form-control"
                placeholder="Enter exterior highlights (ES)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighlights_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="interiorHighHeading_NL">Interior High Heading (NL)</label>
              <Field
                id="interiorHighHeading_NL"
                name="detailsSection.interiorHighHeading_NL"
                className="form-control"
                placeholder="Enter interior high heading (NL)"
              />
              <ErrorMessage
                name="detailsSection.interiorHighHeading_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorHighHeading_EN">Interior High Heading (EN)</label>
              <Field
                id="interiorHighHeading_EN"
                name="detailsSection.interiorHighHeading_EN"
                className="form-control"
                placeholder="Enter interior high heading (EN)"
              />
              <ErrorMessage
                name="detailsSection.interiorHighHeading_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorHighHeading_FR">Interior High Heading (FR)</label>
              <Field
                id="interiorHighHeading_FR"
                name="detailsSection.interiorHighHeading_FR"
                className="form-control"
                placeholder="Enter interior high heading (FR)"
              />
              <ErrorMessage
                name="detailsSection.interiorHighHeading_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorHighHeading_DE">Interior High Heading (DE)</label>
              <Field
                id="interiorHighHeading_DE"
                name="detailsSection.interiorHighHeading_DE"
                className="form-control"
                placeholder="Enter interior high heading (DE)"
              />
              <ErrorMessage
                name="detailsSection.interiorHighHeading_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorHighHeading_ES">Interior High Heading (ES)</label>
              <Field
                id="interiorHighHeading_ES"
                name="detailsSection.interiorHighHeading_ES"
                className="form-control"
                placeholder="Enter interior high heading (ES)"
              />
              <ErrorMessage
                name="detailsSection.interiorHighHeading_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="interiorhighlights_NL">Interior Highlights (NL)</label>
              <Field
                id="interiorhighlights_NL"
                name="detailsSection.interiorhighlights_NL"
                className="form-control"
                placeholder="Enter interior highlights (NL)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.interiorhighlights_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorhighlights_EN">Interior Highlights (EN)</label>
              <Field
                id="interiorhighlights_EN"
                name="detailsSection.interiorhighlights_EN"
                className="form-control"
                placeholder="Enter interior highlights (EN)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.interiorhighlights_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorhighlights_FR">Interior Highlights (FR)</label>
              <Field
                id="interiorhighlights_FR"
                name="detailsSection.interiorhighlights_FR"
                className="form-control"
                placeholder="Enter interior highlights (FR)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.interiorhighlights_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorhighlights_DE">Interior Highlights (DE)</label>
              <Field
                id="interiorhighlights_DE"
                name="detailsSection.interiorhighlights_DE"
                className="form-control"
                placeholder="Enter interior highlights (DE)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.interiorhighlights_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorhighlights_ES">Interior Highlights (ES)</label>
              <Field
                id="interiorhighlights_ES"
                name="detailsSection.interiorhighlights_ES"
                className="form-control"
                placeholder="Enter interior highlights (ES)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.interiorhighlights_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="safetyHighHeading_NL">Safety High Heading (NL)</label>
              <Field
                id="safetyHighHeading_NL"
                name="detailsSection.safetyHighHeading_NL"
                className="form-control"
                placeholder="Enter safety high heading (NL)"
              />
              <ErrorMessage
                name="detailsSection.safetyHighHeading_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighHeading_EN">Safety High Heading (EN)</label>
              <Field
                id="safetyHighHeading_EN"
                name="detailsSection.safetyHighHeading_EN"
                className="form-control"
                placeholder="Enter safety high heading (EN)"
              />
              <ErrorMessage
                name="detailsSection.safetyHighHeading_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighHeading_FR">Safety High Heading (FR)</label>
              <Field
                id="safetyHighHeading_FR"
                name="detailsSection.safetyHighHeading_FR"
                className="form-control"
                placeholder="Enter safety high heading (FR)"
              />
              <ErrorMessage
                name="detailsSection.safetyHighHeading_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighHeading_DE">Safety High Heading (DE)</label>
              <Field
                id="safetyHighHeading_DE"
                name="detailsSection.safetyHighHeading_DE"
                className="form-control"
                placeholder="Enter safety high heading (DE)"
              />
              <ErrorMessage
                name="detailsSection.safetyHighHeading_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighHeading_ES">Safety High Heading (ES)</label>
              <Field
                id="safetyHighHeading_ES"
                name="detailsSection.safetyHighHeading_ES"
                className="form-control"
                placeholder="Enter safety high heading (ES)"
              />
              <ErrorMessage
                name="detailsSection.safetyHighHeading_ES"
                component="div"
                className="error"
              />
            </div>

            <div className="form-group">
              <label htmlFor="safetyHighlights_NL">Safety Highlights (NL)</label>
              <Field
                id="safetyHighlights_NL"
                name="detailsSection.safetyHighlights_NL"
                className="form-control"
                placeholder="Enter safety highlights (NL)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.safetyHighlights_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighlights_EN">Safety Highlights (EN)</label>
              <Field
                id="safetyHighlights_EN"
                name="detailsSection.safetyHighlights_EN"
                className="form-control"
                placeholder="Enter safety highlights (EN)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.safetyHighlights_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighlights_FR">Safety Highlights (FR)</label>
              <Field
                id="safetyHighlights_FR"
                name="detailsSection.safetyHighlights_FR"
                className="form-control"
                placeholder="Enter safety highlights (FR)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.safetyHighlights_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighlights_DE">Safety Highlights (DE)</label>
              <Field
                id="safetyHighlights_DE"
                name="detailsSection.safetyHighlights_DE"
                className="form-control"
                placeholder="Enter safety highlights (DE)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.safetyHighlights_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighlights_ES">Safety Highlights (ES)</label>
              <Field
                id="safetyHighlights_ES"
                name="detailsSection.safetyHighlights_ES"
                className="form-control"
                placeholder="Enter safety highlights (ES)"
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.safetyHighlights_ES"
                component="div"
                className="error"
              />
            </div>

            <button type="submit" className="btn-submit">
              {isLoading ? "creating" : "create car"}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCars;
