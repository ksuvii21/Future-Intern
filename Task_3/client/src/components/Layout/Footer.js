import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #000;
  color: white;
  padding: 50px 0 20px;
`;

const FooterContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  margin-bottom: 40px;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 20px;
    font-size: 18px;
  }

  ul {
    list-style: none;
  }

  li {
    margin-bottom: 10px;
  }

  a {
    color: #ccc;
    text-decoration: none;
    transition: color 0.3s ease;

    &:hover {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

const Copyright = styled.div`
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid #333;
  color: #ccc;
  font-size: 14px;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>BUGATTI</h3>
          <p>Beyond perfection. Beyond imagination. Beyond the possible.</p>
        </FooterSection>
        
        <FooterSection>
          <h3>Models</h3>
          <ul>
            <li><Link to="/models">Chiron Super Sport</Link></li>
            <li><Link to="/models">Divo</Link></li>
            <li><Link to="/models">Bolide</Link></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>Company</h3>
          <ul>
            <li><Link to="/heritage">Heritage</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </FooterSection>
        
        <FooterSection>
          <h3>Legal</h3>
          <ul>
            <li><a href="#privacy">Privacy Policy</a></li>
            <li><a href="#terms">Terms of Service</a></li>
            <li><a href="#cookies">Cookie Policy</a></li>
          </ul>
        </FooterSection>
      </FooterContent>
      
      <Copyright>
        &copy; {new Date().getFullYear()} Bugatti Automobiles S.A.S. All rights reserved.
      </Copyright>
    </FooterContainer>
  );
};

export default Footer;