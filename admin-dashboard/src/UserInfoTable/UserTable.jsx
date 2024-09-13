import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Edit, Delete, Create } from "../redux-store/slices/UserInfo";
import styles from "./usertable.module.css";
import { Link } from "react-router-dom";
import { MdOutlineFilterListOff } from "react-icons/md";

const UserTable = () => {
  const userData = useSelector((state) => state.userdata);
  const dispatch = useDispatch();
  // dispatch(Delete(user))
  {
    /*----------functions for the validatio----------------*/
  }

  // STATE FOR THE INPUT SEARCH
  const [searchValue, setSearchValue] = useState("");

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };
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

  /*------------object for validation functions------------*/

  const validation = {
    email: validEmail,
    phone: validPhone,
    name: validName,
    id: validId,
  };

  /*-------------state to show error message and on behave of state condition--------*/

  const [combinedState, setCombinedState] = useState({
    emailvalue: "",
    phonevalue: "",
    namevalue: "",
    emailerror: false,
    phoneerror: false,
    nameerror: false,
  });

  const [isDelete, setIsdelete] = useState(false);

  {
    /* this state for creating form on the basis of state for edit any specific field in the table or all */
  }

  const [editform, setEditForm] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const editHandler = (user) => {
    setEditForm(true);
    setCurrentUser(user);
  };

  const handleOndelete = (user) => {
    setCurrentUser(user);

    setIsdelete(true);
  };

  const handleOnCancel = () => {
    setIsdelete(false);
  };

  const handledelete = () => {
    dispatch(Delete(currentUser));

    setIsdelete(false);
  };
  {
    /*------------functions for getting value and show error style on the validation-------------*/
  }

  const handleOnChange = (e, type) => {
    const { name, value } = e.target;
    setCurrentUser({
      ...currentUser,
      [name]: value,
    });

    if (!validation[type](value)) {
      setCombinedState((prev) => ({
        ...prev,
        [`${type}error`]: true,
      }));
    } else {
      setCombinedState((prev) => ({
        ...prev,
        [`${type}error`]: false,
      }));
    }
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!Object.values(combinedState).some((error) => error)) {
      dispatch(Edit(currentUser));
      setEditForm(false);
    }
  };

  // function to filter value according to input search value;

  const displayedUserData = userData.filter((user) => {
    return (
      user.email.toLowerCase().includes(searchValue.toLowerCase()) ||
      user.name.toLowerCase().includes(searchValue.toLowerCase())
    );
  });

  const mainData = searchValue ? displayedUserData : userData;

  return (
    <div className={styles.parent__fullcontainer}>
      <div className={styles.search__container}>
        <input
          className={styles.input__search}
          value={searchValue}
          type="text"
          placeholder="filter by name or email"
          onChange={handleChange}
        />
        <MdOutlineFilterListOff className={styles.seach__icon} />
      </div>
      <table
        className={`table table-dark custom__table ${
          editform ? styles.editclss : ""
        } ${isDelete ? styles.this__style__opacity : ''}`}
      >
        <thead style={{ backgroundColor: "red !important" }}>
          <tr style={{ "--bs-table-bg": "#432818" }}>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">E-mail</th>
            <th scope="col">Phone-number</th>
            <th scope="col">Address</th>
          </tr>
        </thead>
        {mainData.map((user) => {
          return (
            <tbody key={user.id}>
              <tr style={{ "--bs-table-bg": "none" }}>
                <th scope="row">{user.id}</th>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.city}</td>
                <button
                  style={{ "--bs-table-bg": "#007bff" }}
                  className={styles.edit__btn}
                  onClick={() => editHandler(user)}
                >
                  Edit
                </button>
                <button
                  style={{ "--bs-table-bg": "#e4352f" }}
                  className={styles.delete__btn}
                  onClick={() => handleOndelete(user)}
                >
                  Delete
                </button>
              </tr>
            </tbody>
          );
        })}
      </table>

      <Link to="/userdata">
        <button className={styles.create__btn}>Create User-Data</button>
      </Link>
      {/* this form will create when we want to edit any field from the rtable */}
      {editform && currentUser && (
        <div className={styles.edit__parent__container}>
          <h3 className={styles.edit__form__heading}>Edit any field</h3>
          <form className={styles.edit__form} onSubmit={handleOnSubmit}>
            <div className={styles.input__parent__box}>
              <input
                className={styles.input__id}
                type="number"
                name="id"
                placeholder="Enter ID"
                value={currentUser.id}
                onChange={(e) => handleOnChange(e, "id")}
                readOnly
              />

              <input
                className={`${styles.input__name} ${
                  combinedState.nameerror ? styles.name__style : ""
                }`}
                type="text"
                name="name"
                placeholder="Enter Name"
                value={currentUser.name}
                onChange={(e) => handleOnChange(e, "name")}
                required
              />

              <input
                className={`${styles.input__email} ${
                  combinedState.emailerror ? styles.email__style : ""
                }`}
                type="email"
                name="email"
                placeholder="Enter email"
                value={currentUser.email}
                onChange={(e) => handleOnChange(e, "email")}
                required
              />

              <input
                // className={styles.input__phone__no}

                className={`${styles.input__phone__no} ${
                  combinedState.phoneerror ? styles.phone__style : ""
                }`}
                type="tel"
                name="phone"
                placeholder="Enter phone"
                value={currentUser.phone}
                onChange={(e) => handleOnChange(e, "phone")}
                required
              />

              <textarea
                className={styles.input__address}
                placeholder="Enter Address"
                name="city"
                value={currentUser.city}
                onChange={(e) => handleOnChange(e, "address")}
                required
              />
            </div>
            <div className={styles.btn__container}>
              <button className={styles.edit__btn} type="submit">
                save now
              </button>
            </div>
          </form>
        </div>
      )}
      {isDelete && (
        <div className={styles.confimation__container}>
          <p className={styles.confirmation__heading}>
            Are you sure to delete this User
          </p>
          <div className={styles.confirmation__button__box}>
            <button
              onClick={() => handleOnCancel()}
              className={styles.cancel__button}
            >
              cancel
            </button>
            <button
              onClick={() => handledelete()}
              className={styles.delete__button}
            >
              delete
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserTable;
