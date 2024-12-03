import React, { useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  updateAppointment,
  getAllAppointments,
} from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import DateSelection from "../../../components/dateSelection/DateSelection";
import styles from "./UpdateAppointment.module.css";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Debe ser un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  newPhoneNumber: Yup.string(),
  newEmail: Yup.string().email("Debe ser un correo electrónico válido"),
  newDateTime: Yup.string(),
});

const UpdateAppointment = ({ email, setUpdateForm, id }) => {
  const dispatch = useDispatch();

  const handleClose = () => {
    setUpdateForm((prev) => !prev);
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleFormSubmit = async (values, { setSubmitting }) => {
    try {
      await dispatch(updateAppointment(values));
      dispatch(getAllAppointments());
      setUpdateForm(false);
    } catch (error) {
      console.error("Error al actualizar la cita:", error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik
      initialValues={{
        id: id,
        email: email,
        newPhoneNumber: "",
        newEmail: "",
        newDateTime: "",
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ setFieldValue, isSubmitting, handleSubmit }) => (
        <Form
          className={styles.container}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <div className={styles.overlay}>
            <div className={styles.container}>
              <div className={styles.labels_container}>
                <label htmlFor="email">
                  <h3>Correo electrónico:</h3>
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Correo electrónico"
                  className={styles.inputs}
                  disabled
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={styles.errors}
                />
              </div>
              <div className={styles.labels_container}>
                <label htmlFor="newEmail">
                  <h3>Nuevo correo electrónico:</h3>
                </label>
                <Field
                  type="email"
                  id="newEmail"
                  name="newEmail"
                  placeholder="nuevo correo electrónico"
                  className={styles.inputs}
                />
                <ErrorMessage
                  name="newEmail"
                  component="div"
                  className={styles.errors}
                />
              </div>

              <div className={styles.labels_container}>
                <label htmlFor="newPhoneNumber">
                  <h3> Nuevo número telefónico:</h3>
                </label>
                <Field
                  type="text"
                  id="newPhoneNumber"
                  name="newPhoneNumber"
                  placeholder="nuevo número telefónico"
                  className={styles.inputs}
                />
                <ErrorMessage
                  name="newPhoneNumber"
                  component="div"
                  className={styles.errors}
                />
              </div>

              <div className={styles.servicesDate_container}>
                <div className={styles.dateService_container}>
                  <label>
                    <h3>Fecha y hora:</h3>
                  </label>
                  <DateSelection
                    setFieldValue={setFieldValue}
                    dateFieldName="newDateTime"
                  />
                  <ErrorMessage
                    name="newDateTime"
                    id="newDateTime"
                    component="div"
                    className={styles.errors}
                  />
                </div>
              </div>
              <div className={styles.buttons_container}>
                <button
                  type="submit"
                  className={styles.button}
                  disabled={isSubmitting}
                >
                  Enviar
                </button>
                <button
                  type="submit"
                  className={styles.button}
                  onClick={handleClose}
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default UpdateAppointment;
