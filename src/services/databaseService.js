import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Database service functions
export const databaseService = {
  // Get all available languages
  async getLanguages() {
    try {
      const { data, error } = await supabase
        .from("languages")
        .select("*")
        .order("id", { ascending: false }); // This will put Swedish (id: 2) first, then English (id: 1)

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching languages:", error);
      return [];
    }
  },

  // Get content for a specific section and language
  async getContent(sectionKey, languageCode) {
    try {
      // First get the language ID
      const { data: languageData, error: langError } = await supabase
        .from("languages")
        .select("id")
        .eq("code", languageCode)
        .single();

      if (langError) throw langError;

      // Then get the section ID
      const { data: sectionData, error: sectionError } = await supabase
        .from("content_sections")
        .select("id")
        .eq("section_key", sectionKey)
        .single();

      if (sectionError) throw sectionError;

      // Finally get the content
      const { data, error } = await supabase
        .from("multilingual_content")
        .select("content")
        .eq("language_id", languageData.id)
        .eq("section_id", sectionData.id)
        .single();

      if (error) throw error;
      return data?.content || "";
    } catch (error) {
      console.error(
        `Error fetching content for ${sectionKey} in ${languageCode}:`,
        error
      );
      return "";
    }
  },

  // Get all content for a specific language
  async getLanguageContent(languageCode) {
    try {
      // First get the language ID
      const { data: languageData, error: langError } = await supabase
        .from("languages")
        .select("id")
        .eq("code", languageCode)
        .single();

      if (langError) throw langError;

      // Then get all content for this language
      const { data, error } = await supabase
        .from("multilingual_content")
        .select(
          `
          content,
          content_sections!inner(section_key)
        `
        )
        .eq("language_id", languageData.id);

      if (error) throw error;

      // Transform data to match expected format
      const contentMap = {};
      data?.forEach((item) => {
        contentMap[item.content_sections.section_key] = item.content;
      });

      return contentMap;
    } catch (error) {
      console.error(
        `Error fetching content for language ${languageCode}:`,
        error
      );
      return {};
    }
  },

  // Get all content for all languages (for debugging)
  async getAllContent() {
    try {
      const { data, error } = await supabase
        .from("multilingual_content")
        .select(
          `
          content,
          languages!inner(code, name, flag),
          content_sections!inner(section_key)
        `
        )
        .order("languages.code")
        .order("content_sections.section_key");

      if (error) throw error;
      return data || [];
    } catch (error) {
      console.error("Error fetching all content:", error);
      return [];
    }
  },
};
