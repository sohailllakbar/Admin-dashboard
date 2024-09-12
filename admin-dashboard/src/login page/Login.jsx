import React, { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./loginpage.module.css";

import { motion } from "framer-motion";



const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [iserror, setisError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is already logged in
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn) {
      navigate("/dashboard");
    }
  }, [navigate]);

  const handleOnLogin = async (e) => {

    e.preventDefault();

    if(email !== "sohailakbar@gmail.com"  || password !== "12345678"){

       setisError(true);
       return;

    }else{
        

        alert("login successfully!")

        navigate("/home")



    }

    localStorage.setItem("isLoggedIn", "true");

   

}

  return (
    <motion.div
      initial={{ y: -130, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{
        delay: 0.1,
        y: { type: "spring", stiffness: 60 },
        opacity: { duration: 1.4 },
        ease: "easeIn",
        duration: 0.3,
      }}
      className={styles.login__parent__container}
    >
     
      <div className={styles.login__form__container}>
        <h1 className={styles.sign__heading}>
            Log In
        </h1>
        <form className={styles.form__div} onSubmit={handleOnLogin}>
          <div className={styles.email__container}>
            <label className={styles.email__label}>E-mail</label>
            <input
              className={styles.input__field}
              type="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className={styles.password__container}>
            <label className={styles.password__label}>Password</label>
            <input
              className={styles.password__field}
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {iserror && <p className={styles.error__message}>!Email or Password is incorrect</p>}
          <button className={styles.login__btn} type="submit">
           Sing In
          </button>
        </form>
       
      </div>
    </motion.div>
  );
};

export default Loginpage;
