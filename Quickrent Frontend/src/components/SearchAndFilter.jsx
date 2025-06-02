import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/main.css";
import { DashNav } from "./DashNav";
import axios from "axios";
import { urlConfig } from "../configs/UrlConfig";

const SearchAndFilter = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Conflicts");
  const [data, setData] = useState([]);
  const [counter, setCounter] = useState(0);

  const URL = urlConfig.APP_URL;
  const PORT = urlConfig.APP_PORT;

  useEffect(() => {
    fetchData();
  }, [selectedCategory, counter]);

  const fetchData = async () => {
    var apiUrl = "";
    switch (selectedCategory) {
      case "Conflicts":
        apiUrl = `${URL}:${PORT}/api/conflicts`;
        break;
      case "Query":
        apiUrl = `${URL}:${PORT}/api/query/getall`;
        break;
      case "Requests":
        apiUrl = `${URL}:${PORT}/api/product/getall/unverified`;
        break;
    }

    try {
      const response = await axios.get(apiUrl);
      const result = response.data;
      console.log("data:", result);
      if (Array.isArray(result)) {
        setData(result);
      } else {
        setData([]); // Ensure data is always an array
        console.error("Unexpected API response format:", result);
      }
      //setData(result);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const filteredData = data.filter((item) => {
    const searchText = searchQuery.toLowerCase();
  
    // Filtering based on selected category
    // if (selectedCategory === "All") {
    //   return (
    //     item.title?.toLowerCase().includes(searchText) ||
    //     item.description?.toLowerCase().includes(searchText) ||
    //     item.orderId?.toLowerCase().includes(searchText) ||
    //     item.name?.toLowerCase().includes(searchText) ||
    //     item.email?.toLowerCase().includes(searchText) ||
    //     item.brand?.toLowerCase().includes(searchText) ||
    //     item.model?.toLowerCase().includes(searchText)
    //   );
    // }
  
    if (selectedCategory === "Conflicts") {
      return (
        item.orderId?.toLowerCase().includes(searchText) ||
        item.title?.toLowerCase().includes(searchText) ||
        item.description?.toLowerCase().includes(searchText)
      );
    } else if (selectedCategory === "Query") {
      return (
        item.name?.toLowerCase().includes(searchText) ||
        item.email?.toLowerCase().includes(searchText) ||
        item.description?.toLowerCase().includes(searchText)
      );
    } else if (selectedCategory === "Requests") {
      return (
        item.title?.toLowerCase().includes(searchText) ||
        item.brand?.toLowerCase().includes(searchText) ||
        item.model?.toLowerCase().includes(searchText) ||
        item.description?.toLowerCase().includes(searchText)
      );
    }
  
    return false;
  });
  
  async function handleClick(productId){
    console.log(productId);
    const response = await axios.patch(`${URL}:${PORT}/api/product/verify/${productId}`);
    if(response.status == 200){
      alert("Product Listed Successfully");
      setCounter(counter+1);
    }
  }

  return (
    <div>
      {/* <DashNav /> */}
      <div className="container mt-4">
        {/* Category Buttons */}
        <div className="d-flex justify-content-around mb-4">
          {["Query", "Requests"].map((category) => (
            <button
              key={category}
              className={`btn ${selectedCategory === category ? "btn-primary" : "btn-outline-primary"}`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Search Bar */}
        <div className="text-center mb-4">
          <input
            type="text"
            className="form-control w-75 mx-auto"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {/* Display Cards */}
        <div className="d-flex flex-wrap justify-content-center gap-3">
          {filteredData.map((item) => (
            <div className="card p-3" key={item.id} style={{ width: "18rem" }}>
              {selectedCategory === "Conflicts" && (
                <>
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">Order ID: {item.orderId}</p>
                  <p className="card-text">{item.description}</p>
                </>
              )}
              {selectedCategory === "Query" && (
                <>
                  <h5 className="card-title">{item.name}</h5>
                  <p className="card-text">Email: {item.email}</p>
                  <p className="card-text">Message: {item.description}</p>
                </>
              )}
              {selectedCategory === "Requests" && (
                <>
                  <h5 className="card-title">Title: {item.title}</h5>
                  <p className="card-text">Brand: {item.brandName}</p>
                  <p className="card-text">Model: {item.modelName}</p>
                  <p className="card-text">Description: {item.description}</p>
                  <p className="card-text">Specifications: {item.specifications}</p>
                  <p className="card-text">Price: {item.price}</p>
                  <p className="card-text">Advance Payment: {item.advancePayment}</p>
                  {/* <p className="card-text">Username: {item.userId}</p>
                  <p className="card-text">Category: {item.categoryId}</p> */}
                  <p className="card-text"><a href={`${URL}:${PORT}/${item.image}`} target="_blank" rel="noopener noreferrer">Image</a></p>
                  <button onClick={()=>{handleClick(item.productId)}}>Approve</button>
                </>
              )}
            </div>
          ))}
          {filteredData.length === 0 && <p>No results found.</p>}
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;
