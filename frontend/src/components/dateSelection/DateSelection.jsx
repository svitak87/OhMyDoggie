import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateSelection.module.css";
import { isSunday, isSaturday } from "date-fns";

const DateSelection = ({ setFieldValue }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [minTime, setMinTime] = useState(new Date());
  const [maxTime, setMaxTime] = useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFieldValue("dateTime", date);
  };

  const isSundayDay = (date) => {
    return isSunday(date);
  };

  const filterWeekends = (date) => {
    return !isSundayDay(date); 
  };

  useEffect(() => {
    if (selectedDate && isSaturday(selectedDate)) {
      const min = new Date();
      min.setHours(9, 0, 0); 
      setMinTime(min);

      const max = new Date();
      max.setHours(13, 0, 0); 
      setMaxTime(max);
    } else {
      const min = new Date();
      min.setHours(9, 0, 0); 
      setMinTime(min);

      const max = new Date();
      max.setHours(18, 0, 0); 
      setMaxTime(max);
    }
  }, [selectedDate]); 

  const today = new Date()

  return (
    <div className={styles.datePickerWrapper}>
      <DatePicker
        className={styles.datePicker}
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm" 
        dateFormat="dd/MM/yyyy HH:mm" 
        timeIntervals={30}
        filterDate={filterWeekends}
        placeholderText="Selecciona una fecha y hora"
        minTime={minTime}
        maxTime={maxTime}
        minDate={today}
      />
    </div>
  );
};

export default DateSelection;

