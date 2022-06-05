import React from "react";
import { 
    Nav,
    NavLink,
    Bars,
    NavMenu,
    NavBtn,
    NavBtnLink 
} from "./NavbarElements";

const Navbar = () => {
    return (
      <>
        <Nav>
          <Bars />

          <NavMenu style={{background: "#fee36e"}}>
          <NavLink to='/' activeStyle >
              Home
            </NavLink>
            <NavLink to='/about' activeStyle >
              About
            </NavLink>
            <NavLink to='/sign-up' activeStyle >
              Sign Up
            </NavLink>
          </NavMenu>
          <NavBtn style={{background: "#fee36e"}}>
            <NavBtnLink to='/sign-in'>Sign In</NavBtnLink>
          </NavBtn>
        </Nav>
      </>
    );
  };
    
export default Navbar;