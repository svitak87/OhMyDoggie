import styles from "./App.module.css";
import Navbar from "./components/navbar/Navbar";
import Intro from "./components/intro/Intro";
import Footer from "./components/footer/Footer";
import Nosotros from "./components/nosotros/Nosotros";
import Responsabilities from "./components/responsabilities/Responsabilities";
import Services from "./components/services/Services";
import BathForm from "./components/bathForm/BathForm";
import LoguinAdmin from "./adminComponents/loginAdmin/LoguinAdmin";
import Appointments from "./adminComponents/appointments/Appointments";
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

function App() {
  const token = useSelector((state) => state.token);
  const location = useLocation(); 

  return (
    <div className={styles.app}>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Intro />
              <Nosotros />
              <Responsabilities />
              <Services />
            </>
          }
        />
        <Route path="/reserva" element={<BathForm />} />
        <Route path="/login" element={<LoguinAdmin />} />
        <Route
          path="/administracion-ohmydoggie"
          element={token ? <Appointments /> : <Navigate to="/login" />}
        />
      </Routes>

      {/* Renderizar Footer en todas las rutas excepto en /administracion-ohmydoggie */}
      {location.pathname !== "/administracion-ohmydoggie" && <Footer />}
    </div>
  );
}

export default App;

