import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './FormData.module.css';
import DateSelection from '../dateSelection/DateSelection';
import PopUp from './popUp/PopUp';

const validationSchema = Yup.object({
  fullName: Yup.string()
    .matches(/^[a-zA-Z\s]+$/, 'El nombre completo solo puede contener letras y espacios')
    .required('El nombre es obligatorio'),
  email: Yup.string()
    .email('Debe ser un correo electrónico válido')
    .required('El correo electrónico es obligatorio'),
  phoneNumber: Yup.string()
    .matches(/^[0-9]*$/, 'El número de teléfono solo puede contener dígitos')
    .required('El número de teléfono es obligatorio'),
  services: Yup.object({
    transport: Yup.boolean(),
    grooming: Yup.boolean()
  }).required('Debes seleccionar al menos un servicio'),
  petName: Yup.string()
    .required('El nombre de la mascota es obligatorio'),
  message: Yup.string(),
  dateTime: Yup.date()
    .required('La fecha y hora son obligatorias')
});

const FormData = () => {
  const [showPopUp, setShowPopUp] = useState(false)
  return (
    <Formik
      initialValues={{
        fullName: '',
        email: '',
        phoneNumber: '',
        services: {
          transport: false,
          grooming: false,
        },
        petName: '',
        message: '',
        dateTime: null, 
      }}
      validationSchema={validationSchema}
      onSubmit={(values) => {
        console.log('Formulario enviado:', values);
        setShowPopUp((prev) => !prev);
      }}
    >
      {({ setFieldValue }) => (
        <Form className={styles.container}>
          {showPopUp && (<PopUp />)}
          <div className={styles.labels_container}>
            <label htmlFor="fullName"><h3>Nombre:</h3></label>
            <Field
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Nombre completo"
              className={styles.inputs}
            />
            <ErrorMessage name="fullName" component="div" className={styles.errors}/>
          </div>

          <div className={styles.labels_container}>
            <label htmlFor="email"><h3>Correo electrónico:</h3></label>
            <Field
              type="email"
              id="email"
              name="email"
              placeholder="Correo electrónico"
              className={styles.inputs}
            />
            <ErrorMessage name="email" component="div" className={styles.errors}/>
          </div>

          <div className={styles.labels_container}>
            <label htmlFor="phoneNumber"><h3>Número telefónico:</h3></label>
            <Field
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Número telefónico"
              className={styles.inputs}
            />
            <ErrorMessage name="phoneNumber" component="div" className={styles.errors}/>
          </div>

          <div className={styles.servicesDate_container}>
            <div className={styles.dateService_container}>
              <label><h3>Fecha y hora:</h3></label>
              <DateSelection setFieldValue={setFieldValue} /> 
              <ErrorMessage name="dateTime" component="div" className={styles.errors}/>
            </div>
            <div className={styles.services_container}>
              <label><h3>Servicios:</h3></label>
              <div>
                <Field type="checkbox" id="transport" name="services.transport" />
                <label htmlFor="transport">Transporte</label>
              </div>
              <div>
                <Field type="checkbox" id="grooming" name="services.grooming" />
                <label htmlFor="grooming">Baño y peluquería</label>
                <ErrorMessage name="services" component="div" className={styles.errors}/>
              </div>
            </div>
          </div>

          <div className={styles.labels_container}>
            <label htmlFor="petName"><h3>Nombre de tu mascota:</h3></label>
            <Field
              type="text"
              id="petName"
              name="petName"
              placeholder="Nombre de la mascota"
              className={styles.inputs}
            />
            <ErrorMessage name="petName" component="div" className={styles.errors}/>
          </div>

          <div className={styles.labels_container}>
            <label htmlFor="message"><h3>Mensaje:</h3> <i className={styles.info}>*Info adicional que nos quieras dejar</i></label>
            <Field
              as="textarea"
              id="message"
              name="message"
              placeholder="Escriba su mensaje aquí"
              className={styles.textArea}
            />
            <ErrorMessage name="message" component="div" className={styles.errors}/>
          </div>

          <button type="submit" className={styles.button}>Enviar</button>
        </Form>
      )}
    </Formik>
  );
};

export default FormData;
