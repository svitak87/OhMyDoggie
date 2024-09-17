import React, { useState, useEffect } from "react";
import { fetchServices } from "../../helpers/fetchData";
import DogServicex from "./DogServicex";
import styles from "./DogsServices.module.css";

const DogsServices = () => {
  const [services, setServices] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    const getServices = async () => {
      const result = await fetchServices();
      setServices(result);
    };
    getServices();
  }, []);
  return (
    <>
      {isVisible && (
        <div className={styles.overlay}>
          <button onClick={handleVisible} className={styles.button}>
            x
          </button>
          <div className={styles.container}>
            {services.length > 0 &&
              services.map((service, index) => (
                <DogServicex
                  key={index}
                  title={service.title}
                  description={service.description}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DogsServices;
