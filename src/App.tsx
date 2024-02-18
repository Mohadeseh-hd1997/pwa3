import MainPage from "./Components/MainPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import BannerPg from "./Components/BannerPg";
import { ConfigProvider } from "antd";
import { error } from "console";

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1d68d4",
          colorInfo: "#1d68d4",
          colorSuccess: "#3da30b",
          sizeStep: 4,
          colorLink: "#0752bf",
        },
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={<MainPage children={<BannerPg />} />}
          ></Route>
        </Routes>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
