import data from "../databases/brands.json";
import snacksData from "../databases/snacks.json"

export const fetchBrands = () => {
  return new Promise((resolve, reject) => {
    resolve(data);
    if (!data) {
      reject({ error: "No hay data" });
    }
  });
};

export default fetchBrands ;

export const fetchSnacks = () => {
  return new Promise((resolve, reject) => {
    resolve(snacksData);
    if(!dataSnacks){
      reject({error: "No hay data"})
    }
  })
}
