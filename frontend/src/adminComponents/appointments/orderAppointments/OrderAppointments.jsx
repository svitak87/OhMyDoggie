import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  orderByDate,
  orderByHour,
  filterByService,
  filterByColaborator,
} from "../../../../redux/actions";
import styles from "./OrderAppointments.module.css";

const OrderAppointments = () => {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.appointments);

  const [dateOrder, setDateOrder] = useState("");
  const [hourOrder, setHourOrder] = useState("");
  const [serviceFilter, setServiceFilter] = useState("");
  const [colaboratorFilter, setColaboratorFilter] = useState("");

  useEffect(() => {
    // Aquí puedes implementar lógica adicional si necesitas que algo se dispare cuando cambian las citas
  }, [appointments]);

  const handleDateOrderChange = (event) => {
    const value = event.target.value;
    setDateOrder(value);
    dispatch(orderByDate(value));
    // Limpia los otros filtros
    setHourOrder("");
    setServiceFilter("");
    setColaboratorFilter("");
  };

  const handleHourOrderChange = (event) => {
    const value = event.target.value;
    setHourOrder(value);
    dispatch(orderByHour(value));
    // Limpia los otros filtros
    setDateOrder("");
    setServiceFilter("");
    setColaboratorFilter("");
  };

  const handleServiceFilterChange = (event) => {
    const value = event.target.value;
    setServiceFilter(value);
    dispatch(filterByService(value));
    // Limpia los otros filtros
    setDateOrder("");
    setHourOrder("");
    setColaboratorFilter("");
  };

  const handleColaboratorFilterChange = (event) => {
    const value = event.target.value;
    setColaboratorFilter(value);
    dispatch(filterByColaborator(value));
    // Limpia los otros filtros
    setDateOrder("");
    setHourOrder("");
    setServiceFilter("");
  };

  return (
    <div className={styles.container}>
      <div className={styles.filter_container}>
        <label className={styles.label}>Ordenar por día</label>
        <select value={dateOrder} onChange={handleDateOrderChange}>
          <option value={dateOrder}>Selecciona una opción</option>
          <option value="ascending">Ascendente</option>
          <option value="descending">Descendente</option>
        </select>
      </div>
      <div className={styles.filter_container}>
        <label className={styles.label}>Ordenar por hora</label>
        <select value={hourOrder} onChange={handleHourOrderChange}>
          <option value={hourOrder}>Selecciona una opción</option>
          <option value="ascending">Ascendente</option>
          <option value="descending">Descendente</option>
        </select>
      </div>
      <div className={styles.filter_container}>
        <label className={styles.label}>Filtrar por servicio</label>
        <select value={serviceFilter} onChange={handleServiceFilterChange}>
          <option value={serviceFilter}>Selecciona un servicio</option>
          <option value="all">Todos</option>
          <option value="transport">Transporte</option>
          <option value="grooming">Baño y Peluquería</option>
          <option value="rideRecreation">Paseo-recreación</option>
          <option value="transport&grooming">Transp&baño</option>
          <option value="other">Otro</option>
        </select>
      </div>
      <div className={styles.filter_container}>
        <label className={styles.label}>Filtrar por colaborador</label>
        <select value={colaboratorFilter} onChange={handleColaboratorFilterChange}>
          <option value={colaboratorFilter}>Selecciona un colaborador</option>
          <option value="A">A</option>
          <option value="B">B</option>
          <option value="C">C</option>
          <option value="D">D</option>
          <option value="E">E</option>
          <option value="F">F</option>
          <option value="G">G</option>
          <option value="H">H</option>
          <option value="I">I</option>
          <option value="J">J</option>
        </select>
      </div>
    </div>
  );
};

export default OrderAppointments;
