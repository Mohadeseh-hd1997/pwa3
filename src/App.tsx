import MainPage from "./Components/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BannerPg from "./Components/BannerPg";
import { ConfigProvider } from "antd";
import Register from "./pages/Register";
import InstallationPrompt from "./Components/InstallationPrompt";
function App() {
  return (
    
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ebf2f2",
          colorInfo: "#1d68d4",
          colorSuccess: "#3da30b",
          sizeStep: 4,
          colorLink: "#0752bf",
        },
      }}
    >
        <BrowserRouter>
          <Routes>
            
            <Route path="/" element={<MainPage children={<BannerPg />} />} />
            <Route
              path="/register"
              element={<MainPage children={<Register />} />}
            />
          </Routes>
        </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
