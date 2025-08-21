import React, { createContext, useContext, useState, useEffect } from "react";
import { databaseService } from "../services/databaseService";

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [languages, setLanguages] = useState([]);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(true);

  // Load available languages on component mount
  useEffect(() => {
    const loadLanguages = async () => {
      try {
        const availableLanguages = await databaseService.getLanguages();
        setLanguages(availableLanguages);

        // Load content for default language
        const defaultContent = await databaseService.getLanguageContent(
          currentLanguage
        );
        setContent(defaultContent);
        setLoading(false);
      } catch (error) {
        console.error("Error loading languages:", error);
        setLoading(false);
      }
    };

    loadLanguages();
  }, []);

  // Load content when language changes
  useEffect(() => {
    const loadContent = async () => {
      if (currentLanguage) {
        try {
          setLoading(true);
          const newContent = await databaseService.getLanguageContent(
            currentLanguage
          );
          setContent(newContent);
          setLoading(false);
        } catch (error) {
          console.error("Error loading content:", error);
          setLoading(false);
        }
      }
    };

    loadContent();
  }, [currentLanguage]);

  const changeLanguage = (languageCode) => {
    setCurrentLanguage(languageCode);
  };

  const getText = (sectionKey) => {
    return content[sectionKey] || sectionKey;
  };

  const value = {
    currentLanguage,
    languages,
    content,
    loading,
    changeLanguage,
    getText,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
