import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FooterContainer = styled.footer`
  background: #000;
  color: white;
  padding: 50px 0 20px;
`;

const FooterContent = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 40px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
`;

const FooterSection = styled.div`
  h3 {
    margin-bottom: 20px;
    font-size: 18px;
    color: #BE0F34;
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
      color: #BE0F34;
    }
  }
`;

const SocialLinks = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;

const SocialLink = styled.a`
  color: white;
  font-size: 1.2rem;
  transition: color 0.3s ease;

  &:hover {
    color: #BE0F34;
  }
`;

const Copyright = styled.div`
  text-align: center;
  margin-top: 50px;
  padding-top: 20px;
  border-top: 1px solid #333;
  color: #666;
`;

const Footer = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterSection>
          <h3>BUGATTI AUTOMOBILES</h3>
          <p style={{ color: '#ccc', lineHeight: '1.6' }}>
            Creating the world's most powerful, luxurious, and exclusive hyper sports cars since 1909.
          </p>
          <SocialLinks>
            <SocialLink href="#">FB</SocialLink>
            <SocialLink href="#">IG</SocialLink>
            <SocialLink href="#">YT</SocialLink>
            <SocialLink href="#">TW</SocialLink>
          </SocialLinks>
        </FooterSection>

        <FooterSection>
          <h3>MODELS</h3>
          <ul>
            <li><Link to="/models">Chiron Super Sport</Link></li>
            <li><Link to="/models">Divo</Link></li>
            <li><Link to="/models">Bolide</Link></li>
            <li><Link to="/models">Centodieci</Link></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>COMPANY</h3>
          <ul>
            <li><Link to="/heritage">Heritage</Link></li>
            <li><Link to="/contact">Contact</Link></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </FooterSection>

        <FooterSection>
          <h3>LEGAL</h3>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
            <li><a href="#">Legal Notice</a></li>
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