import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home";
import ProtectedRoute from "./auth/ProtectedRoute";

document.body.style = "background: #F0F8FF;";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {["/", "/home"].map((path, index) => (
          <Route
            path={path}
            key={index}
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            }
          />
        ))}
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
