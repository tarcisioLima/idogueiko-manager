import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "~/App";
import TechniquePage from "~/pages/TechniquePage";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="golpes" element={<TechniquePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
