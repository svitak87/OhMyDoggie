const { Admin } = require("../database");
const bcrypt = require("bcrypt");

//crear administrador
const addAdmin = async (adminData) => {
  try {
    const { name, email, password } = adminData;
    if (adminData) {
      const hashedPassword = await bcrypt.hash(password, 10);
      const newAdmin = await Admin.create({
        name,
        email,
        password: hashedPassword,
      });
      if (newAdmin) {
        return newAdmin;
      }
    }
  } catch (error) {
    throw new Error("No se pudo crear el administrador");
  }
};

//logueo de administrador
const loginAdmin = async (credentialData) => {
  const { email, password } = credentialData;
  try {
    if (email && password) {
      const userFound = await Admin.findOne({ where: { email: email } });
      if (userFound) {
        const passwordMatch = await bcrypt.compare(
          password,
          userFound.password
        );
        if (passwordMatch) {
          return userFound;
        } else {
          throw new Error("Password doesn't match");
        }
      } else {
        throw new Error("Admin doesn't exists");
      }
    } else {
      throw new Error("Email and password are required");
    }
  } catch (error) {
    throw error;
  }
};

//buscar admin por ID;
const getAdminById = async (id) => {
  try {
    const admin = await Admin.findOne({ where: { id: id } });
    if (!admin) {
      throw new Error('Admin not found');
    } else {
      return user;
    }
  } catch (error) {
    throw error;
  }
};

module.exports = { addAdmin, loginAdmin, getAdminById };
