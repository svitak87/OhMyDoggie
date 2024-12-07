import React, { useState, useEffect } from "react";
import { fetchServices } from "../../helpers/fetchData";
import DogServicex from "./DogServicex";
import styles from "./DogsServices.module.css";
import { FaSprayCanSparkles } from "react-icons/fa6"; 
import { FaTruck } from "react-icons/fa";; 
import { FaDog } from "react-icons/fa"; 
import { FaPlus } from "react-icons/fa"; 
import { IoCloseCircle } from "react-icons/io5";



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
          <IoCloseCircle onClick={handleVisible} className={styles.button} translate="no"/>
          <div className={styles.container}>
            {services.length > 0 &&
              services.map((service, index) => (
                <DogServicex
                  key={index}
                  title={service.title}
                  description={service.description}
                  spaIcon={<FaSprayCanSparkles />}
                  doggieMovilIcon={<FaTruck />}
                  recreationIcon={<FaDog />}
                  othersIcon={<FaPlus />}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default DogsServices;
