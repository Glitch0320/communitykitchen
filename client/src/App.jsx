import { BrowserRouter, Routes, Route } from "react-router-dom"
import Container from "react-bootstrap/Container"
import Landing from './pages/Landing'
import Home from "./pages/Home"
import User from "./pages/User"
import PageNotFound from "./pages/404"
import Navigation from "./components/Navigation"
import { AppProvider } from './utils/AppContext'
import Cookie from 'js-cookie'

import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  
  return (
    <AppProvider>
      {Cookie.get('auth-token') && <Navigation />}
      <Container>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Landing />} />
            <Route path="/kitchen" element={<Home />} />
            <Route path="/user/:id" element={<User />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </AppProvider>
  )
}

export default App
