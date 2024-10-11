import React, { lazy, Suspense } from "react";
import styles from "./App.module.css";
import Footer from "./components/footer/Footer"; 
import { Routes, Route, Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

// Componentes cargados diferidamente (lazy) para la ruta "/"
const Navbar = lazy(() => import("./components/navbar/Navbar"));
const Intro = lazy(() => import("./components/intro/Intro"));
const Nosotros = lazy(() => import("./components/nosotros/Nosotros"));
const Responsabilities = lazy(() => import("./components/responsabilities/Responsabilities"));
const Animals = lazy(() => import("./components/animals/Animals"))


// Puedes hacer lazy también para estas rutas si quieres diferir su carga
const BathForm = lazy(() => import("./components/bathForm/BathForm"));
const LoguinAdmin = lazy(() => import("./adminComponents/loginAdmin/LoguinAdmin"));
const Appointments = lazy(() => import("./adminComponents/appointments/Appointments"));

function App() {
  const token = useSelector((state) => state.token);
  const location = useLocation();

  return (
    <div className={styles.app}>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <Navbar />
              <Intro />
              <Nosotros />
              <Responsabilities />
              <Animals />
            </Suspense>
          }
        />

        {/* Rutas que se cargan solo cuando se navega a ellas */}
        <Route
          path="/reserva"
          element={
            <Suspense fallback={<div>Loading form...</div>}>
              <BathForm />
            </Suspense>
          }
        />

        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading login...</div>}>
              <LoguinAdmin />
            </Suspense>
          }
        />

        <Route
          path="/administracion-ohmydoggie"
          element={
            <Suspense fallback={<div>Loading admin...</div>}>
              {token ? <Appointments /> : <Navigate to="/login" />}
            </Suspense>
          }
        />
      </Routes>

      {/* Renderizar Footer en todas las rutas excepto en /administracion-ohmydoggie */}
      {location.pathname !== "/administracion-ohmydoggie" && <Footer />}
    </div>
  );
}

export default App;



























// import React, { Lazy } from "react";
// import styles from "./App.module.css";
// import Navbar from "./components/navbar/Navbar";
// import Intro from "./components/intro/Intro";
// import Footer from "./components/footer/Footer";
// import Nosotros from "./components/nosotros/Nosotros";
// import Responsabilities from "./components/responsabilities/Responsabilities";
// import Services from "./components/services/Services";
// import BathForm from "./components/bathForm/BathForm";
// import LoguinAdmin from "./adminComponents/loginAdmin/LoguinAdmin";
// import Appointments from "./adminComponents/appointments/Appointments";
// import { Routes, Route, Navigate } from "react-router-dom";
// import { useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";

// function App() {
//   const token = useSelector((state) => state.token);
//   const location = useLocation();

//   return (
//     <div className={styles.app}>
//       <Routes>
//         <Route
//           path="/"
//           element={
//             <>
//               <Navbar />
//               <Intro />
//               <Nosotros />
//               <Responsabilities />
//               <Services />
//             </>
//           }
//         />
//         <Route path="/reserva" element={<BathForm />} />
//         <Route path="/login" element={<LoguinAdmin />} />
//         <Route
//           path="/administracion-ohmydoggie"
//           element={token ? <Appointments /> : <Navigate to="/login" />}
//         />
//       </Routes>

//       {/* Renderizar Footer en todas las rutas excepto en /administracion-ohmydoggie */}
//       {location.pathname !== "/administracion-ohmydoggie" && <Footer />}
//     </div>
//   );
// }

// export default App;
