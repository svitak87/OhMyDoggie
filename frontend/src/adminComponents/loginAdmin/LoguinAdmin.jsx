import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginAdmin } from "../../../redux/actions";
import styles from "./LoguinAdmin.module.css";
import PopUpError from "./popupError/PopUpError";
import NavbarBath from "../../components/navbar/NavbarBath";

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
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  useEffect(() => {
    if (token) {
      navigate("/administracion-ohmydoggie");
    }
  }, [token, navigate]);

  return (
    <>
      <NavbarBath />
      <Formik
        initialValues={{
          email: "",
          password: "",
        }}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting, setFieldError }) => {
          try {
            await dispatch(loginAdmin(values));
            setShowPopUpError(false);
          } catch (error) {
            console.error("Error al enviar el formulario:", error);
            setFieldError(
              "general",
              "Credenciales inválidas o error en el servidor"
            );
            setShowPopUpError(true);
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
              <Field
                type="password"
                name="password"
                className={styles.inputs}
              />
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
    </>
  );
};

export default LoguinAdmin;
