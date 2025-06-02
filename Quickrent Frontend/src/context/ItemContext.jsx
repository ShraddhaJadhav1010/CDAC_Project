import React, { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { urlConfig } from "../configs/UrlConfig";
import { jwtDecode } from "jwt-decode";

const ItemContext = createContext();

// Custom hook to use items in other components
export const useItems = () => {
  return useContext(ItemContext);
};

export const ItemProvider = ({ children }) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  // Fetch products from the database on component mount
  useEffect(() => {
    const fetchItems = async () => {
      var id = null;
      const token = localStorage.getItem("JwtToken");
      const decodedToken = token ? jwtDecode(token) : null;
      id = decodedToken?.Id;
      try {
        const response = await axios.get(`${URL}:${PORT}/api/product/user/${id}`);
        const formattedItems = response.data.map(item => ({
          productId: item.productId,
          title: item.title,
          brandName: item.brandName,
          modelName: item.modelName,
          description: item.description,
          categoryId: item.categoryId,
          specifications: item.specifications,
          price: item.price,
          advancePayment: item.advancePayment,
          userId: item.userId,
          image: `${URL}:${PORT}/${item.image}`,
        }));
        setItems(formattedItems);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching items:", err);
        setError("Failed to load items. Please try again later.");
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  // Update an item
  const updateItem = async (updatedItem) => {
    if (!updatedItem.productId) {
      console.error("Product ID is undefined, cannot update item.");
      return;
    }
  
    try {
      const formData = new FormData();
      for (const key in updatedItem) {
        if (key === "imageFile" && updatedItem[key]) {
          formData.append("ImageFile", updatedItem[key]);
        } else if (key !== "imageFile") {
          formData.append(key, updatedItem[key]);
        }
      }
  
      await axios.put(`${URL}:${PORT}/api/SellerProduct/${updatedItem.productId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
  
      setItems((prevItems) =>
        prevItems.map((item) => (item.productId === updatedItem.productId ? { ...item, ...updatedItem } : item))
      );
    } catch (err) {
      console.error("Error updating item:", err);
    }
  };

  // Delete an item
  const deleteItem = async (productId) => {
    try {
      await axios.delete(`${URL}:${PORT}/api/SellerProduct/${productId}`);
      setItems((prevItems) => prevItems.filter(item => item.productId !== productId));  // Remove from view
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };
  

  return (
    <ItemContext.Provider value={{ items, updateItem, deleteItem, loading, error }}>
      {children}
    </ItemContext.Provider>
  );
};