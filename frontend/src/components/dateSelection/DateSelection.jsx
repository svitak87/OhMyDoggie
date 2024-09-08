import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateSelection.module.css";
import { isSunday, isSaturday, format } from "date-fns";

const DateSelection = ({ setFieldValue, dateFieldName }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [minTime, setMinTime] = useState(new Date());
  const [maxTime, setMaxTime] = useState(new Date());

  useEffect(() => {
    if (selectedDate) {
      const min = new Date();
      min.setHours(9, 0, 0);
      setMinTime(min);

      const max = isSaturday(selectedDate)
        ? new Date().setHours(15, 0, 0)
        : new Date().setHours(18, 0, 0);
      setMaxTime(max);
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    if (date) {
      const formattedDate = format(date, 'dd/MM/yyyy HH:mm');
      setFieldValue(dateFieldName, formattedDate); // Usar la prop dateFieldName para determinar el campo
    }
  };

  const isSundayDay = (date) => isSunday(date);
  const filterWeekends = (date) => !isSundayDay(date);

  const today = new Date();

  return (
    <div className={styles.datePickerWrapper}>
      <DatePicker
        className={styles.datePicker}
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="dd/MM/yyyy HH:mm"
        timeIntervals={60}
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
