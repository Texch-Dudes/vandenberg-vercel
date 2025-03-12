"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
    const pathname = usePathname();
    const [language, setLanguage] = useState("nl");

    useEffect(() => {
        const storedLanguage = localStorage.getItem("adminLanguage") || "nl";
        setLanguage(storedLanguage);

        const handleLanguageChange = () => {
            setLanguage(localStorage.getItem("adminLanguage") || "nl");
        };

        window.addEventListener("languageChange", handleLanguageChange);

        return () => {
            window.removeEventListener("languageChange", handleLanguageChange);
        };
    }, []);

    // Translation dictionary
    const navItems = [
        { label: { en: "Home", nl: "Home" }, path: "/admin/home" },
        { label: { en: "About Us", nl: "Over Ons" }, path: "/admin/over-ons" },
        { label: { en: "Restoration", nl: "Restauratie" }, path: "/admin/restauratie" },
        { label: { en: "Speed", nl: "Speed" }, path: "/admin/speed" },
        { label: { en: "Collection", nl: "Collectie" }, path: "/admin/collectie" },
        { label: { en: "Contact", nl: "Contact" }, path: "/admin/contact" },
        { label: { en: "Cars", nl: "Auto's" }, path: "/admin/cars" },
        { label: { en: "Categories", nl: "Categorieën" }, path: "/admin/categories" },
        { label: { en: "Global Data", nl: "Globale Gegevens" }, path: "/admin/global-data" },
        { label: { en: "Customer Support", nl: "Klanten Support" }, path: "/admin/customer-support" },
    ];

    return (
        <>
            <div className={`sidebar-backdrop ${sidebarOpen ? "active" : ""}`} onClick={() => setSidebarOpen(false)}></div>
            <div className={`sidebar ${sidebarOpen ? "open" : ""}`}>
                <div className="sidebar-links">
                    <ul>
                        {navItems.map((item) => (
                            <li key={item.path} className={pathname === item.path ? "active" : ""} onClick={() => setSidebarOpen(false)}>
                                <Link href={item.path} >
                                    {item.label[language]}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default Sidebar;
