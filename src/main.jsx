import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";
import SavedAssignment from "../src/pages/SavedAssignment.jsx";
import About from "./pages/About.jsx";
import Assignments from "./pages/Assignments.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <App /> */}
        <Route path="/" element={<App />} />
        <Route path="/about" element={<About />} />
        <Route path="/saved-assignment/:id" element={<SavedAssignment />} />
        <Route path="/assignments" element={<Assignments />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
