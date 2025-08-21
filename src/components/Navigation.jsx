import React, { useState, useEffect, useRef } from "react";
import { useLanguage } from "../contexts/LanguageContext";
import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";

const NavContainer = styled.nav`
  background: transparent;
  padding: 15px 20px 0 20px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
`;

const NavContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding: 0 40px;

  @media (max-width: 768px) {
    justify-content: space-between;
    padding: 0 20px;
  }
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  img {
    height: 32px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 50px;
  margin-left: auto;
  margin-right: 50px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  color: rgb(255, 255, 255);
  text-decoration: none;
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 18px;
  transition: color 0.3s ease;
`;

const LanguageDropdown = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  color: rgb(255, 255, 255);
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s ease;
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;

  img {
    width: 20px;
    height: 15px;
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    padding: 8px 8px;
    font-size: 14px;
  }
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 160;
  background: white;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  z-index: 1001;
  display: ${(props) => (props.isOpen ? "block" : "none")};
  overflow: hidden;
`;

const DropdownItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  color: #333;
  font-family: "Open Sans", sans-serif;
  font-weight: 500;

  img {
    width: 20px;
    height: 15px;
    border-radius: 2px;
  }

  span {
    font-weight: 500;
  }
`;

const HamburgerButton = styled.button`
  display: none;
  background: none;
  border: none;
  color: rgb(255, 255, 255);
  font-size: 35px;
  cursor: pointer;
  padding: 8px;
  font-family: "Open Sans", sans-serif;
  font-weight: 500;

  @media (max-width: 768px) {
    display: block;
    order: -1;
    padding: 4px;
    font-size: 30px;
  }
`;

const MobileMenu = styled(motion.div)`
  position: fixed;
  width: 200px;
  top: 90px;
  left: 40px;
  right: 0;
  background: white;
  backdrop-filter: blur(10px);
  padding: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  overflow: hidden;

  @media (max-width: 768px) {
    display: block;
  }
`;

const MobileNavLink = styled.a`
  display: block;
  color: #333;
  text-decoration: none;
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  padding: 20px;
  transition: color 0.3s ease;

  &:last-child {
    border-bottom: none;
  }
`;

const RightContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 30px;

  @media (max-width: 768px) {
    gap: 225px;
  }
`;

const Navigation = () => {
  const { currentLanguage, languages, changeLanguage, getText } = useLanguage();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Create fixed background div for mobile compatibility
  useEffect(() => {
    // Check if background container already exists
    let backgroundContainer = document.querySelector(".background-container");

    if (!backgroundContainer) {
      // Create background div
      backgroundContainer = document.createElement("div");
      backgroundContainer.className = "background-container";

      // Check if mobile
      const isMobile = window.innerWidth <= 768;

      backgroundContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background: url('https://storage.123fakturera.se/public/wallpapers/sverige43.jpg') no-repeat center ${
          isMobile ? "20%" : "center"
        };
        background-size: cover;
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
      `;

      // Insert at the beginning of body
      document.body.insertBefore(backgroundContainer, document.body.firstChild);
    }

    // Cleanup function
    return () => {
      if (backgroundContainer && backgroundContainer.parentNode) {
        backgroundContainer.parentNode.removeChild(backgroundContainer);
      }
    };
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsLanguageDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleLanguageDropdown = () => {
    setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
  };

  const handleLanguageChange = (languageCode) => {
    changeLanguage(languageCode);
    setIsLanguageDropdownOpen(false);
    closeMobileMenu();
  };

  const currentLanguageData = languages.find(
    (lang) => lang.code === currentLanguage
  );

  return (
    <>
      <NavContainer>
        <NavContent>
          <Logo>
            <img
              src="https://storage.123fakturera.se/public/icons/diamond.png"
              alt="Logo"
            />
          </Logo>

          <NavLinks>
            <NavLink href="#" onClick={closeMobileMenu}>
              {getText("nav_home")}
            </NavLink>
            <NavLink href="#" onClick={closeMobileMenu}>
              {getText("nav_order")}
            </NavLink>
            <NavLink href="#" onClick={closeMobileMenu}>
              {getText("nav_customers")}
            </NavLink>
            <NavLink href="#" onClick={closeMobileMenu}>
              {getText("nav_about")}
            </NavLink>
            <NavLink href="#" onClick={closeMobileMenu}>
              {getText("nav_contact")}
            </NavLink>
          </NavLinks>

          <RightContainer>
            <div ref={dropdownRef}>
              <LanguageDropdown onClick={toggleLanguageDropdown}>
                <span>{currentLanguageData?.name}</span>
                <img
                  src={currentLanguageData?.flag}
                  alt={currentLanguageData?.name}
                />
              </LanguageDropdown>

              <DropdownMenu isOpen={isLanguageDropdownOpen}>
                {languages.map((language) => (
                  <DropdownItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language.code)}
                  >
                    <span>{language.name}</span>
                    <img src={language.flag} alt={language.name} />
                  </DropdownItem>
                ))}
              </DropdownMenu>
            </div>

            <HamburgerButton onClick={toggleMobileMenu}>☰</HamburgerButton>
          </RightContainer>
        </NavContent>
      </NavContainer>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <MobileMenu
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <MobileNavLink href="#" onClick={closeMobileMenu}>
                {getText("nav_home")}
              </MobileNavLink>
              <MobileNavLink href="#" onClick={closeMobileMenu}>
                {getText("nav_order")}
              </MobileNavLink>
              <MobileNavLink href="#" onClick={closeMobileMenu}>
                {getText("nav_customers")}
              </MobileNavLink>
              <MobileNavLink href="#" onClick={closeMobileMenu}>
                {getText("nav_about")}
              </MobileNavLink>
              <MobileNavLink href="#" onClick={closeMobileMenu}>
                {getText("nav_contact")}
              </MobileNavLink>
            </motion.div>
          </MobileMenu>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navigation;
