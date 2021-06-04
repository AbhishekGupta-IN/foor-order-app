import { useRef, useState } from "react";
import Input from "../../UI/Input";
import styles from "./MealItemForm.module.css";

const MealItemForm = (props) => {
  const [isValidAmount, setIsValidAmount] = useState(true);

  const amountRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();
    const amountValStr = amountRef.current.value;
    const amountValInt = +amountValStr;
    if (
      amountValStr.trim().length === 0 ||
      amountValInt < 1 ||
      amountValInt > 5
    ) {
      setIsValidAmount(false);
      return;
    }
    props.onAddToCart(amountValInt);
  };

  return (
    <form className={styles.form} onSubmit={submitHandler}>
      <Input
        ref={amountRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          type: "number",
          min: "1",
          max: "5",
          step: "1",
          defaultValue: "1",
        }}
      />
      <button>+ Add</button>
      {!isValidAmount && <p>Please enter a valid amount (1-5)</p>}
    </form>
  );
};

export default MealItemForm;
