"use client"
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import "./header.scss";
import nl from "../../public/nl.png";
import VenDenBergLogo from "../../public/Ven-Den-Berg-Logo.svg";
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Menu from "./menu/menu";
import { usePathname } from "next/navigation";
import { PAGES_KEY, PAGES_LINKS } from "@/constant";
import { useSelector } from 'react-redux'

const options = [
  { value: 'NL', label: <div className='langFlag'><img src={nl.src} height="30px" width="20px" />NL</div> },
  { value: 'EN', label: <div className='langFlag'><img src={nl.src} height="30px" width="20px" />EN</div> },
  { value: 'FR', label: <div className='langFlag'><img src={nl.src} height="30px" width="20px" />FR</div> },
  { value: 'DE', label: <div className='langFlag'><img src={nl.src} height="30px" width="20px" />DE</div> },
  { value: 'ES', label: <div className='langFlag'><img src={nl.src} height="30px" width="20px" />ES</div> },
];

export const navigationData = [
  {
    title: "Home",
    title_en: "Home",
    title_fr: "Accueil",
    title_de: "Startseite",
    title_es: "Inicio",
    key: PAGES_KEY.HOME,
    url: PAGES_LINKS.HOME,
    buttonName: "homeButton",
    buttonCategory: "mainMenu",
    buttonType: "link",
  },
  {
    title: "Over Ons",
    title_en: "About Us",
    title_fr: "À propos de nous",
    title_de: "Über uns",
    title_es: "Sobre nosotros",
    url: PAGES_LINKS.ABOUT_US,
    key: PAGES_KEY.ABOUT_US,
    buttonName: "OverOnsButton",
    buttonCategory: "mainMenu",
    buttonType: "link",
  },
  {
    title: "Restauratie",
    title_en: "Restoration",
    title_fr: "Restauration",
    title_de: "Restaurierung",
    title_es: "Restauración",
    url: PAGES_LINKS.ADVISE,
    key: PAGES_KEY.ADVISE,
    buttonName: "AdviesButton",
    buttonCategory: "mainMenu",
    buttonType: "link",
  },
  {
    title: "Speed",
    title_en: "Speed",
    title_fr: "Vitesse",
    title_de: "Geschwindigkeit",
    title_es: "Velocidad",
    url: PAGES_LINKS.SPEED,
    key: PAGES_KEY.SPEED,
    buttonName: "speedButton",
    buttonCategory: "mainMenu",
    buttonType: "link",
  },
  {
    title: "Collectie",
    title_en: "Collection",
    title_fr: "Collection",
    title_de: "Sammlung",
    title_es: "Colección",
    url: PAGES_LINKS.COLLECTION,
    key: PAGES_KEY.COLLECTIVE,
    buttonName: "collectieButton",
    buttonCategory: "mainMenu",
    buttonType: "link",
  },
  {
    title: "Contact",
    title_en: "Contact",
    title_fr: "Contact",
    title_de: "Kontakt",
    title_es: "Contacto",
    url: PAGES_LINKS.CONTACT,
    key: PAGES_KEY.CONTACT,
    buttonName: "contactButton",
    buttonCategory: "mainMenu",
    buttonType: "link",
  },
];

gsap.registerPlugin(ScrollTrigger);
export default function Header({ setIsNavLinkCliked, setFirstLoad }) {
  const [logoAnimation, setLogoAnimation] = useState(false);
  const languages = useSelector(state => state?.common?.languages) || [];
  const activeMenu = useSelector(state => state?.common?.activeMenu) || [];
  const appDetails = useSelector(state => state?.common?.appDetails) || {}
  const pathname = usePathname();
  const [showNav, setShowNav] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("nl");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setSelectedLanguage(localStorage.getItem('language') || 'nl');
    }
  }, []);

  const menuData = navigationData.map((link) => {
    const currentLink = activeMenu?.filter((data) => {
      return data?.connectedObject?.pageKey?.key === link.key
    });
    if (currentLink.length) {
      link.title = currentLink[0]?.label
    }
    return link
  }).map(link => {
    switch (selectedLanguage) {
      case 'EN':
        link.title = link.title_en;
        break;
      case 'FR':
        link.title = link.title_fr;
        break;
      case 'DE':
        link.title = link.title_de;
        break;
      case 'ES':
        link.title = link.title_es;
        break;
      case 'NL':
        link.title = link.title;
        break;
      default: null;
    }
    return link;
  });

  const languageFlags = languages.map((language) => {
    return {
      value: language?.language_code,
      label: <div className='langFlag'>
        <Image priority src={language?.language_code === 'nl' ? nl.src : language?.country_flag_url || nl?.src} height={30} width={20} alt="NL" />
        {/* <Image src={nl?.src} height={30} width={20} alt="NL" /> */}
        {language?.language_code?.toLocaleUpperCase()}
      </div>
    }
  })

  const handleLogoAnimation = (val) => {
    setLogoAnimation(val)
  }
  // useEffect(() => {
  //   document.querySelectorAll("img").forEach(img => {
  //     if (img.complete) {
  //       ScrollTrigger.refresh();
  //     } else {
  //       img.addEventListener('load', imgLoaded => ScrollTrigger.refresh());
  //     }
  //   });
  // });
  return (
    <header className="header-wrapper" >
      <div className="container">
        <div className="flexWrapper headerBlock">
          <div className='mobileMenuHeader'>
            <div className={`logo ${logoAnimation ? 'active' : ""}`}>
              <Link href="/">
                <VenDenBergLogo />
              </Link>
            </div>
          </div>
          <Menu flags={languageFlags}
            navigationData={menuData}
            setIsNavLinkCliked={setIsNavLinkCliked}
            handleLogoAnimation={handleLogoAnimation}
            setShowNav={setShowNav}
            showNav={showNav}
            setFirstLoad={setFirstLoad}
          />
          {/* <NavContextProvider> */}
          {/* <Menu flags={languageFlags} navigationData={menuData} handleLogoAnimation={handleLogoAnimation} /> */}
          {/* <OverlayMenu navigationData={menuData} /> */}
          {/* </NavContextProvider> */}
        </div >
      </div >
    </header >
  );
}

