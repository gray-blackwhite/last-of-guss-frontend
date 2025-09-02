import { Route, Routes } from "react-router";
import DefaultLayout from "./layouts/default.layout";
import HomePage from "@pages/home/home.page";
import LoginPage from "@pages/login/login.page";
import GamePage from "@pages/game/game.page";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="game" element={<GamePage />} />
      </Route>
    </Routes>
  );
};

export default AppRoutes;
