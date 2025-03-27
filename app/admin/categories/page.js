"use client";
import React, { useState, useEffect } from "react";
import { RiDeleteBin5Line } from "react-icons/ri";

const Page = () => {
    const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
    const [categories, setCategories] = useState([]); // Categories state
    const [isLoading, setIsLoading] = useState(true);
    const [isAddCategoryModalOpen, setIsAddCategoryModalOpen] = useState(false); // For Add Category Modal
    const [isDeleteCategoryModalOpen, setIsDeleteCategoryModalOpen] = useState(false); // For Delete Category Modal
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // For selected category to delete
    const [newCategoryName, setNewCategoryName] = useState(""); // For new category name
    const [isEditing, setIsEditing] = useState(false); // For determining if we're editing or adding a category
    const [modalError, setModalError] = useState(""); // For tracking errors in the modal
    const [language, setLanguage] = useState(typeof window !== "undefined" ? localStorage.getItem("adminLanguage") || "nl" : "nl");
    const [isDeleteLoading, setSsDeleteLoading] = useState(false);
    const [isCreateLoading, setIsCreateLoading] = useState(false); // For create category loading state
    const [isUpdateLoading, setIsUpdateLoading] = useState(false); // For update category loading state
    const fetchCategories = async () => {
        try {
            const response = await fetch(`${baseURL}/collectioncarcategory`);
            if (!response.ok) {
                throw new Error("Failed to fetch categories");
            }
            const data = await response.json();
            const categoriesData = data.collectionCarCategorySection?.nodes || [];
            setCategories(categoriesData); // Update state with new categories
        } catch (error) {
            console.error("Error fetching categories:", error.message);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
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

    const handleEdit = (id, name) => {
        setSelectedCategoryId(id);
        setNewCategoryName(name); // Set category name in input field for editing
        setIsEditing(true); // Indicate that we are editing
        setIsAddCategoryModalOpen(true); // Open modal
        setModalError(""); // Clear previous errors
    };

    const handleDeleteClick = (id) => {
        setSelectedCategoryId(id);
        setIsDeleteCategoryModalOpen(true);
        setModalError(""); // Clear previous errors
    };

    const handleDeleteConfirm = async () => {

        setSsDeleteLoading(true);
        try {
            const response = await fetch(`${baseURL}/collectioncarcategory`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: selectedCategoryId }), // Send category ID
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to delete category");
            }
            setSsDeleteLoading(false);
            setIsDeleteCategoryModalOpen(false);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error.message);
            setModalError(error.message); // Set error message
            setIsDeleteCategoryModalOpen(true); // Reopen modal
            setSsDeleteLoading(false);
        } finally {
            setSelectedCategoryId(null);
            setSsDeleteLoading(false);
        }
    };

    const handleModalClose = () => {
        setIsAddCategoryModalOpen(false); // Close modal
        setIsEditing(false); // Reset editing state
        setNewCategoryName(""); // Reset category name input
        setModalError(""); // Clear errors
    };

    const handleCategoryNameChange = (e) => {
        setNewCategoryName(e.target.value); // Handle new category name input
    };

    const handleCreateCategory = async () => {
        setIsCreateLoading(true);
        try {
            if (!newCategoryName) {
                setModalError("Category name cannot be empty.");
                return;
            }

            const response = await fetch(`${baseURL}/collectioncarcategory`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name: newCategoryName }), // Send category name
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to create category");
            }

            fetchCategories();
            setNewCategoryName(""); // Reset input field
            setIsAddCategoryModalOpen(false); // Close modal
            setModalError("")
        } catch (error) {
            console.error("Error creating category:", error.message);
            setModalError(error.message); // Set error message
        } finally {
            setIsCreateLoading(false);
        }
    };

    const handleUpdateCategory = async () => {
        setIsUpdateLoading(true);
        try {
            if (!newCategoryName || !selectedCategoryId) {
                setModalError("Category name cannot be empty.");
                return;
            }

            const response = await fetch(`${baseURL}/collectioncarcategory`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: selectedCategoryId, name: newCategoryName }), // Send updated category name and ID
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update category");
            }

            fetchCategories();
            setNewCategoryName(""); // Reset input field
            setIsAddCategoryModalOpen(false); // Close modal
            setIsEditing(false); // Reset editing state
            setModalError("")
        } catch (error) {
            console.error("Error updating category:", error.message);
            setModalError(error.message); // Set error message
        } finally {
            setIsUpdateLoading(false);
        }
    };

    return (
        <div className="page-container">
            <div className="top">
                <div>
                    <h1 className="title">{language === "en" ? "Categories" : "Categorieën"}</h1>
                </div>
                <div>
                    <button
                        className="add-btn"
                        onClick={() => setIsAddCategoryModalOpen(true)} // Open modal to add category
                    >
                        {language === "en" ? "Add Category" : "Categorie Toevoegen"}
                    </button>
                </div>
            </div>

            {isLoading ? (
                <p>{language === "en" ? "Loading categories..." : "Categorieën laden..."}</p>
            ) : (
                <table className="car-table">
                    <thead>
                        <tr>
                            <th>{language === "en" ? "Category Name" : "Categorienaam"}</th>
                            <th>{language === "en" ? "Actions" : "Acties"}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories.length === 0 ? (
                            <tr>
                                <td colSpan="2" style={{ textAlign: 'center' }}>
                                    {language === "en" ? "No categories found" : "Geen categorieën gevonden"}
                                </td>
                            </tr>
                        ) : (
                            categories.map((category) => (
                                <tr key={category.id}>
                                    <td>{category.name}</td>
                                    <td>
                                        <button
                                            className="edit-btn"
                                            onClick={() => handleEdit(category.databaseId, category.name)}
                                        >
                                            {language === "en" ? "Edit" : "Bewerken"}
                                        </button>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDeleteClick(category.databaseId)}
                                        >
                                            {language === "en" ? "Delete" : "Verwijderen"}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}

            {isAddCategoryModalOpen && (
                <div className={`modal-overlay ${isAddCategoryModalOpen ? "active" : ""}`}>
                    <div className="modal-content">
                        <h2 className="modal-header">{isEditing ? (language === "en" ? "Edit Category" : "Categorie Bewerken") : (language === "en" ? "Add New Category" : "Nieuwe Categorie Toevoegen")}</h2>
                        <div className="modal-body">
                            <input
                                type="text"
                                value={newCategoryName}
                                onChange={handleCategoryNameChange}
                                placeholder={language === "en" ? "Enter category name" : "Voer categorienaam in"}
                                className="category-input"
                            />
                            {modalError && <p style={{ fontSize: "12px", color: "red" }}>{modalError}</p>}
                        </div>
                        <div className="modal-footer">
                            <button className="confirm-btn" onClick={handleModalClose}>
                                {language === "en" ? "Cancel" : "Annuleren"}
                            </button>
                            <button
                                className="cancel-btn"
                                onClick={isEditing ? handleUpdateCategory : handleCreateCategory}
                            >
                                {isEditing ? (isUpdateLoading ? (language === "en" ? "Updating..." : "Bijwerken...") : (language === "en" ? "Update Category" : "Categorie Bijwerken")) : (isCreateLoading ? (language === "en" ? "Creating..." : "Aanmaken...") : (language === "en" ? "Create Category" : "Categorie Aanmaken"))}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Category Confirmation Modal */}
            {isDeleteCategoryModalOpen && (
                <div className={`modal-overlay ${isDeleteCategoryModalOpen ? "active" : ""}`}>
                    <div className="modal-content">
                        <div style={{ textAlign: "center" }}>
                            <RiDeleteBin5Line size={40} color="#f44336" />
                        </div>
                        <h2 className="modal-body delete-modal">{language === "en" ? "Are you sure you want to delete this category?" : "Weet u zeker dat u deze categorie wilt verwijderen?"}</h2>
                        {modalError && <p style={{ fontSize: "12px", color: "red" }}>{modalError}</p>}
                        <div className="modal-footer">
                            <button className="cancel-btn" onClick={() => setIsDeleteCategoryModalOpen(false)}>
                                {language === "en" ? "Cancel" : "Annuleren"}
                            </button>
                            <button className="confirm-btn" onClick={handleDeleteConfirm}>
                                {isDeleteLoading ? "Deleting" : "Yes, Delete"}
                            </button>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
