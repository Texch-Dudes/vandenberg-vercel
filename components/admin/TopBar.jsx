import { useRouter } from "next/navigation";
import React, { useState, useEffect } from "react";
import VenDenBergLogo from "../../public/Ven-Den-Berg-Logo.svg";

const TopBar = ({ toggleSidebar }) => {
    const router = useRouter();
    const [language, setLanguage] = useState("nl");

    useEffect(() => {
        const storedLanguage = localStorage.getItem("adminLanguage") || "nl";
        setLanguage(storedLanguage);
    }, []);

    const handleLogout = () => {
        document.cookie = "admin=true; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
        router.push("/admin/login");
    };

    const toggleLanguage = () => {
        const newLanguage = language === "en" ? "nl" : "en";
        localStorage.setItem("adminLanguage", newLanguage);
        setLanguage(newLanguage);

        // Dispatch a custom event to notify other components
        window.dispatchEvent(new Event("languageChange"));
    };

    return (
        <div className="topbar">
            <div className="topbar-left">
                <button onClick={toggleSidebar} className="sidebar-toggle">
                    <span style={{ display: "block", width: "25px", height: "3px", backgroundColor: "#D0AF53", marginBottom: "5px" }}></span>
                    <span style={{ display: "block", width: "25px", height: "3px", backgroundColor: "#D0AF53", marginBottom: "5px" }}></span>
                    <span style={{ display: "block", width: "25px", height: "3px", backgroundColor: "#D0AF53" }}></span>
                </button>
                <span className="topbar-title">
                    <VenDenBergLogo />
                </span>
            </div>
            <div className="topbar-right">
                <button
                    onClick={toggleLanguage}
                    style={{
                        padding: "8px 15px",
                        borderRadius: "5px",
                        border: "1px solid #D0AF53",
                        backgroundColor: "#D0AF53",
                        color: "black",
                        cursor: "pointer",
                        fontWeight: "bold",
                        marginRight: "10px",
                    }}
                >
                    {language === "en" ? "NL" : "EN"}
                </button>
                <button
                    type="button"
                    onClick={handleLogout}
                    style={{
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "1px solid #D0AF53",
                        backgroundColor: "#D0AF53",
                        color: "black",
                        cursor: "pointer",
                        fontWeight: "bold",
                    }}
                >
                    {language === "en" ? "Logout" : "Uitloggen"}
                </button>
            </div>
        </div>
    );
};

export default TopBar;
