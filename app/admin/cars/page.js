"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { RiDeleteBin5Line } from "react-icons/ri";

const Page = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const router = useRouter();
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCarId, setSelectedCarId] = useState(null);
    const [language, setLanguage] = useState(typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl");
    const [isDeleting, setIsDeleting] = useState(false);
    const fetchCars = async () => {
        try {
            const response = await fetch(`${baseURL}/caradd`);
            if (!response.ok) {
                throw new Error("Failed to fetch cars");
            }
            const data = await response.json();
            const carsData = data?.data?.collectionCarsDataSection?.nodes || [];

            // Fetch category names if missing
            const updatedCars = await Promise.all(
                carsData.map(async (car) => {
                    if (!car.carCategories?.nodes?.[0]?.name && car.carCategories?.nodes?.[0]?.databaseId) {
                        try {
                            const categoryResponse = await fetch(`${baseURL}/collectioncarcategory/${car.carCategories.nodes[0].databaseId}`);
                            if (categoryResponse.ok) {
                                const categoryData = await categoryResponse.json();
                                car.carCategories.nodes[0].name = categoryData?.name || "Unknown";
                            }
                        } catch (error) {
                            console.error("Error fetching category name:", error.message);
                        }
                    }
                    return car;
                })
            );

            setCars(updatedCars);
        } catch (error) {
            console.error("Error fetching cars:", error.message);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
      

        fetchCars();
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

    const handleEdit = (id) => {
        const edit = true;
        console.log(`Edit car with ID: ${id}`);
        router.push(`/admin/cars/${id}?edit=${edit}`);
    };

    const handleDeleteClick = (id) => {
        setSelectedCarId(id);
        setIsModalOpen(true);

    };

    const handleDeleteConfirm = async () => {
        console.log(`Delete car with ID: ${selectedCarId}`);
        setIsDeleting(true);
        try {
            const response = await fetch(`${baseURL}/caradd/${selectedCarId}`, {
                method: "DELETE",
            });
            if (response.ok) {
                setIsModalOpen(false);
                fetchCars();
            } else {
                console.error("Failed to delete car");
            }
        } catch (error) {
            console.error("Error deleting car:", error.message);
        } finally {
            setIsDeleting(false);
            setSelectedCarId(null);
        }
    };
    
    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedCarId(null);
    };

    return (
        <div className="page-container">
            <div className="top">
                <div>
                    <h1 className="title">{language === "en" ? "Cars" : "Auto's"}</h1>
                </div>
                <div>
                    <button
                        className="add-btn"
                        onClick={() => router.push("/admin/cars/add-cars")}
                    >
                        {language === "en" ? "Add Car" : "Auto Toevoegen"}
                    </button>
                </div>
            </div>

            {isLoading ? (
                <p>{language === "en" ? "Loading cars..." : "Auto's laden..."}</p>
            ) : (
                <div className="table-container" >
                    <table className="car-table">
                        <thead>
                            <tr>
                                <th>{language === "en" ? "Car Title" : "Autotitel"}</th>
                                <th>{language === "en" ? "Car Category" : "Autocategorie"}</th>
                                <th>{language === "en" ? "Construction Year" : "Bouwjaar"}</th>
                                <th>{language === "en" ? "KM Stand" : "KM Stand"}</th>
                                <th>{language === "en" ? "Price" : "Prijs"}</th>
                                <th>{language === "en" ? "Actions" : "Acties"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.length === 0 ? (
                                <tr>
                                    <td colSpan="6" style={{ textAlign: "center" }}>
                                        {language === "en" ? "No cars found" : "Geen auto's gevonden"}
                                    </td>
                                </tr>
                            ) : (
                                cars.map((car) => (
                                    <tr key={car.id}>
                                        <td>{car.slug}</td>
                                        <td>{car.carCategories?.nodes?.[0]?.name}</td>
                                        <td>{car.featureSection?.constructionYear}</td>
                                        <td>{car.featureSection?.kmStand} km</td>
                                        <td>{car.featureSection?.price}</td>
                                        <td>
                                            <button
                                                className="edit-btn"
                                                onClick={() => handleEdit(car?.id)}
                                            >
                                                {language === "en" ? "Edit" : "Bewerken"}
                                            </button>
                                            <button
                                                className="delete-btn"
                                                onClick={() => handleDeleteClick(car?.id)}
                                            >
                                                {language === "en" ? "Delete" : "Verwijderen"}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {isModalOpen && (
                <div className={`modal-overlay ${isModalOpen ? "active" : ""}`}>
                    <div className="modal-content">
                        <div style={{ textAlign: "center" }}>
                            <RiDeleteBin5Line size={40} color="#f44336" />
                        </div>
                        <h2 className="modal-body delete-modal">
                            {language === "en" ? "Are you sure you want to delete this car?" : "Weet u zeker dat u deze auto wilt verwijderen?"}
                        </h2>
                        <div className="modal-footer">
                            <button className="confirm-btn" onClick={handleDeleteConfirm} disabled={isDeleting}>
                                {isDeleting ? (language === "en" ? "Deleting..." : "Verwijderen...") : (language === "en" ? "Yes, Delete" : "Ja, Verwijderen")}
                            </button>
                            <button className="cancel-btn" onClick={handleModalClose}>
                                {language === "en" ? "Cancel" : "Annuleren"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
