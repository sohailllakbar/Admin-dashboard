import React, { useState } from "react";
import styles from "./userdata.module.css";
import { useRef } from "react";
import { useDispatch } from "react-redux";
import { Create } from "../redux-store/slices/UserInfo";
import { useNavigate } from 'react-router-dom';



const UserData = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();


  {
    /*---------states to show error message and for checking validation------*/
  }
  const [emailStyle, setEmailStyle] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [phoneStyle, setPhoneStyle] = useState(false);
  const [phoneError, setPhoneError] = useState(false);
  const [idStyle, setIdStyle] = useState(false);
  const [idError, setIdError] = useState(false);
  const [nameStyle, setNameStyle] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [nameValue, setNameValue] = useState("");
  const [phoneValue, setPhoneValue] = useState("");
  const [idValue, setIdValue] = useState("");

  {
    /*----------------functions for validation------------*/
  }

  function validName(name) {
    return /^[a-zA-Z\s]*$/.test(name);
  }

  const validEmail = (email) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailPattern.test(email);
  };

  const validPhone = (phone) => {
    const phonePattern = /^\+?[0-9\s\-()]*$/;
    return phonePattern.test(phone);
  };

  const validId = (id) => {
    const phonePattern = /^[0-9]*$/;
    return phonePattern.test(id);
  };

  {
    /*-----------functions to get value from input fields------------*/
  }

  const handleOnchangeId = (e) => {
    const idnew = e.target.value;

    setIdValue(idnew);

    if (!validId(idnew)) {
      setIdError(true);
      setIdStyle(true);
    } else {
      setIdError(false);
      setIdStyle(false);
    }
  };

  const handleOnchangeName = (e) => {
    const namenew = e.target.value;

    setNameValue(namenew);

    if (!validName(namenew)) {
      setNameError (true);
      setNameStyle(true);
    } else {
      setNameError(false);

      setNameStyle(false);
    }
  };

  const handleOnchangeEmail = (e) => {
    const emailnew = e.target.value;

    setEmailValue(emailnew);

    if (!validEmail(emailnew)) {
      setEmailStyle(true);
      setEmailError(true);

    } else {
      setEmailStyle(false);
      setEmailError(false);

    }
  };

  const handleOnchangePhone = (e) => {
    const phonenew = e.target.value;

    setPhoneValue(phonenew);

    if (!validPhone(phonenew)) {
      setPhoneStyle(true);
      setPhoneError(true);
    } else {
      setPhoneStyle(false);
      setPhoneError(false);
    }
  };

  {
    /*using ref to get value */
  }

  const addressRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = idValue;
    const name = nameValue;
    const email = emailValue;
    const phone = phoneValue;
    const city = addressRef.current.value;

    if(!validName(nameValue)){

      

      return;

    }

    if(!validEmail(emailValue)){


      return;
    }

    if(!validPhone(phoneValue)){
      return
    }

    dispatch(Create({ id, name, email, phone, city }));
    setIdValue("");

    setNameValue("");

    setEmailValue("");

    setPhoneValue("");

    addressRef.current.value = "";

navigate('/')


  };

  return (
    <div className={styles.parent__container}>
      <h2 className={styles.form__heading}>Put User Information</h2>
      {/* form   to create new user data in the table */}
      <form className={styles.form__container} onSubmit={handleSubmit}>
        <div className={`${styles.input__id__box} ${styles.box}`}>
          <input
            className={`${styles.input__id} ${
              idStyle ? styles.input__id__condition : ""
            }`}
            type="number"
            value={idValue}
            required
            min={"0"}
            placeholder="Enter Id"
            onChange={handleOnchangeId}
          />

          <input
            className={`${styles.input__name} ${
              nameStyle ? styles.input__style__condition : ""
            }`}
            type="text"
            value={nameValue}
            required
            placeholder="Enter Name"
            onChange={handleOnchangeName}
          />
          {nameError && (
            <p className={styles.name__message}>
              ! Name can only contain letters and spaces
            </p>
          )}
        </div>
        <div className={`${styles.input__id__box} ${styles.box}`}>
          <input
            className={`${styles.input__email}  ${
              emailStyle ? styles.input__style__email : ""
            }`}
            type="email"
            required
            value={emailValue}
            placeholder="Enter E-mail"
            onChange={handleOnchangeEmail}
          />
          {
            emailError && (
              <p className={styles.email__error__message}>! Please Enter a valid Email</p>
            )
          }
         



          <input
            className={`${styles.input__phone__no} ${
              phoneStyle ? styles.input__phone__condition : ""
            }`}
            type="tel"
            value={phoneValue}
            required
            placeholder="Enter Phone-no"
            onChange={handleOnchangePhone}
          />
        </div>
        <div className={`${styles.input__id__box} ${styles.box}`}>
          <textarea
            className={styles.input__address}
            ref={addressRef}
            required
            placeholder="Enter Address"
          />
        </div>
        <div className={styles.btn__container}>
        <button className={styles.btn__form} type="submit">
          Add Now
        </button>
        </div>
        
      </form>
    </div>
  );
};

export default UserData;
