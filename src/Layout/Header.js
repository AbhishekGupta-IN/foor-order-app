import styles from "./Header.module.css";
import mainImage from "../assets/meals.jpg";
import CartButton from "./CartButton";

const Header = (props) => {
  return (
    <>
      <header className={styles.header}>
        <h1>ReactMeals</h1>
        <CartButton />
      </header>
      <div className={styles["main-image"]}>
        <img src={mainImage} alt="A table full of delicious food" />
      </div>
    </>
  );
};

export default Header;
