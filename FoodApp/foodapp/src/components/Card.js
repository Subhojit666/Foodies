import React, { useEffect, useState, useRef } from "react";
import { useDispatchCart, useCart } from './ContextReducer';
import _ from 'lodash';

export default function Card(props) {
  let dispatch = useDispatchCart();
  let data = useCart();
  let options = props.options;
  let priceOptions = Object.keys(options);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState(priceOptions[0]); // Initialize size with the first option
  const [finalPrice, setFinalPrice] = useState(0);

  useEffect(() => {
    const calculateFinalPrice = () => {
      setFinalPrice(qty * parseInt(options[size], 10));
    };

    calculateFinalPrice();
  }, [qty, size, options]);

  const handleAddToCart = async () => {
    let food = data.find(item => item.id === props.foodItem._id);

    if (food) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: props.foodItem._id, price: finalPrice, qty: qty });
      } else {
        await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
      }
    } else {
      await dispatch({ type: "ADD", id: props.foodItem._id, name: props.foodItem.name, price: finalPrice, qty: qty, size: size, img: props.ImgSrc });
    }
  }

  return (
    <div>
      <div className="card mt-3" style={{ width: "18rem", maxHeight: "360px" }}>
        <img
          src={props.foodItem.img}
          className="card-img-top"
          alt="..."
          style={{ height: "120px", objectFit: "fill" }}
        />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the bulk of the card's content.
          </p>
          <div className="container w-100">
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setQty(parseInt(e.target.value, 10))}
            >
              {Array.from(Array(6), (e, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
            <select
              className="m-2 h-100 bg-success rounded"
              onChange={(e) => setSize(e.target.value)}
            >
              {priceOptions.map((data) => (
                <option key={data} value={data}>
                  {data}
                </option>
              ))}
            </select>
            <div className="d-inline h-100 fs-5">₹{finalPrice}/-</div>
            <button
              className={`btn btn-success w-100`}
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
