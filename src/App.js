import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import SiteFooter from "./components/SiteFooter/SiteFooter";
import SiteNav from "./components/Sitenav/SiteNav";
import { AuthProvider } from "./context/AuthContext";
import "./index.scss";
import AdminBoard from "./pages/AdminBoard/AdminBoard";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import DoctorsList from "./pages/DoctorsList/DoctorsList";
import Home from "./pages/Home/Home";
import PrivateRoute from "./utils/PrivateRoute";

function App() {
  useEffect(() => {
    document.getElementById("loader").style.opacity = "0";
  }, []);
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <SiteNav />
          <Container
            fluid
            style={{ minHeight: "calc(100vh - 20rem)" }}
            className="p-0"
          >
            <Routes>
              <Route index element={<Home />} />
              <Route path="list/:listId" element={<DoctorsList />} />

              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="hospitalAdmin"
                element={
                  <PrivateRoute>
                    <AdminBoard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </Container>
        </AuthProvider>
      </Router>
      <SiteFooter />
    </div>
  );
}

export default App;
