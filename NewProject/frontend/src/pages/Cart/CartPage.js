import React from "react";
import { useCart } from "../../hooks/useCart";
import classes from "./cartPage.module.css";
import Title from "../../components/Title/Title";

export default function CartPage() {
  const { cart } = useCart();

  return (
    <>
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

      {cart && cart.items.length > 0 && (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map((item) => (
              <li key={item.food.id}>
                <div>
                  <img
                    src={`/foods/${item.food.imageUrl}`}
                    alt={item.food.name}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
