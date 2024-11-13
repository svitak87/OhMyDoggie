import React, {useState, useEffect} from 'react'
import { fetchSnacks } from '../../helpers/fetchData';
import Snack from './Snack';
import styles from "./Snacks.module.css"

const Snacks = () => {
    const [data, setData] = useState([]);
    const [isVisible, setIsVisible] = useState(true);
  
    const handleVisible = () => {
      setIsVisible((prev) => !prev);
    };
  
    useEffect(() => {
      fetchSnacks().then((res) => {
        setData(res);
      });
    }, []);
  
    return (
      <>
        {isVisible && (
          <div className={styles.overlay}>
            <h2 className={styles.title}>Snacks y accesorios</h2>
            <button onClick={handleVisible} className={styles.button} translate="no">
            X
            </button>
            <div className={styles.container}>
              {data.length > 0 &&
                data.map((snack) => (
                  <Snack 
                    key={snack.brand}
                    title={snack.brand}
                    image={snack.image}
                  />
                ))}
            </div>
          </div>
        )}
      </>
    );
}

export default Snacks
