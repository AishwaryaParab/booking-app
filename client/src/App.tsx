import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/home/Home"
import Hotels from "./pages/hotels/Hotels"
import Hotel from "./pages/hotels/Hotel"
import { SearchContextProvider } from "./context/SearchContext";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/login/Login";

function App() {

  return (
    <>
    <AuthContextProvider>
      <SearchContextProvider>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/hotels" element={<Hotels />} />
              <Route path="/hotels/:id" element={<Hotel />} />
              <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </SearchContextProvider>
    </AuthContextProvider>
    </>
  )
}

export default App
