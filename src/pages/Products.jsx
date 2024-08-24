import React, { useEffect, useState } from "react";
import Form from "../components/Form"
import Cards from "../components/Cards";


function Products() {
  const [products, setProducts] = useState([]);
 
  useEffect(()=>{
    fetch(`https://strapi-store-server.onrender.com/api/products?page1&limit=10`)
    .then(resp => resp.json())
    .then(data => {      
      setProducts(data.data)
    })
  }, [])
  
  return (
    <div className="container mx-auto">
      <Form />
      <Cards products={products} />
    </div>
  );
}

export default Products;
