import React, { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./DateSelection.module.css";
import { isSunday, isSaturday } from "date-fns";

const DateSelection = ({ setFieldValue }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [minTime, setMinTime] = useState(new Date());
  const [maxTime, setMaxTime] = useState(new Date());
  const [excludedTimes, setExcludedTimes] = useState([]);

 
  useEffect(() => {
    const checkAvailability = async () => {
      try {
        // Use the current date for initial availability check
        const today = new Date();
        const formattedDate = today.toISOString();

        const response = await fetch(`/verify-appointment?date=${encodeURIComponent(formattedDate)}`);
        const data = await response.json();

        if (data.occupiedTimes) {
          // Convert occupied times to Date objects
          const excluded = data.occupiedTimes.map(time => {
            const [hour, minute] = time.split(':');
            const excludedDate = new Date();
            excludedDate.setHours(parseInt(hour), parseInt(minute), 0, 0);
            return excludedDate;
          });
          
          setExcludedTimes(excluded);
        }
      } catch (error) {
        console.error("Error verificando la disponibilidad:", error);
      }
    };

    checkAvailability();
  }, []);

  // Effect to update min and max time based on the selected date
  useEffect(() => {
    if (selectedDate) {
      if (isSaturday(selectedDate)) {
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
    }
  }, [selectedDate]);

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setFieldValue("dateTime", date);
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
        timeIntervals={30}
        filterDate={filterWeekends}
        placeholderText="Selecciona una fecha y hora"
        minTime={minTime}
        maxTime={maxTime}
        minDate={today}
        excludeTimes={excludedTimes.map(time => {
          // Map excluded times to a format that DatePicker can handle
          return new Date().setHours(time.getHours(), time.getMinutes());
        })}
      />
    </div>
  );
};

export default DateSelection;

