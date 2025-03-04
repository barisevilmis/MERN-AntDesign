import React, { useEffect, useState } from "react";
import Menu from "../components/menu/Menu";
import Categories from "../components/categories/Categories";
import Products from "../components/products/Products";
import Cart from "../components/cart/Cart";
import axios from "axios";

const HomePage = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCategories();
    getProducts();
  }, []);

  const getCategories = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/categories/get-all"
      );
      setCategories(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getProducts = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/get-all"
      );
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryAdded = () => {
    getCategories();
  };

  const handleProductAdded = () => {
    getProducts();
  };



  return (
    <div className="home  flex md:flex-row flex-col justify-between gap-5">
      <div className=" bg-gray-900 md:h-[100vh]">
        <div className="menu overflow-auto max-h-[90vh] px-2 md:mt-10 mx-4 md:mx-0">
          <Menu categories={categories} categoryAdded={handleCategoryAdded} productAdded={handleProductAdded}/>
        </div>
      </div>

      <div className="cart min-w-[300px] max-h-[calc(100vh-80px)] overflow-y-auto  mt-10">
        <Cart />
      </div>

      <div className="products border p-6 flex-[7] max-h-[calc(100vh-80px)] min-w-[220px] overflow-y-auto mx-4 md:mx-0 mt-10">
        <Products products={products} />
      </div>

      <div className="categories min-w-[150px] overflow-auto max-h-[calc(100vh-80px)]
       mx-4 md:mx-0 md:mt-10 md:mr-5 border mb-6">
        <Categories categories={categories} />
      </div>
    </div>
  );
};

export default HomePage;
