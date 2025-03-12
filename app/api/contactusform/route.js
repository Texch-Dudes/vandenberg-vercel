import { db } from "@/app/lib/firebase";
import { ContactUsFormSchema } from "@/app/schema/contactusFormSchema";
import { collection, addDoc, getDocs } from "firebase/firestore";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const formData = await req.json();

    // Validate form data using Yup
    await ContactUsFormSchema.validate(formData, { abortEarly: false });

    // Save to Firebase
    const contactUsCollection = collection(db, "contactUs");
    await addDoc(contactUsCollection, {
      ...formData,
      submittedAt: new Date().toISOString(),
    });

    // Email configuration
    const transporter = nodemailer.createTransport({
      host: "mail.strongqatar.com",
      port: 2500,
      secure: false,
      auth: {
        user: "webnotify@strongqatar.com",
        pass: "h}+T4m5/gXnA",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    // Email to user
    const userMailOptions = {
      from: '"Web Notify" <webnotify@strongqatar.com>',
      to: formData.email,
      subject: "General Form Submission",
      html: `
        <p>Thank you for your submission, ${formData.fullName}. We have received your details.</p>
        <p><strong>Full Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
    };

    // Email to admin
    const adminMailOptions = {
      from: '"Web Notify" <webnotify@strongqatar.com>',
      to: "info@vandenbergcarclassic.nl",
      // cc: "mughal1626@gmail.com",
      subject: "New Contact Us Form Submission",
      html: `
        <p>A new contact us form has been submitted. Details:</p>
        <p><strong>Full Name:</strong> ${formData.fullName}</p>
        <p><strong>Email:</strong> ${formData.email}</p>
        <p><strong>Phone Number:</strong> ${formData.phoneNumber}</p>
        <p><strong>Message:</strong> ${formData.message}</p>
      `,
    };

    await transporter.sendMail(userMailOptions);
    await transporter.sendMail(adminMailOptions);

    return new Response(
      JSON.stringify({
        success: true,
        message: "Thank you for submitting your request.",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while submitting the form:", error);
    if (error.name === "ValidationError") {
      // Return validation errors
      return new Response(
        JSON.stringify({
          success: false,
          errors: error.errors,
        }),
        { status: 400 }
      );
    }

    // Return generic error
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while submitting the form.",
      }),
      { status: 500 }
    );
  }
}

export async function GET(req) {
  try {
    const contactUsCollection = collection(db, "contactUs");
    const snapshot = await getDocs(contactUsCollection);
    const submissions = snapshot.docs.map(doc => doc.data());

    return new Response(
      JSON.stringify({
        success: true,
        data: submissions,
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error occurred while fetching the submissions:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "An error occurred while fetching the submissions.",
      }),
      { status: 500 }
    );
  }
}
