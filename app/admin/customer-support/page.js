"use client";
import React, { useState, useEffect } from "react";
import moment from "moment";
import { FaEye, FaTimes } from "react-icons/fa";

const Page = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [cars, setCars] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [language, setLanguage] = useState(
        typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl"
    );
    const [selectedMessage, setSelectedMessage] = useState(null); // State for modal message

    const fetchCars = async () => {
        try {
            const response = await fetch(`${baseURL}/contactusform`);
            if (!response.ok) {
                throw new Error("Failed to fetch cars");
            }
            const data = await response.json();
            console.log("contact data:", data);
            setCars(data?.data || []);
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

    const handleModalClose = () => {
        setSelectedMessage(null);
    };

    return (
        <div className="page-container">
            <div className="top">
                <h1 className="title">{language === "en" ? "Customer Support" : "Klantenservice"}</h1>
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="table-container">
                    <table className="car-table">
                        <thead>
                            <tr>
                                <th>{language === "en" ? "Email" : "E-mail"}</th>
                                <th>{language === "en" ? "Full Name" : "Volledige naam"}</th>
                                <th>{language === "en" ? "Message" : "Bericht"}</th>
                                <th>{language === "en" ? "Phone Number" : "Telefoonnummer"}</th>
                                <th>{language === "en" ? "Submitted At" : "Ingediend op"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cars.length === 0 ? (
                                <tr>
                                    <td colSpan="5" style={{ textAlign: "center" }}>
                                        {language === "en" ? "No data found" : "Geen gegevens gevonden"}
                                    </td>
                                </tr>
                            ) : (
                                cars.map((car) => (
                                    <tr key={car.id}>
                                        <td>{car.email}</td>
                                        <td>{car.fullName}</td>
                                        <td>
                                            {car?.message.length > 10 ? (
                                                <>
                                                    {car.message.substring(0, 10)}...
                                                    <FaEye
                                                        style={{ cursor: "pointer", marginLeft: "5px" }}
                                                        onClick={() => setSelectedMessage(car.message)}
                                                    />
                                                </>
                                            ) : (
                                                car?.message
                                            )}
                                        </td>
                                        <td>{car.phoneNumber}</td>
                                        <td>{moment(car.submittedAt).format("DD MMM YYYY, hh:mm A")}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}

            {selectedMessage && (
                <div className={`modal-overlay ${selectedMessage ? "active" : ""}`}>
                    <div className="modal-content">
                        <div style={{ textAlign: "end" }}>
                            <FaTimes
                                className="close-icon"
                                onClick={handleModalClose}
                                style={{cursor:"pointer"}}
                            />
                        </div>
                        <p className="modal-body delete-modal">
                            {selectedMessage}
                        </p>

                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
