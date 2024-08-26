import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loguinAdmin } from "../../helpers/adminFetch";
import { useNavigate } from "react-router-dom";
import styles from "./LoguinAdmin.module.css";
import PopUpError from "./popupError/PopUpError";

const validationSchema = Yup.object({
  email: Yup.string()
    .email("Debe ser un correo electrónico válido")
    .required("El correo electrónico es obligatorio"),
  password: Yup.string()
    .min(5, "La contraseña debe tener al menos 5 caracteres")
    .required("La contraseña es obligatoria"),
});

const LoguinAdmin = () => {
  const navigate = useNavigate();
  const [showPopUpError, setShowPopUpError] = useState(false);
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={validationSchema}
      onSubmit={async (values, { setSubmitting, setFieldError }) => {
        try {
          const result = await loguinAdmin(values);
          if (result.success) {
            navigate("/administracion-ohmydoggie");
          } else {
            setFieldError("general", "Credenciales incorrectas");
            setShowPopUpError((prev) => !prev);
          }
        } catch (error) {
          console.error("Error al enviar el formulario:", error);
          setFieldError("general", "Error de red o en el servidor");
        } finally {
          setSubmitting(false);
        }
      }}
    >
      {({ handleSubmit, isSubmitting, errors }) => (
        <Form onSubmit={handleSubmit} className={styles.container}>
          {showPopUpError && <PopUpError />}
          <div className={styles.email_container}>
            <label htmlFor="email">Correo Electrónico</label>
            <Field type="email" name="email" className={styles.inputs} />
            <ErrorMessage
              name="email"
              component="div"
              className={styles.errors}
            />
          </div>
          <div className={styles.password_container}>
            <label htmlFor="password">Contraseña</label>
            <Field type="password" name="password" className={styles.inputs} />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errors}
            />
          </div>
          {errors.general && (
            <div className={styles.errors}>{errors.general}</div>
          )}
          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.button}
          >
            Iniciar Sesión
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default LoguinAdmin;
