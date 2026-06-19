import { BrowserRouter,Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./pages/Navbar";
import Login  from "./pages/Login";
import Search from "./pages/Search";
import Trips from "./pages/Trips";
import Bookings from "./pages/Bookings";
import Landing from "./pages/Landing";
import ProdectedRoute from "./components/ProtectedRoute";
import Register from "./pages/Registation";
import History from "./pages/History";
import { use } from "react";


function App() {
  const location  = useLocation();
  const hideNavbarPaths = ["/", "/login", "/register"];
  return (
    <>
    {!hideNavbarPaths.includes(location.pathname) && <Navbar />}
    <Routes>
      <Route path="/" element= {<Landing/>}/>
      <Route path="/login" element= {<Login/>}/>
      <Route path="/register" element= {<Register/>}/>
      <Route path="/search" element= {<Search/>}/>
      <Route path="/trips" element= {<Trips/>}/>
      <Route path="/bookings" element= {
        <ProdectedRoute><Bookings/></ProdectedRoute>
        }/>
          <Route
         path="/history"
        element={
        <ProdectedRoute>
          <History />
       </ProdectedRoute>
        }
        />
    </Routes>
    </>
  );
}

export default App;