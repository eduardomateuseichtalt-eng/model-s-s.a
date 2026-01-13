import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Modelos from "./pages/Modelos";
import ModelProfile from "./pages/ModelProfile";
import ModelRegister from "./pages/ModelRegister";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Faq from "./pages/Faq";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Shots from "./pages/Shots";
import NotFound from "./pages/NotFound";
import AdminApprovals from "./pages/AdminApprovals";
import PrivateRoute from "./components/PrivateRoute";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/modelos" element={<Modelos />} />
        <Route path="/modelos/:id" element={<ModelProfile />} />
        <Route path="/seja-modelo" element={<ModelRegister />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Register />} />
        <Route path="/sobre" element={<About />} />
        <Route path="/contato" element={<Contact />} />
        <Route path="/anuncie" element={<Pricing />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/shots" element={<Shots />} />
        <Route
          path="/admin/aprovacoes"
          element={
            <PrivateRoute>
              <AdminApprovals />
            </PrivateRoute>
          }
        />
        <Route path="/termos" element={<Terms />} />
        <Route path="/privacidade" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
