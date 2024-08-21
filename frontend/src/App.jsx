import styles from "./App.module.css";
import Navbar from "./components/navbar/Navbar";
import Intro from "./components/intro/Intro";
import Footer from "./components/footer/Footer";
import Nosotros from "./components/nosotros/Nosotros";
import Responsabilities from "./components/responsabilities/Responsabilities";
import Services from "./components/services/Services";
import BathForm from "./components/bathForm/BathForm";
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
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
