import React, { useState } from "react";

function Products(props) {
  let [count, setCount] = useState(0);
  let [cart, setCart] = useState([]);
  let [click, setClick] = useState(false);

  const handleClick = (product) => {
    setCart([...cart, product]);
    setCount(count + 1);
  };

  const handleCart = () => {
    setClick(!click);
  };

  const handleDelete = () => {
    setCart([]);
    setCount((count = 0));
  };

  let products = cart;
  let price = products.reduce((acc, amount) => {
    acc = Number(acc) + Number(amount.price);
    return acc;
  }, []);

  return (
    <>
      <div className="flex-60">
        <div className="grid">
          <button onClick={handleCart} className="cart-logo">
            <img src="/static/bag-icon.png" alt="cart" />
            <div className={count === 0 ? "cart-count hidden" : "cart-count"}>
              {count}
            </div>
          </button>
          {props.item.map((product) => (
            <div key={product.id} className="box">
              <div className={product.isFreeShipping ? "absolute" : "hidden"}>
                Free Shipping
              </div>
              <img className="image" src={product.large} alt="T-Shirt" />
              <h3>{product.title}</h3>
              <hr />
              <h4>
                {product.currencyFormat} {product.price}
              </h4>
              <button onClick={() => handleClick(product)}>Add to Cart</button>
            </div>
          ))}
        </div>
      </div>
      <div className={click ? "cart-details" : "hidden"}>
        <div className="flex-1">
          <img src="/static/bag-icon.png" alt="cart" />

          <h2>Cart</h2>
        </div>
        <img
          onClick={handleCart}
          className="cross"
          src="\static\sprite_delete-icon.png"
          alt="cross"
        />
        <div>{cart === [] ? "Empty Cart" : `${count} products`}</div>

        {cart.map((item) => (
          <div className="cart-products flex" key={item.id}>
            <img src={item.small} alt="product" />
            <div>
              <h3>{item.title}</h3>
              <h5>{item.style}</h5>

              <h3>{!props.size ? item.availableSizes[0] : props.size}</h3>
            </div>
            <h4>
              {item.currencyFormat} {item.price}
            </h4>
          </div>
        ))}
        <div className="flex evenly">
          <button onClick={handleDelete}>Empty Cart</button>
          <h3>SubTotal: ${price}</h3>
        </div>
      </div>
    </>
  );
}

export default Products;
