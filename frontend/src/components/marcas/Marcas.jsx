import React, { useState, useEffect } from "react";
import styles from "./Marcas.module.css";
import { fetchBrands } from "../../helpers/fetchData";
import Marca from "./Marca";
import { IoCloseCircle } from "react-icons/io5";

const Marcas = () => {
  const [data, setData] = useState([]);
  const [isVisible, setIsVisible] = useState(true);

  const handleVisible = () => {
    setIsVisible((prev) => !prev);
  };

  useEffect(() => {
    fetchBrands().then((res) => {
      setData(res);
    });
  }, []);

  return (
    <>
      {isVisible && (
        <div className={styles.overlay}>
          <IoCloseCircle onClick={handleVisible} className={styles.button} translate="no"/>
          <div className={styles.container}>
            {data.length > 0 &&
              data.map((brand) => (
                <Marca
                  key={brand.brand}
                  title={brand.brand}
                  image={brand.image}
                />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Marcas;
