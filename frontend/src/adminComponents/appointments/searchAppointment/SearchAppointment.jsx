import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getAppointmentByQuery } from "../../../../redux/actions";
import styles from "./SearchAppointment.module.css";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [errorQuery, setErrorQuery] = useState("");

  const validationSchema = Yup.object().shape({
    searchQuery: Yup.string(),
  });

  const handleSubmit = async (values, { resetForm }) => {
    setErrorQuery("");
    try {
      await dispatch(getAppointmentByQuery(values.searchQuery));
      resetForm();
    } catch (error) {
      setErrorQuery("No hay datos con ese parámetro.");
      // setTimeout(() => {
      //   resetForm();
      //   setErrorQuery("");
      // }, 4000);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ searchQuery: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {() => (
          <div className={styles.container}>
            <div className={styles.left_container}>
              <Form className={styles.form}>
                <div className={styles.label_input_button}>
                  <label htmlFor="searchQuery">
                    Buscar por: email, número de teléfono, nombre o fecha:
                  </label>
                  <Field
                    type="text"
                    id="searchQuery"
                    name="searchQuery"
                    placeholder="data"
                    className={styles.input}
                  />
                <ErrorMessage
                  name="searchQuery"
                  component="div"
                  className={styles.errors}
                />
                </div>
                <button type="submit" className={styles.button}>
                  Buscar
                </button>
                {errorQuery && <p>{errorQuery}</p>}
              </Form>
            </div>
          </div>
        )}
      </Formik>
    </>
  );
};

export default SearchBar;
