import { Outlet } from "react-router-dom";
import Navbar from "./components/navbar";

const App = () => {
  return (
    <div className="z-[-2] h-screen w-full bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default App;
