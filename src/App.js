import RegistrationForm from "./components/RegistrationForm";
import LoginForm from "./components/LoginForm";
import DashBoard from "./components/DashBoard";
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationForm />} />
          <Route path="/LoginForm" element={<LoginForm />} />
          <Route path="/DashBoard" element={<DashBoard />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
