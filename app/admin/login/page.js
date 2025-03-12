"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import VenDenBergLogo from "../../../public/Ven-Den-Berg-Logo.svg";
import Cookies from "js-cookie";
const Page = () => {
    const staticPassword = "admin";
    const router = useRouter();

    const validationSchema = Yup.object().shape({
        password: Yup.string().required("Password is required"),
    });

    const handleSubmit = (values, { setSubmitting, setFieldError }) => {
        if (values.password === staticPassword) {
            Cookies.set("admin", "true", { expires: 1, path: "/" });
            router.push("/admin/home");
        } else {
            setFieldError("password", "Incorrect Password");
        }
        setSubmitting(false);
    };

    return (
        <div className="admin-page">
            <div className="admin-image">
                <div className="admin-image-content">
                    Welcome to <br /> Admin Panel
                </div>
            </div>

            <div className="admin-form-container">
                <Formik
                    initialValues={{ password: "" }}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({ isSubmitting }) => (
                        <Form className="admin-form">
                            <div className="admin-logo">
                                <VenDenBergLogo />
                            </div>
                            <div className="admin-heading">
                                Admin Panel
                            </div>
                            <div className="input-field">
                                <Field
                                    type="password"
                                    name="password"
                                    placeholder="Enter Password"
                                />
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="error-message"
                                />
                            </div>
                            <div>
                                <button
                                    type="submit"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Submitting..." : "Submit"}
                                </button>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
};

export default Page;
