import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${props => props.scrolled ? 'rgba(0, 0, 0, 0.95)' : 'transparent'};
  padding: 20px 0;
  transition: all 0.3s ease;
  z-index: 1000;
`;

const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const Logo = styled(Link)`
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-decoration: none;
  letter-spacing: 2px;
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 40px;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${props => props.isOpen ? '0' : '-100%'};
    width: 100%;
    height: 100vh;
    background: black;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: left 0.3s ease;
  }
`;

const NavItem = styled.li``;

const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 14px;
  letter-spacing: 1px;
  transition: color 0.3s ease;

  &:hover {
    color: ${props => props.theme.colors.secondary};
  }
`;

const MobileMenu = styled.div`
  display: none;
  color: white;
  font-size: 24px;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Nav scrolled={scrolled}>
      <NavContainer>
        <Logo to="/">BUGATTI</Logo>
        
        <NavMenu isOpen={isOpen}>
          <NavItem><NavLink to="/">Home</NavLink></NavItem>
          <NavItem><NavLink to="/models">Models</NavLink></NavItem>
          <NavItem><NavLink to="/heritage">Heritage</NavLink></NavItem>
          <NavItem><NavLink to="/contact">Contact</NavLink></NavItem>
        </NavMenu>

        <MobileMenu onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;