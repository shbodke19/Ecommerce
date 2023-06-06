import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = async () => {
    let result = await fetch("http://localhost:3600/products", {
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });

    result = await result.json();
    setProducts(result);
  };
  console.log("products", products);

  const deletePro = async (id) => {
    let result = await fetch(`http://localhost:3600/product/${id}`, {
      method: "Delete",
      headers: {
        authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    });
    result = await result.json();
    if (result) {
      getProducts();
    }
  };

  const searchHandle = async (event) => {
    let key = event.target.value;
    if (key) {
      let result = await fetch(`http://localhost:3600/search/${key}`, {
        headers: {
          authorization: `bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      });
      result = await result.json();
      if (result) {
        setProducts(result);
      }
    } else {
      getProducts();
    }
  };

  return (
    <div className="product-list">
      <h1 style={{ color: "pink" }}>Product List</h1>
      <input
        type=""
        className="search-product-box"
        placeholder="Search Product"
        onChange={searchHandle}
      />
      <ul>
        <li>Serial Number</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company </li>
        <li>Remove</li>
      </ul>
      {products.length > 0 ? (
        products.map((val, ind) => {
          return (
            <ul key={ind}>
              <li>{ind + 1}</li>
              <li>{val.name}</li>
              <li>{val.price}</li>
              <li>{val.category}</li>
              <li>{val.company}</li>
              <li>
                <button onClick={() => deletePro(val._id)}>Delete</button>{" "}
                <Link to={"/update/" + val._id}>Update </Link>
              </li>
            </ul>
          );
        })
      ) : (
        <h1 style={{ color: "pink" }}>No Result Found</h1>
      )}
    </div>
  );
};

export default ProductList;
