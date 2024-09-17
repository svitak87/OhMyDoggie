import React, { useState, useEffect } from "react";
import styles from "./Services.module.css";
import dog from "../../assets/dog_service.png";
import cat from "../../assets/cat_service.png";
import accesories from "../../assets/accesorios_service.png";
import { fetchPets } from "../../helpers/fetchData";

const Services = () => {
  const [pets, setPets] = useState([]);

  useEffect(() => {
    const getPetsImage = async () => {
      const result = await fetchPets();
      setPets(result);
    };
    getPetsImage();
  }, []);
  return (
    <>
      <div className={styles.container}>
        {pets &&
          pets.map((pet, index) => <img key={index} src={pet.image} alt="pets_photos" className={styles.images}/>)}
      </div>
    </>
  );
};

export default Services;

// const Services = () => {
//   return (
//     <div className={styles.container}>
//       <div className={styles.left_container}>
//         <ul>
//           <li>Alimento</li>
//           <li>Snacks</li>
//           <li>Estética</li>
//           <li>Higiene</li>
//         </ul>
//         <img src={dog} className={styles.dog} />
//         <h2>Perros</h2>
//       </div>
//       <div className={styles.middle_container}>
//         <img src={accesories} className={styles.accesories} />
//         <h2>Accesorios</h2>
//       </div>
//       <div className={styles.right_container}>
//         <ul>
//           <li>Alimento</li>
//           <li>Snacks</li>
//           <li>Estética</li>
//           <li>Higiene</li>
//         </ul>
//         <img src={cat} className={styles.cat} />
//         <h2>Gatos</h2>
//       </div>
//     </div>
//   );
// };

// export default Services;
