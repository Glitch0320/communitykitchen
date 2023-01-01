import Container from "react-bootstrap/Container"
import Nav from "react-bootstrap/Nav"
import Navbar from "react-bootstrap/Navbar"
import { useAppContext } from "../utils/AppContext"

const Navigation = (props) => {

  const { logout, appState } = useAppContext()

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Community Kitchen</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/kitchen">Home</Nav.Link>
            <Nav.Link href={`/user/${appState.user._id}`}>Profile</Nav.Link>
            <Nav.Link onClick={logout}>Logout</Nav.Link>
            <Nav.Link href='https://drive.google.com/file/d/1_cXoUtWVwF-8Ulngyth80VRpXTKmTviI/view'>Help</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}

export default Navigation