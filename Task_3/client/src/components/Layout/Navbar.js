import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { FaBars, FaTimes } from 'react-icons/fa';

// Glassmorphism background with shadow on scroll
const Nav = styled.nav`
  position: fixed;
  top: 0;
  width: 100%;
  background: ${props =>
    props.$scrolled || props.$isSpecialPage
      ? 'rgba(0, 0, 0, 0.85)'
      : 'transparent'};
  backdrop-filter: ${props => (props.$scrolled || props.$isSpecialPage ? 'blur(10px)' : 'none')};
  box-shadow: ${props =>
    props.$scrolled || props.$isSpecialPage
      ? '0 4px 30px rgba(0, 0, 0, 0.5)'
      : 'none'};
  padding: 20px 0;
  transition: all 0.4s ease;
  z-index: 1000;
`;

// Container keeps nav items centered with max width
const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

// Gradient animation for Logo text color
const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

// Stylish Logo with gradient and letter-spacing
const Logo = styled(Link)`
  font-family: 'Helvetica Neue', Arial, sans-serif;
  background: linear-gradient(270deg, #BE0F34, #FFFFFF, #BE0F34);
  background-size: 600% 600%;
  animation: ${gradientAnimation} 6s ease infinite;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;

  font-size: 30px;
  font-weight: 900;
  letter-spacing: 6px;
  text-decoration: none;
  user-select: none;
  transition: filter 0.3s ease;

  &:hover {
    filter: brightness(1.2);
  }
`;

const NavMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 48px;
  align-items: center;

  @media (max-width: 768px) {
    position: fixed;
    top: 0;
    left: ${props => (props.$isOpen ? '0' : '-100%')};
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.95);
    flex-direction: column;
    justify-content: center;
    align-items: center;
    transition: left 0.4s ease;

    gap: 32px;
    font-size: 18px;
  }
`;

// NavItem styling remains the same
const NavItem = styled.li``;

// Animated underline on hover using Bugatti red
const NavLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 16px;
  letter-spacing: 2px;
  padding: 4px 0;
  position: relative;
  transition: color 0.3s ease;

  &:hover {
    color: #BE0F34;
  }

  &:after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0%;
    height: 2px;
    background-color: #BE0F34;
    transition: width 0.3s ease;
  }

  &:hover:after {
    width: 100%;
  }
`;

const MobileMenu = styled.div`
  display: none;
  color: white;
  font-size: 28px;
  cursor: pointer;
  user-select: none;

  @media (max-width: 768px) {
    display: block;
  }
`;

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isSpecialPage = location.pathname.startsWith('/models') || location.pathname.startsWith('/heritage') || location.pathname.startsWith('/contact');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <Nav $scrolled={scrolled} $isSpecialPage={isSpecialPage}>
      <NavContainer>
        <Logo to="/">BUGATTI</Logo>

        <NavMenu $isOpen={isOpen}>
          <NavItem>
            <NavLink to="/">Home</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/models">Models</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/heritage">Heritage</NavLink>
          </NavItem>
          <NavItem>
            <NavLink to="/contact">Contact</NavLink>
          </NavItem>
        </NavMenu>

        <MobileMenu onClick={() => setIsOpen(!isOpen)}>{isOpen ? <FaTimes /> : <FaBars />}</MobileMenu>
      </NavContainer>
    </Nav>
  );
};

export default Navbar;
