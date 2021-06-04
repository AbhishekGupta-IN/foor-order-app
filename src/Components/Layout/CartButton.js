import { useContext, useEffect, useState } from "react";
import CartContext from "../../Store/cart-context";
import CartIcon from "../Cart/CartIcon";
import styles from "./CartButton.module.css";

const CartButton = (props) => {
  const cartCtx = useContext(CartContext);

  const [isItemAdded, setIsItemAdded] = useState(false);

  const { items } = cartCtx;
  const numberOfCartItems = items.reduce((sum, item) => sum + item.amount, 0);

  const btnClasses = `${styles.button} ${isItemAdded ? styles.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setIsItemAdded(true);

    const timer = setTimeout(() => {
      setIsItemAdded(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);

  return (
    <button className={btnClasses} onClick={props.onClick}>
      <span className={styles.icon}>{<CartIcon />}</span>
      <span>Your Cart</span>
      <span className={styles.badge}>{numberOfCartItems}</span>
    </button>
  );
};

export default CartButton;
