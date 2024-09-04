import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Detailes() {
  const [product, setProduct] = useState(null);
  const location = useLocation();
  let id = location.pathname.split("id=")[1];
  const [color, setColor] = useState("");
  const [count, setCount] = useState(1)
  // console.log(count);
  
  

  useEffect(() => {
    fetch(`https://strapi-store-server.onrender.com/api/products/${id}`)
      .then((resp) => resp.json())
      .then((data) => {
        setProduct(data.data);
      });
  }, [id]);
  // console.log(color);

  if (!product) {
    return (
      <div className="flex w-52 flex-col gap-4">
        <div className="flex items-center gap-4">
          <div className="skeleton h-16 w-16 shrink-0 rounded-full"></div>
          <div className="flex flex-col gap-4">
            <div className="skeleton h-4 w-20"></div>
            <div className="skeleton h-4 w-28"></div>
          </div>
        </div>
        <div className="skeleton h-32 w-full"></div>
      </div>
    );
  }

  const { attributes } = product;

  function handleSubmit(e){
    e.preventDefault();
    const product={...attributes, color: color, count: count}
    console.log(product);
    let products=localStorage.getItem("products") ? JSON.parse(localStorage.getItem("products")) : [];
    console.log(products);

    if(!products.length){
      products.push(product);
     
    }else{
      let isExist=products.some(item=>{
        return item.title==product.title
      })
      if(!isExist){
        products.push(product);
        
      }else {
        products.forEach(item=>{
          if(item.title==product.title && item.color==product.color){
            item.count=(item.count*1)+(product.count*1);
          }else if(item.title==product.title && item.color!=product.color){
            products.push(product);
          }
        })
      }



    }
    
    localStorage.setItem("products", JSON.stringify(products));
    
  }

  return (
    <div>
      <div className="container py-10">
        <div className="breadcrumbs text-sm">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/products">Products</Link>
            </li>
          </ul>
        </div>

        <div className="detailes-info flex gap-5 md:gap-10 lg:gap-20 flex-col md:flex-row mt-10">
          {attributes ? (
            <>
              <div className="detailes-img w-full md:w-1/2">
                <img
                  className="w-96 h-96 rounded-lg object-cover lg:w-full"
                  src={attributes.image}
                  alt={attributes.title}
                />
              </div>
              <div className="detailes-about w-full md:w-1/2">
                <h1 className="capitalize text-3xl font-bold">
                  {attributes.title}
                </h1>
                <p className="text-xl text-neutral-content font-bold mt-2">
                  {attributes.company}
                </p>
                <p className="mt-3 text-xl">Price: {attributes.price / 100}</p>
                <p className="mt-6 leading-8">{attributes.description}</p>
                <div className="colors">
                  {attributes ? (
                    <div className="mt-5">
                      <h3 className="mb-3">Colors</h3>
                      {attributes.colors.map((color, ind) => (
                        <div
                          key={ind}
                          style={{
                            display: "inline-block",
                            marginRight: "10px",
                          }}
                        >
                          <input
                            type="radio"
                            name="colors"
                            id={`color-${ind}`}
                            style={{ display: "none" }} // inputni yashirish
                            key={ind}
                            defaultChecked={ind === 0} // birinchi rangni tanlangan qilib ko'rsatish
                          />
                          <label
                            onClick={(event) => {
                              let labels = document.querySelectorAll("label");
                              labels.forEach((label) => {
                                label.style.border = "none";
                              });
                              setColor(color);
                              event.target.style.border = "2px solid black";
                            }}
                            htmlFor={`color-${ind}`}
                            style={{
                              display: "inline-block",
                              width: "24px",
                              height: "24px",
                              backgroundColor: `${color}`,
                              // border: "2px solid black",
                              borderRadius: "50%",
                              cursor: "pointer",
                            }}
                          ></label>
                        </div>
                      ))}
                    </div>
                  ) : (
                    "ver"
                  )}
                </div>
                <div className="amout flex flex-col gap-3">
                  <label htmlFor="amout">Amount</label>
                  <select value={count} onChange={(e)=>{setCount(e.target.value)}} className="select select-primary select-md">
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                  </select>
                  <button onClick={handleSubmit} className="btn btn-primary w-fit">ADD TO BAG</button>
                </div>
              </div>
            </>
          ) : (
            <div>Product details not available.</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Detailes;
