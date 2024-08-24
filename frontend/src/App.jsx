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
import { Route, Routes } from "react-router-dom";

function App() {
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
        <Route path="/administracion-ohmydoggie" element={<Appointments />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
