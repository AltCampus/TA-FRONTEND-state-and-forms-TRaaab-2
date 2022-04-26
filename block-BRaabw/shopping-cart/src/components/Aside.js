import React, { useState } from "react";
import data from "../data.json";
import Products from "./Products";

function Aside() {
  let [size, setSize] = useState(null);
  let [order, setOrder] = useState("select");

  const handleChange = (event) => {
    setOrder(event.target.value);
  };

  const handleClick = (size) => {
    setSize(size);
  };

  let products = data.products;
  let sizes = products.reduce((acc, size) => {
    acc = acc.concat(size.availableSizes);
    return acc;
  }, []);
  let unique = [...new Set(sizes)];

  let item;
  if (size) {
    item = [...products].filter((product) =>
      product.availableSizes.find((s) => s === size)
    );
  } else if (order === "select") {
    item = products;
  } else if (order === "lowest") {
    item = [...products].sort(function (a, b) {
      return a.price - b.price;
    });
  } else if (order === "highest") {
    item = [...products].sort(function (a, b) {
      return b.price - a.price;
    });
  } else {
    item = products;
  }

  return (
    <>
      <div className="flex evenly">
        <h3>{item.length} Products found</h3>
        <form>
          <label htmlFor="order">Order By: </label>
          <select onChange={handleChange}>
            <option value="select">Select</option>
            <option value="lowest">Lowest to Highest</option>
            <option value="highest">Highest to Lowest</option>
          </select>
        </form>
      </div>
      <div className="flex">
        <aside className="flex-30">
          <div className="grid">
            {unique.map((s, i) => (
              <p
                key={i}
                className={s === size ? "circle active" : "circle"}
                onClick={() => handleClick(s)}
              >
                {s}
              </p>
            ))}
          </div>
        </aside>

        <Products item={item} size={size} />
      </div>
    </>
  );
}

export default Aside;
