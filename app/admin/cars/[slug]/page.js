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
  const [existingBannerImage, setExistingBannerImage] = useState(null);
  const [sliderImages, setSliderImages] = useState([]);
  const [existingSliderImages, setExistingSliderImages] = useState([]);
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
        setCategories(categoriesData); // Assuming `data` is an array of category objects
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
          const edit = true;
          const response = await fetch(
            `${baseURL}/caradd/${slug}?edit=${edit}`
          );
          if (!response.ok) throw new Error("Failed to fetch car data");

          const data = await response.json();
          console.log("Car data:", data);
          setFormData(data.data.car);
          setExistingBannerImage(data.data.car.heroSection.bannerBgImage.node.mediaItemUrl);
          setExistingSliderImages(data.data.car.sliderSection.sliderItems);
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

  const removeBannerImage = async () => {
    const imageUrl = existingBannerImage.split("/").slice(3).join("/");
    try {
      const response = await fetch(`https://api.essencityh.com/api/images`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ imageUrl }),
      });
      if (!response.ok) throw new Error("Failed to delete image");
      setExistingBannerImage(null);
    } catch (error) {
      console.error("Error deleting image:", error);
    }
  };

  const removeSliderImage = async (index, existing = false) => {
    if (existing) {
      const imageUrl = existingSliderImages[index].image.node.mediaItemUrl
        .split("/")
        .slice(3)
        .join("/");
      try {
        const response = await fetch(`https://api.essencityh.com/api/images`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ imageUrl }),
        });
        if (!response.ok) throw new Error("Failed to delete image");
        setExistingSliderImages((prevImages) =>
          prevImages.filter((_, i) => i !== index)
        );
      } catch (error) {
        console.error("Error deleting image:", error);
      }
    } else {
      setSliderImages((prevImages) => prevImages.filter((_, i) => i !== index));
    }
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
          try {
            console.log("Form values:", values); // Log form values

            // Ensure only databaseId is sent for carCategories
            values.carCategories.nodes = values.carCategories.nodes.map((node) => {
              const category = categories.find((cat) => cat.databaseId === node.databaseId);
              return {
                databaseId: node.databaseId,
                name: category ? category.name : "",
              };
            });

            // Upload banner image and get URL
            if (bannerImage) {
              const [bannerImageUrl] = await uploadImageAndGetUrl(bannerImage);
              values.heroSection.bannerBgImage.node.mediaItemUrl =
                bannerImageUrl;
            }

            // Upload new slider images and get URLs
            const newSliderImageUrls = await Promise.all(
              sliderImages.map(async (imageFile) => {
                const [imageUrl] = await uploadImageAndGetUrl(imageFile);
                return imageUrl;
              })
            );

            // Combine existing and new slider images
            values.sliderSection.sliderItems = [
              ...existingSliderImages,
              ...newSliderImageUrls.map((url) => ({
                image: { node: { mediaItemUrl: url } },
                mobileImage: "",
                text: "",
              })),
            ];

            const method = slug && slug !== "add-cars" ? "PUT" : "POST";
            const response = await fetch(
              `${baseURL}/caradd${
                slug && slug !== "add-cars" ? `/${slug}` : ""
              }`,
              {
                method,
                body: JSON.stringify(values),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );

            if (!response.ok) {
              const errorData = await response.json();
              console.error("Error adding/updating car:", errorData);
              alert(
                `Error: ${errorData.message || "Failed to add/update car"}`
              );
              return;
            }

            // Handle success
            const responseData = await response.json();
            console.log("Car added/updated successfully:", responseData);
            router.push("/admin/cars");
            alert(
              `Car ${
                slug && slug !== "add-cars" ? "updated" : "added"
              } successfully!`
            );
            resetForm(); // Reset the form after submission
            setBannerImage(null); // Clear banner image
            setSliderImages([]); // Clear slider images
            if (!slug || slug === "add-cars") router.push("/admin/cars");
          } catch (error) {
            console.error("Submission error:", error);
            alert("An unexpected error occurred. Please try again.");
          }
        }}
      >
        {({ values }) => (
          <Form className="add-cars-form">
            <div className="form-group">
              <label htmlFor="slug">{language === "en" ? "Car Slug" : "Auto Slug"}</label>
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
              {existingBannerImage && !bannerImage && (
                <div className="uploaded-image">
                  <img
                    src={existingBannerImage}
                    alt="Existing Banner"
                    className="image-preview"
                    style={{ width: "80px" }}
                  />
                  <button
                    type="button"
                    className="remove-image-btn"
                    onClick={removeBannerImage}
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
                {existingSliderImages.map((image, idx) => (
                  <div key={idx} className="uploaded-image">
                    <img
                      src={image.image.node.mediaItemUrl}
                      alt={`Existing ${idx}`}
                      className="image-preview"
                      style={{ width: "80px" }}
                    />
                    <button
                      type="button"
                      className="remove-image-btn"
                      onClick={() => removeSliderImage(idx, true)}
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
              <label htmlFor="descriptionTitle_NL">
                {language === "en" ? "Description Title (NL)" : "Beschrijving Titel (NL)"}
              </label>
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
              <label htmlFor="descriptionTitle_EN">
                {language === "en" ? "Description Title (EN)" : "Beschrijving Titel (EN)"}
              </label>
              <Field
                id="descriptionTitle_EN"
                name="detailsSection.descriptionTitle_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter description title (EN)" : "Voer beschrijving titel (EN) in"}
              />
              <ErrorMessage
                name="detailsSection.descriptionTitle_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionTitle_FR">
                {language === "en" ? "Description Title (FR)" : "Beschrijving Titel (FR)"}
              </label>
              <Field
                id="descriptionTitle_FR"
                name="detailsSection.descriptionTitle_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter description title (FR)" : "Voer beschrijving titel (FR) in"}
              />
              <ErrorMessage
                name="detailsSection.descriptionTitle_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionTitle_DE">
                {language === "en" ? "Description Title (DE)" : "Beschrijving Titel (DE)"}
              </label>
              <Field
                id="descriptionTitle_DE"
                name="detailsSection.descriptionTitle_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter description title (DE)" : "Voer beschrijving titel (DE) in"}
              />
              <ErrorMessage
                name="detailsSection.descriptionTitle_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="descriptionTitle_ES">
                {language === "en" ? "Description Title (ES)" : "Beschrijving Titel (ES)"}
              </label>
              <Field
                id="descriptionTitle_ES"
                name="detailsSection.descriptionTitle_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter description title (ES)" : "Voer beschrijving titel (ES) in"}
              />
              <ErrorMessage
                name="detailsSection.descriptionTitle_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_NL">{language === "en" ? "Description (NL)" : "Beschrijving (NL)"}</label>
              <Field
                id="description_NL"
                name="detailsSection.description_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter description (NL)" : "Voer beschrijving (NL) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.description_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_EN">{language === "en" ? "Description (EN)" : "Beschrijving (EN)"}</label>
              <Field
                id="description_EN"
                name="detailsSection.description_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter description (EN)" : "Voer beschrijving (EN) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.description_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_FR">{language === "en" ? "Description (FR)" : "Beschrijving (FR)"}</label>
              <Field
                id="description_FR"
                name="detailsSection.description_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter description (FR)" : "Voer beschrijving (FR) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.description_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_DE">{language === "en" ? "Description (DE)" : "Beschrijving (DE)"}</label>
              <Field
                id="description_DE"
                name="detailsSection.description_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter description (DE)" : "Voer beschrijving (DE) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.description_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description_ES">{language === "en" ? "Description (ES)" : "Beschrijving (ES)"}</label>
              <Field
                id="description_ES"
                name="detailsSection.description_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter description (ES)" : "Voer beschrijving (ES) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.description_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="highlightsTitle_NL">{language === "en" ? "Highlights Title (NL)" : "Hoogtepunten Titel (NL)"}</label>
              <Field
                id="highlightsTitle_NL"
                name="detailsSection.highlightsTitle_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter highlights title (NL)" : "Voer hoogtepunten titel (NL) in"}
              />
              <ErrorMessage
                name="detailsSection.highlightsTitle_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="highlightsTitle_EN">{language === "en" ? "Highlights Title (EN)" : "Hoogtepunten Titel (EN)"}</label>
              <Field
                id="highlightsTitle_EN"
                name="detailsSection.highlightsTitle_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter highlights title (EN)" : "Voer hoogtepunten titel (EN) in"}
              />
              <ErrorMessage
                name="detailsSection.highlightsTitle_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="highlightsTitle_FR">{language === "en" ? "Highlights Title (FR)" : "Hoogtepunten Titel (FR)"}</label>
              <Field
                id="highlightsTitle_FR"
                name="detailsSection.highlightsTitle_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter highlights title (FR)" : "Voer hoogtepunten titel (FR) in"}
              />
              <ErrorMessage
                name="detailsSection.highlightsTitle_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="highlightsTitle_DE">{language === "en" ? "Highlights Title (DE)" : "Hoogtepunten Titel (DE)"}</label>
              <Field
                id="highlightsTitle_DE"
                name="detailsSection.highlightsTitle_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter highlights title (DE)" : "Voer hoogtepunten titel (DE) in"}
              />
              <ErrorMessage
                name="detailsSection.highlightsTitle_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="highlightsTitle_ES">{language === "en" ? "Highlights Title (ES)" : "Hoogtepunten Titel (ES)"}</label>
              <Field
                id="highlightsTitle_ES"
                name="detailsSection.highlightsTitle_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter highlights title (ES)" : "Voer hoogtepunten titel (ES) in"}
              />
              <ErrorMessage
                name="detailsSection.highlightsTitle_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighHeading_NL">
                {language === "en" ? "Motor Highlights Heading (NL)" : "Motor Hoogtepunten Kop (NL)"}
              </label>
              <Field
                id="motorHighHeading_NL"
                name="detailsSection.motorHighHeading_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter motor highlights heading (NL)" : "Voer motor hoogtepunten kop (NL) in"}
              />
              <ErrorMessage
                name="detailsSection.motorHighHeading_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighHeading_EN">
                {language === "en" ? "Motor Highlights Heading (EN)" : "Motor Hoogtepunten Kop (EN)"}
              </label>
              <Field
                id="motorHighHeading_EN"
                name="detailsSection.motorHighHeading_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter motor highlights heading (EN)" : "Voer motor hoogtepunten kop (EN) in"}
              />
              <ErrorMessage
                name="detailsSection.motorHighHeading_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighHeading_FR">
                {language === "en" ? "Motor Highlights Heading (FR)" : "Motor Hoogtepunten Kop (FR)"}
              </label>
              <Field
                id="motorHighHeading_FR"
                name="detailsSection.motorHighHeading_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter motor highlights heading (FR)" : "Voer motor hoogtepunten kop (FR) in"}
              />
              <ErrorMessage
                name="detailsSection.motorHighHeading_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighHeading_DE">
                {language === "en" ? "Motor Highlights Heading (DE)" : "Motor Hoogtepunten Kop (DE)"}
              </label>
              <Field
                id="motorHighHeading_DE"
                name="detailsSection.motorHighHeading_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter motor highlights heading (DE)" : "Voer motor hoogtepunten kop (DE) in"}
              />
              <ErrorMessage
                name="detailsSection.motorHighHeading_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighHeading_ES">
                {language === "en" ? "Motor Highlights Heading (ES)" : "Motor Hoogtepunten Kop (ES)"}
              </label>
              <Field
                id="motorHighHeading_ES"
                name="detailsSection.motorHighHeading_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter motor highlights heading (ES)" : "Voer motor hoogtepunten kop (ES) in"}
              />
              <ErrorMessage
                name="detailsSection.motorHighHeading_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighlights_NL">{language === "en" ? "Motor Highlights (NL)" : "Motor Hoogtepunten (NL)"}</label>
              <Field
                id="motorHighlights_NL"
                name="detailsSection.motorHighlights_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter motor highlights (NL)" : "Voer motor hoogtepunten (NL) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.motorHighlights_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighlights_EN">{language === "en" ? "Motor Highlights (EN)" : "Motor Hoogtepunten (EN)"}</label>
              <Field
                id="motorHighlights_EN"
                name="detailsSection.motorHighlights_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter motor highlights (EN)" : "Voer motor hoogtepunten (EN) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.motorHighlights_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighlights_FR">{language === "en" ? "Motor Highlights (FR)" : "Motor Hoogtepunten (FR)"}</label>
              <Field
                id="motorHighlights_FR"
                name="detailsSection.motorHighlights_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter motor highlights (FR)" : "Voer motor hoogtepunten (FR) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.motorHighlights_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighlights_DE">{language === "en" ? "Motor Highlights (DE)" : "Motor Hoogtepunten (DE)"}</label>
              <Field
                id="motorHighlights_DE"
                name="detailsSection.motorHighlights_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter motor highlights (DE)" : "Voer motor hoogtepunten (DE) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.motorHighlights_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="motorHighlights_ES">{language === "en" ? "Motor Highlights (ES)" : "Motor Hoogtepunten (ES)"}</label>
              <Field
                id="motorHighlights_ES"
                name="detailsSection.motorHighlights_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter motor highlights (ES)" : "Voer motor hoogtepunten (ES) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.motorHighlights_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighheading_NL">
                {language === "en" ? "Exterior Highlights Heading (NL)" : "Exterieur Hoogtepunten Kop (NL)"}
              </label>
              <Field
                id="exteriorHighheading_NL"
                name="detailsSection.exteriorHighheading_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter exterior highlights heading (NL)" : "Voer exterieur hoogtepunten kop (NL) in"}
              />
              <ErrorMessage
                name="detailsSection.exteriorHighheading_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighheading_EN">
                {language === "en" ? "Exterior Highlights Heading (EN)" : "Exterieur Hoogtepunten Kop (EN)"}
              </label>
              <Field
                id="exteriorHighheading_EN"
                name="detailsSection.exteriorHighheading_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter exterior highlights heading (EN)" : "Voer exterieur hoogtepunten kop (EN) in"}
              />
              <ErrorMessage
                name="detailsSection.exteriorHighheading_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighheading_FR">
                {language === "en" ? "Exterior Highlights Heading (FR)" : "Exterieur Hoogtepunten Kop (FR)"}
              </label>
              <Field
                id="exteriorHighheading_FR"
                name="detailsSection.exteriorHighheading_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter exterior highlights heading (FR)" : "Voer exterieur hoogtepunten kop (FR) in"}
              />
              <ErrorMessage
                name="detailsSection.exteriorHighheading_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighheading_DE">
                {language === "en" ? "Exterior Highlights Heading (DE)" : "Exterieur Hoogtepunten Kop (DE)"}
              </label>
              <Field
                id="exteriorHighheading_DE"
                name="detailsSection.exteriorHighheading_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter exterior highlights heading (DE)" : "Voer exterieur hoogtepunten kop (DE) in"}
              />
              <ErrorMessage
                name="detailsSection.exteriorHighheading_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighheading_ES">
                {language === "en" ? "Exterior Highlights Heading (ES)" : "Exterieur Hoogtepunten Kop (ES)"}
              </label>
              <Field
                id="exteriorHighheading_ES"
                name="detailsSection.exteriorHighheading_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter exterior highlights heading (ES)" : "Voer exterieur hoogtepunten kop (ES) in"}
              />
              <ErrorMessage
                name="detailsSection.exteriorHighheading_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighlights_NL">{language === "en" ? "Exterior Highlights (NL)" : "Exterieur Hoogtepunten (NL)"}</label>
              <Field
                id="exteriorHighlights_NL"
                name="detailsSection.exteriorHighlights_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter exterior highlights (NL)" : "Voer exterieur hoogtepunten (NL) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighlights_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighlights_EN">{language === "en" ? "Exterior Highlights (EN)" : "Exterieur Hoogtepunten (EN)"}</label>
              <Field
                id="exteriorHighlights_EN"
                name="detailsSection.exteriorHighlights_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter exterior highlights (EN)" : "Voer exterieur hoogtepunten (EN) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighlights_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighlights_FR">{language === "en" ? "Exterior Highlights (FR)" : "Exterieur Hoogtepunten (FR)"}</label>
              <Field
                id="exteriorHighlights_FR"
                name="detailsSection.exteriorHighlights_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter exterior highlights (FR)" : "Voer exterieur hoogtepunten (FR) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighlights_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighlights_DE">{language === "en" ? "Exterior Highlights (DE)" : "Exterieur Hoogtepunten (DE)"}</label>
              <Field
                id="exteriorHighlights_DE"
                name="detailsSection.exteriorHighlights_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter exterior highlights (DE)" : "Voer exterieur hoogtepunten (DE) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighlights_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="exteriorHighlights_ES">{language === "en" ? "Exterior Highlights (ES)" : "Exterieur Hoogtepunten (ES)"}</label>
              <Field
                id="exteriorHighlights_ES"
                name="detailsSection.exteriorHighlights_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter exterior highlights (ES)" : "Voer exterieur hoogtepunten (ES) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.exteriorHighlights_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorHighHeading_NL">
                {language === "en" ? "Interior Highlights Heading (NL)" : "Interieur Hoogtepunten Kop (NL)"}
              </label>
              <Field
                id="interiorHighHeading_NL"
                name="detailsSection.interiorHighHeading_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter interior highlights heading (NL)" : "Voer interieur hoogtepunten kop (NL) in"}
              />
              <ErrorMessage
                name="detailsSection.interiorHighHeading_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorHighHeading_EN">
                {language === "en" ? "Interior Highlights Heading (EN)" : "Interieur Hoogtepunten Kop (EN)"}
              </label>
              <Field
                id="interiorHighHeading_EN"
                name="detailsSection.interiorHighHeading_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter interior highlights heading (EN)" : "Voer interieur hoogtepunten kop (EN) in"}
              />
              <ErrorMessage
                name="detailsSection.interiorHighHeading_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorHighHeading_FR">
                {language === "en" ? "Interior Highlights Heading (FR)" : "Interieur Hoogtepunten Kop (FR)"}
              </label>
              <Field
                id="interiorHighHeading_FR"
                name="detailsSection.interiorHighHeading_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter interior highlights heading (FR)" : "Voer interieur hoogtepunten kop (FR) in"}
              />
              <ErrorMessage
                name="detailsSection.interiorHighHeading_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorHighHeading_DE">
                {language === "en" ? "Interior Highlights Heading (DE)" : "Interieur Hoogtepunten Kop (DE)"}
              </label>
              <Field
                id="interiorHighHeading_DE"
                name="detailsSection.interiorHighHeading_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter interior highlights heading (DE)" : "Voer interieur hoogtepunten kop (DE) in"}
              />
              <ErrorMessage
                name="detailsSection.interiorHighHeading_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorHighHeading_ES">
                {language === "en" ? "Interior Highlights Heading (ES)" : "Interieur Hoogtepunten Kop (ES)"}
              </label>
              <Field
                id="interiorHighHeading_ES"
                name="detailsSection.interiorHighHeading_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter interior highlights heading (ES)" : "Voer interieur hoogtepunten kop (ES) in"}
              />
              <ErrorMessage
                name="detailsSection.interiorHighHeading_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorhighlights_NL">
                {language === "en" ? "Interior Highlights (NL)" : "Interieur Hoogtepunten (NL)"}
              </label>
              <Field
                id="interiorhighlights_NL"
                name="detailsSection.interiorhighlights_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter interior highlights (NL)" : "Voer interieur hoogtepunten (NL) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.interiorhighlights_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorhighlights_EN">
                {language === "en" ? "Interior Highlights (EN)" : "Interieur Hoogtepunten (EN)"}
              </label>
              <Field
                id="interiorhighlights_EN"
                name="detailsSection.interiorhighlights_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter interior highlights (EN)" : "Voer interieur hoogtepunten (EN) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.interiorhighlights_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorhighlights_FR">
                {language === "en" ? "Interior Highlights (FR)" : "Interieur Hoogtepunten (FR)"}
              </label>
              <Field
                id="interiorhighlights_FR"
                name="detailsSection.interiorhighlights_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter interior highlights (FR)" : "Voer interieur hoogtepunten (FR) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.interiorhighlights_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorhighlights_DE">
                {language === "en" ? "Interior Highlights (DE)" : "Interieur Hoogtepunten (DE)"}
              </label>
              <Field
                id="interiorhighlights_DE"
                name="detailsSection.interiorhighlights_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter interior highlights (DE)" : "Voer interieur hoogtepunten (DE) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.interiorhighlights_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="interiorhighlights_ES">
                {language === "en" ? "Interior Highlights (ES)" : "Interieur Hoogtepunten (ES)"}
              </label>
              <Field
                id="interiorhighlights_ES"
                name="detailsSection.interiorhighlights_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter interior highlights (ES)" : "Voer interieur hoogtepunten (ES) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.interiorhighlights_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighHeading_NL">
                {language === "en" ? "Safety Highlights Heading (NL)" : "Veiligheid Hoogtepunten Kop (NL)"}
              </label>
              <Field
                id="safetyHighHeading_NL"
                name="detailsSection.safetyHighHeading_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter safety highlights heading (NL)" : "Voer veiligheid hoogtepunten kop (NL) in"}
              />
              <ErrorMessage
                name="detailsSection.safetyHighHeading_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighHeading_EN">
                {language === "en" ? "Safety Highlights Heading (EN)" : "Veiligheid Hoogtepunten Kop (EN)"}
              </label>
              <Field
                id="safetyHighHeading_EN"
                name="detailsSection.safetyHighHeading_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter safety highlights heading (EN)" : "Voer veiligheid hoogtepunten kop (EN) in"}
              />
              <ErrorMessage
                name="detailsSection.safetyHighHeading_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighHeading_FR">
                {language === "en" ? "Safety Highlights Heading (FR)" : "Veiligheid Hoogtepunten Kop (FR)"}
              </label>
              <Field
                id="safetyHighHeading_FR"
                name="detailsSection.safetyHighHeading_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter safety highlights heading (FR)" : "Voer veiligheid hoogtepunten kop (FR) in"}
              />
              <ErrorMessage
                name="detailsSection.safetyHighHeading_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighHeading_DE">
                {language === "en" ? "Safety Highlights Heading (DE)" : "Veiligheid Hoogtepunten Kop (DE)"}
              </label>
              <Field
                id="safetyHighHeading_DE"
                name="detailsSection.safetyHighHeading_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter safety highlights heading (DE)" : "Voer veiligheid hoogtepunten kop (DE) in"}
              />
              <ErrorMessage
                name="detailsSection.safetyHighHeading_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighHeading_ES">
                {language === "en" ? "Safety Highlights Heading (ES)" : "Veiligheid Hoogtepunten Kop (ES)"}
              </label>
              <Field
                id="safetyHighHeading_ES"
                name="detailsSection.safetyHighHeading_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter safety highlights heading (ES)" : "Voer veiligheid hoogtepunten kop (ES) in"}
              />
              <ErrorMessage
                name="detailsSection.safetyHighHeading_ES"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighlights_NL">
                {language === "en" ? "Safety Highlights (NL)" : "Veiligheid Hoogtepunten (NL)"}
              </label>
              <Field
                id="safetyHighlights_NL"
                name="detailsSection.safetyHighlights_NL"
                className="form-control"
                placeholder={language === "en" ? "Enter safety highlights (NL)" : "Voer veiligheid hoogtepunten (NL) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.safetyHighlights_NL"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighlights_EN">
                {language === "en" ? "Safety Highlights (EN)" : "Veiligheid Hoogtepunten (EN)"}
              </label>
              <Field
                id="safetyHighlights_EN"
                name="detailsSection.safetyHighlights_EN"
                className="form-control"
                placeholder={language === "en" ? "Enter safety highlights (EN)" : "Voer veiligheid hoogtepunten (EN) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.safetyHighlights_EN"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighlights_FR">
                {language === "en" ? "Safety Highlights (FR)" : "Veiligheid Hoogtepunten (FR)"}
              </label>
              <Field
                id="safetyHighlights_FR"
                name="detailsSection.safetyHighlights_FR"
                className="form-control"
                placeholder={language === "en" ? "Enter safety highlights (FR)" : "Voer veiligheid hoogtepunten (FR) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.safetyHighlights_FR"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighlights_DE">
                {language === "en" ? "Safety Highlights (DE)" : "Veiligheid Hoogtepunten (DE)"}
              </label>
              <Field
                id="safetyHighlights_DE"
                name="detailsSection.safetyHighlights_DE"
                className="form-control"
                placeholder={language === "en" ? "Enter safety highlights (DE)" : "Voer veiligheid hoogtepunten (DE) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.safetyHighlights_DE"
                component="div"
                className="error"
              />
            </div>
            <div className="form-group">
              <label htmlFor="safetyHighlights_ES">
                {language === "en" ? "Safety Highlights (ES)" : "Veiligheid Hoogtepunten (ES)"}
              </label>
              <Field
                id="safetyHighlights_ES"
                name="detailsSection.safetyHighlights_ES"
                className="form-control"
                placeholder={language === "en" ? "Enter safety highlights (ES)" : "Voer veiligheid hoogtepunten (ES) in"}
                as="textarea"
              />
              <ErrorMessage
                name="detailsSection.safetyHighlights_ES"
                component="div"
                className="error"
              />
            </div>

            <button type="submit" className="btn btn-primary">
              {slug && slug !== "add-cars" ? (language === "en" ? "Update Car" : "Auto Bijwerken") : (language === "en" ? "Add Car" : "Auto Toevoegen")}
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default AddCars;
