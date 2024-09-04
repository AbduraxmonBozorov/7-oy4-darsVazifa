import React, { useEffect, useState } from "react";

function Cart() {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    if (localStorage.getItem("products")) {
      setProducts(JSON.parse(localStorage.getItem("products")));
    }
  }, []);

  function handleChangeAmout(){}

  return (
    <div className="container">
      <h1 className="border-b-2 text-3xl mt-10 my-5 py-2">Shopping Cart</h1>
      <div className="products my-5">
        {products.length &&
          products.map((product) => (
            <div className="flex flex-row justify-between my-3 ">
              <img src={product.image} className="w-36 h-36 rounded" alt="" />
              <div>
                <h3>{product.title}</h3>
                <p>{product.company}</p>
                Colors: 
                {product.colors.map((color, ind) => (
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
              <div>
                <h3>Amout</h3>
                <input type="text" name="" id="" onChange={handleChangeAmout} value={product.count} />
              </div>
              <div className="bg-slate-100 rounded p-5 w-60">
                <div className="flex flex-row justify-between border-b">
                  <h3>Subtotal</h3>
                  <h3>${product.price/100*product.count}</h3>
                </div>
                <div className="flex flex-row justify-between border-b">
                  <h3>Shipping</h3>
                  <h3>$5</h3>
                </div>
                <div className="flex flex-row justify-between border-b">
                  <h3>Tax</h3>
                  <h3>$577.89</h3>
                </div>
                <div className="flex flex-row justify-between border-b">
                  <h3>Order Total</h3>
                  <h3>${(product.count*product.price/100+5+577.89).toFixed(2)}</h3>
                </div>

              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

export default Cart;
