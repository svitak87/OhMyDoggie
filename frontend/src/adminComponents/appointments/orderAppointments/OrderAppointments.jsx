import React from "react";
import {
  orderByDate,
  orderByHour,
  filterByService,
} from "../../../../redux/actions";
import { useDispatch } from "react-redux";
import styles from "./OrderAppointments.module.css"

const OrderAppointments = () => {
  const dispatch = useDispatch();

  const orderDate = (event) => {
    dispatch(orderByDate(event.target.value));
  };

  const orderHour = (event) => {
    dispatch(orderByHour(event.target.value));
  };

  const filterService = (event) => {
    dispatch(filterByService(event.target.value));
  };

  return (
    <div className={styles.container}>
      <div className={styles.filter_container}>
        <label className={styles.label}>Ordenar por día</label>
        <select onChange={orderDate}>
          <option value=""></option>
          <option value="ascending">Ascendente</option>
          <option value="descending">Descendente</option>
        </select>
      </div>
      <div className={styles.filter_container}>
        <label className={styles.label}>Ordenar por hora</label>
        <select onChange={orderHour}>
          <option value=""></option>
          <option value="ascending">Ascendente</option>
          <option value="descending">Descendente</option>
        </select>
      </div>
      <div className={styles.filter_container}>
        <label className={styles.label}>Filtrar por servicio</label>
        <select onChange={filterService}>
          <option value=""></option>
          <option value="all">Todos</option>
          <option value="transport">Transporte</option>
          <option value="grooming">Baño y Peluquería</option>
          <option value="rideRecreation">Paseo-recreación</option>
          <option value="transport&grooming">Transp&baño</option>
          <option value="other">Otro</option>
        </select>
      </div>
    </div>
  );
};

export default OrderAppointments;
