import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { isSunday, isSaturday, format } from "date-fns";

const DateSelection = ({ setFieldValue, dateFieldName }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);  
  const [minTime, setMinTime] = useState(null);
  const [maxTime, setMaxTime] = useState(null);

  useEffect(() => {
    if (selectedDate) {
      const min = new Date(selectedDate);
      min.setHours(9, 0, 0);  // Hora mínima a las 9:00 AM
      setMinTime(min);

      const max = isSaturday(selectedDate)
        ? new Date(selectedDate).setHours(15, 0, 0)  // Sábados hasta las 3:00 PM
        : new Date(selectedDate).setHours(17, 0, 0);  // Otros días hasta las 5:00 PM
      setMaxTime(max);
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);  
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
    if (time) {
      const formattedDate = format(new Date(selectedDate.setHours(time.getHours(), time.getMinutes())), 'dd/MM/yyyy HH:mm');
      setFieldValue(dateFieldName, formattedDate);  // Solo asigna si se ha seleccionado una hora
    } else {
      setFieldValue(dateFieldName, "");  // Resetea el valor si no hay hora seleccionada
    }
  };

  const filterWeekends = (date) => !isSunday(date);

  const today = new Date();

  return (
    <div>
      <DatePicker
        // className={styles.datePicker}
        selected={selectedDate}
        onChange={handleDateChange}
        placeholderText="Selecciona una fecha"
        filterDate={filterWeekends}
        minDate={today}
        showTimeSelect={false}  // Solo permite la selección de la fecha aquí
        dateFormat="dd/MM/yyyy"
      />
      
      {selectedDate && (
        <DatePicker
          // className={styles.timePicker}
          selected={selectedTime}
          onChange={handleTimeChange}
          showTimeSelect
          showTimeSelectOnly
          timeIntervals={60}
          timeFormat="HH:mm"
          dateFormat="HH:mm"
          placeholderText="Selecciona una hora"
          minTime={minTime}
          maxTime={maxTime}
        />
      )}
    </div>
  );
};

export default DateSelection;
