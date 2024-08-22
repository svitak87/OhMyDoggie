import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateSelection.module.css";

const DateSelection = ({ setFieldValue }) => {
  const [selectedDate, setSelectedDate] = useState(null);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFieldValue("dateTime", date);
  };

  return (
    <div className={styles.datePickerWrapper}>
      <DatePicker
        className={styles.datePicker}
        selected={selectedDate}
        onChange={handleDateChange}
        showTimeSelect
        timeFormat="HH:mm"
        dateFormat="dd/MM/yyyy hh:mm"
        timeIntervals={60}
        placeholderText="Selecciona una fecha y hora"
      />
    </div>
  );
};

export default DateSelection;
