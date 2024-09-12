import React from "react";
import styles from "./sidebar.module.css";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { CiViewTable } from "react-icons/ci";

const SideBar = () => {
  return (
    <div className={styles.parent__container__sidebar}>
      <h4 className={styles.admin__text__heading}>ADMINIS</h4>

      <div className={styles.user__profile__container}>
        <img
          className={styles.user__profile__image}
          src="/user2.png"
          alt="this is image"
        />
        <h4 className={styles.user__profile__name}>SOHAIL AKBAR</h4>
        <p className={styles.user__profile__intro}> Fancy adminis</p>
      </div>

      <div>
        <h3 className={styles.dashboard__text}>Dashboard</h3>
      </div>

      <div className={styles.user__icon__box}>
        <ul>
          <Link to="/userdata" className={styles.link}>
            <li className={styles.user__link}>
              <FaUser className={styles.user__icon} />
              <p className={styles.userdata__text}>PROFILE FORM</p>
            </li>
          </Link>
          
          <Link className={styles.link} to="/usertable">
            <li className={styles.user__table__link}>
            <CiViewTable className={styles.table__icon} />
            <p className={styles.usertable__text}>USER TABLE</p>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};
export default SideBar;
