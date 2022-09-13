import React from "react";
import ".//style.sass";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./about";
import Homepage from "./Homepage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/post/:id" element={<Homepage />} />
        <Route path="/user/:id" element={<About />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;
