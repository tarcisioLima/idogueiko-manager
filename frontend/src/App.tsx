import { useEffect } from "react";
import { Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router-dom";
import { CategoryProvider } from "~/context/CategoryContext";

const { Header, Content, Sider } = Layout;

function App() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate("/golpes");
  }, []);

  return (
    <CategoryProvider>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider theme="dark">
          <div
            style={{
              color: "white",
              textAlign: "center",
              padding: "16px 0",
              fontWeight: "bold",
              fontSize: 18,
            }}
          >
            🥋 Idogueiko
          </div>
          <Menu
            theme="dark"
            mode="inline"
            items={[
              {
                key: "golpes",
                label: "Golpes",
                onClick: () => navigate("/golpes"),
              },
            ]}
          />
        </Sider>

        <Layout>
          <Header style={{ background: "#fff", textAlign: "center" }}>
            <h2>Karate Kyokushin CRUD System</h2>
          </Header>

          <Content
            style={{ margin: "24px", padding: "24px", background: "#fff" }}
          >
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </CategoryProvider>
  );
}

export default App;
