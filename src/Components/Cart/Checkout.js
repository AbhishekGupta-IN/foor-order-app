import { useRef, useState } from "react";
import classes from "./Checkout.module.css";

const isEmpty = (value) => value.trim() === "";
const isSixChars = (value) => value.trim().length === 6;

const Checkout = (props) => {
  const [formValidity, setFormValidity] = useState({
    name: true,
    street: true,
    pin: true,
    city: true,
  });

  const nameInput = useRef();
  const streetInput = useRef();
  const pinInput = useRef();
  const cityInput = useRef();

  const confirmHandler = (event) => {
    event.preventDefault();

    const name = nameInput.current.value;
    const street = streetInput.current.value;
    const pin = pinInput.current.value;
    const city = cityInput.current.value;

    const isNameValid = !isEmpty(name);
    const isStreetValid = !isEmpty(street);
    const isPinValid = isSixChars(pin);
    const isCityValid = !isEmpty(city);

    const isFormValid =
      isNameValid && isStreetValid && isPinValid && isCityValid;

    setFormValidity({
      name: isNameValid,
      street: isStreetValid,
      pin: isPinValid,
      city: isCityValid,
    });

    if (!isFormValid) return;

    props.onConfirm({
      name,
      street,
      pin,
      city,
    });
  };

  const nameClass = `${classes.control} ${
    formValidity.name ? "" : classes.invalid
  }`;
  const streetClass = `${classes.control} ${
    formValidity.street ? "" : classes.invalid
  }`;
  const pinClass = `${classes.control} ${
    formValidity.pin ? "" : classes.invalid
  }`;
  const cityClass = `${classes.control} ${
    formValidity.city ? "" : classes.invalid
  }`;

  return (
    <form onSubmit={confirmHandler}>
      <div className={nameClass}>
        <label htmlFor="name">Your Name</label>
        <input id="name" type="text" ref={nameInput} />
        {!formValidity.name && <p>Please enter a valid name.</p>}
      </div>
      <div className={streetClass}>
        <label htmlFor="street">Street</label>
        <input id="street" type="text" ref={streetInput} />
        {!formValidity.street && <p>Please enter a valid street.</p>}
      </div>
      <div className={pinClass}>
        <label htmlFor="pin">PIN</label>
        <input id="pin" type="text" ref={pinInput} />
        {!formValidity.pin && <p>Please enter a valid pin (6 characters).</p>}
      </div>
      <div className={cityClass}>
        <label htmlFor="city">City</label>
        <input id="city" type="text" ref={cityInput} />
        {!formValidity.city && <p>Please enter a valid city.</p>}
      </div>
      <div className={classes.actions}>
        <button type="button" onClick={props.onCancel}>
          Cancel
        </button>
        <button>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;
