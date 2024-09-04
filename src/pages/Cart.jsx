import React, { useEffect, useState } from 'react'

function Cart() {
  const [products, setProducts] = useState([]);
  useEffect(()=>{
    if(localStorage.getItem("products")){
      setProducts(JSON.parse(localStorage.getItem("products")))
    }
  }, [])
  return (
    <div>
      Cart
    </div>
  )
}

export default Cart
