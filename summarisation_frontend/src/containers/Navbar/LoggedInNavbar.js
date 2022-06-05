import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink 
} from "./NavbarElements";

const LoggedInNavbar = () => {
    const handleLogout = () => {
        localStorage.removeItem('auth');
    }

    return <Nav>
    <Bars />

    <NavMenu style={{background: "#fee36e"}}>
    <NavLink to='/' activeStyle >
        Home
      </NavLink>
      <NavLink to='/about' activeStyle >
        About
      </NavLink>
    </NavMenu>
    <NavBtn style={{background: "#fee36e"}}>
      <NavBtnLink to='' onClick={handleLogout}>Logout</NavBtnLink>
    </NavBtn>
  </Nav>
}

export default LoggedInNavbar;