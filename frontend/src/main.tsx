import React from "react";
import ReactDOM from "react-dom/client";
import AppRoutes from "~/routes/AppRoutes";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";
import ptBR from "antd/es/locale/pt_BR";
import "dayjs/locale/pt-br";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider locale={ptBR}>
      <AppRoutes />
    </ConfigProvider>
  </React.StrictMode>
);
