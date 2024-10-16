import { createContext, useState, useEffect } from "react";

import { getCategoriesAndDocuments } from "../utils/firebase/firebase.utils";

export const CategoriesContext = createContext({
  categoriesMap: {},
});

export const CategoriesProvider = ({ children }) => {
  const [categoriesData, setCategoriesData] = useState({});

  useEffect(() => {
    const fetchCategoriesData = async () => {
      const fetchedCategories = await getCategoriesAndDocuments("categories");
      console.log(fetchedCategories);
      setCategoriesData(fetchedCategories);
    };
    fetchCategoriesData();
  }, []);

  const value = { categoriesData };

  return (
    <CategoriesContext.Provider value={value}>
      {children}
    </CategoriesContext.Provider>
  );
};
