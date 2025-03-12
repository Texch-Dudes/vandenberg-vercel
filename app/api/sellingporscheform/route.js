import { db } from "@/app/lib/firebase";
import { SellingPorscheSchema } from "@/app/schema/sellingPorscheForm";
import { collection, addDoc } from "firebase/firestore";
import nodemailer from "nodemailer";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate the form fields
    await SellingPorscheSchema.validate(body, { abortEarly: false });

    // Save form data to Firestore
    const sellingPorscheCollection = collection(db, "sellingPorsche");
    await addDoc(sellingPorscheCollection, {
      ...body,
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
      to: body.email,
      subject: "Selling Form Submission",
      html: `
        <p>Thank you for your submission, ${
          body.fullName
        }. We have received your details.</p>
        <p><strong>Full Name:</strong> ${body.fullName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Place Name:</strong> ${body.placeName}</p>
        <p><strong>Phone Number:</strong> ${body.phoneNumber}</p>
        <p><strong>License Number:</strong> ${body.licenseNumber}</p>
        <p><strong>Message:</strong> ${body.message}</p>
        <p><strong>Images:</strong></p>
        <div style="display: flex; flex-wrap: wrap;">
          ${body.images
            .map(
              (image) =>
                `<div style="flex: 1 1 50%; padding: 5px;"><img src="${image}" alt="Image" style="width: 100%; height: auto;" /></div>`
            )
            .join("")}
        </div>
      `,
    };

    // Email to admin
    const adminMailOptions = {
      from: '"Web Notify" <webnotify@strongqatar.com>',
      to: "info@vandenbergcarclassic.nl",
      // cc: "mughal1626@gmail.com",
      subject: "New Selling Form Submission",
      html: `
        <p>A new selling form has been submitted by ${
          body.fullName
        }. Details:</p>
        <p><strong>Full Name:</strong> ${body.fullName}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Place Name:</strong> ${body.placeName}</p>
        <p><strong>Phone Number:</strong> ${body.phoneNumber}</p>
        <p><strong>License Number:</strong> ${body.licenseNumber}</p>
        <p><strong>Message:</strong> ${body.message}</p>
        <p><strong>Images:</strong></p>
        <div style="display: flex; flex-wrap: wrap;">
          ${body.images
            .map(
              (image) =>
                `<div style="flex: 1 1 50%; padding: 5px;"><img src="${image}" alt="Image" style="width: 100%; height: auto;" /></div>`
            )
            .join("")}
        </div>
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
