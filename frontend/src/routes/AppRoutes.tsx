import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "~/App";

import TechniquePage from "~/pages/TechniquePage";
import CategoryPage from "~/pages/CategoryPage";
import SequencePage from "~/pages/SequencePage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="golpes" element={<TechniquePage />} />
          <Route path="categorias" element={<CategoryPage />} />
          <Route path="sequencias" element={<SequencePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
