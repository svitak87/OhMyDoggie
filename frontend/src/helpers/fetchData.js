import data from "../databases/brands.json";

export const fetchBrands = () => {
  return new Promise((resolve, reject) => {
    resolve(data);
    if (!data) {
      reject({ error: "No hay data" });
    }
  });
};

export default fetchBrands ;
