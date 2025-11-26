import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars } from 'react-icons/fa';
import { FiShoppingCart } from 'react-icons/fi';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.85);
  backdrop-filter: blur(10px);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
  padding: 15px 20px;
  z-index: 1000;
  font-family: 'Roboto Condensed', sans-serif;
  text-transform: uppercase;
`;

const NavContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  /* Use space-around to shift logo slightly right for visual center */
  justify-content: space-around;
`;

const MenuButton = styled.div`
  color: white;
  font-size: 28px;
  cursor: pointer;
  user-select: none;
  display: flex;
  align-items: center;
  position: relative;
  gap: 10px;
  font-weight: 700;
  font-size: 16px;
  text-transform: uppercase;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: 40px;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(10px);
  box-shadow: 0 8px 30px rgba(0,0,0,0.7);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
  gap: 15px;
  z-index: 1500;
  min-width: 180px;
`;

const MenuLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-weight: 700;
  transition: color 0.3s ease;

  &:hover {
    color: #BE0F34;
  }
`;

const Logo = styled(Link)`
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 32px;
  font-weight: 700;
  color: white;
  text-decoration: none;
  letter-spacing: 8px;
  user-select: none;
  flex: 1;
  text-align: center;
`;

const StoreLink = styled(Link)`
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: 700;
  font-size: 18px;
  color: white;
  text-decoration: none;
  cursor: pointer;
  padding: 6px 12px;
  border: 2px solid white;
  border-radius: 3px;
  user-select: none;
  transition: background 0.3s ease, color 0.3s ease;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  gap: 6px;

  &:hover {
    background: #BE0F34;
    border-color: #BE0F34;
    color: black;
  }
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <Nav>
      <NavContainer>
        <MenuButton onClick={() => setMenuOpen(!menuOpen)}>
          <FaBars />
          MENU
          {menuOpen && (
            <DropdownMenu>
              <MenuLink to="/about">About</MenuLink>
              <MenuLink to="/models">Models</MenuLink>
              <MenuLink to="/heritage">Heritage</MenuLink>
              <MenuLink to="/contact">Contact</MenuLink>
            </DropdownMenu>
          )}
        </MenuButton>
        <Logo to="/">BUGGATI</Logo>
        <StoreLink to="../../pages/Store">
          <FiShoppingCart />
          STORE
        </StoreLink>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
