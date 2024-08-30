import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { getAppointmentByQuery } from "../../../../redux/actions";

const SearchBar = () => {
  const dispatch = useDispatch();
  const [errorQuery, setErrorQuery] = useState("");

  const validationSchema = Yup.object().shape({
    searchQuery: Yup.string().required("Please enter a search term."),
  });

  // Manejo del envío del formulario
  const handleSubmit = async (values, { resetForm }) => {
    setErrorQuery("");
    try {
      // Espera que la acción se complete
      await dispatch(getAppointmentByQuery(values.searchQuery));
      resetForm();
    } catch (error) {
      setErrorQuery("No se pudo completar la búsqueda.");
      setTimeout(() => {
        resetForm();
        setErrorQuery("");
      }, 4000);
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
          <Form>
            <div>
              <label htmlFor="searchQuery">
                Buscar por: email, número de teléfono o nombre
              </label>
              <Field
                type="text"
                id="searchQuery"
                name="searchQuery"
                placeholder="Enter search term"
              />
              <ErrorMessage
                name="searchQuery"
                component="div"
                className="error-message"
              />
            </div>
            <button type="submit">Search</button>
            {errorQuery && <p>{errorQuery}</p>}
          </Form>
        )}
      </Formik>
    </>
  );
};

export default SearchBar;
