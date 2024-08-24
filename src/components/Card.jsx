import React from "react";
import { useNavigate } from "react-router-dom";

function Card({ product }) {
  const navigate = useNavigate();

  function handleCard(event) {
    let productId = event.currentTarget.getAttribute("data-id");
    navigate(`/products/id=${productId}`);
  }

  return (
    <div
      onClick={handleCard}
      data-id={product.id}
      className="card cursor-pointer bg-base-100 w-full shadow-xl"
    >
      <figure className="p-6 h-full w-full" aria-disabled>
        <img
          aria-disabled
          src={product.attributes.image}
          alt={product.attributes.title}
          className="rounded-xl object-cover h-64 w-full"
        />
      </figure>
      <div className="card-body  pt-0 items-center text-center">
        <h2 className="card-title">{product.attributes.title}</h2>
        <p className="text-blue-600">{product.attributes.price / 100}</p>
      </div>
    </div>
  );
}

export default Card;
