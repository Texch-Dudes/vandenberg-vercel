"use client";
import { PAGES_LINKS } from "@/constant";
import { getCurrentBrowser } from "@/utils";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Parallax } from "../Parallax/Parallax";
import "./banner.scss";

export default function Banner({
  id,
  banner = false,
  mainHeading,
  bgImage,
  headingText,
  descriptionText,
  className,
  scale = true,
  clipPath = true,
}) {
  const pathname = usePathname();
  const freshload = useSelector((state) => state?.common?.freshLoad);
  const [changed, setChanged] = React.useState(!freshload);
  const [isImageLoaded, setImageLoaded] = useState(false);
  const browser = getCurrentBrowser();
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pathname]);

  useEffect(() => {
    if (!freshload) setChanged(true);
  }, [pathname]);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <>
      <Parallax speed={1}>
        <section
          className={`bgImg dark ${className || ""} ${banner ? "banner" : ""
            } bannerSection ${changed ? "bannerAnimation" : ""} bannerEffect`}
          style={{
            backgroundImage: isImageLoaded ? `url(${bgImage})` : "none",
            ...(browser === "safari" && { transition: "all 0.5s ease-in-out" }),
          }}
        >
          <Image
            src={bgImage}
            alt="Image"
            width={1000}
            height={1000}
            priority // Preloads the image for better performance
            onLoadingComplete={handleImageLoad}
            style={{
              ...(PAGES_LINKS.getCarDetailsPath(id) === pathname
                ? { display: "block" }
                : { display: "none" }),
            }}
          />
          <div
            className={`container ${PAGES_LINKS.getCarDetailsPath(id) === pathname
                ? "absoluteWrapper"
                : ""
              }`}
          >
            <div className="block flexWrapper">
              <div className="headingBlock">
                {mainHeading && <h3>{mainHeading}</h3>}
                <h1>
                  {headingText?.map((item, index) => (
                    <span key={index}>
                      <span >{item?.line}</span>
                    </span>
                  ))}
                </h1>
              </div>
              {descriptionText && <p>{descriptionText}</p>}
            </div>
          </div>
        </section>
      </Parallax>
    </>
  );
}
