import data from "../databases/brands.json";
import snacksData from "../databases/snacks.json"
import petsData from "../databases/dogsImage.json"
import servicesData from "../databases/services.json"

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

export const fetchPets = () => {
  return new Promise((resolve, reject) => {
    resolve(petsData);
    if(!petsData){
      reject({error: "No hay data"})
    }
  })
}

export const fetchServices = () => {
  return new Promise((resolve, reject) => {
    resolve(servicesData);
    if(!servicesData){
      reject({error: "No hay data"})
    }
  })
}
