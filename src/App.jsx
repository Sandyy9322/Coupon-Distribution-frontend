import { Routes, Route } from "react-router-dom"
import HomePage from "./pages/HomePage"
import AdminPage from "./pages/AdminPage"
import DocumentationPage from "./pages/DocumentationPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="/documentation" element={<DocumentationPage />} />
    </Routes>
  )
}

export default App

