import React from 'react';
import styled from 'styled-components';

// Load IBM Plex Mono font from Google Fonts
// You may also add this import globally if preferred
import '@fontsource/ibm-plex-mono/400.css';

const Section = styled.section`
  position: relative;
  height: 100vh;
  overflow: hidden;
  color: white;
  font-family: 'IBM Plex Mono', monospace;
`;

const VideoBackground = styled.video`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: translate(-50%, -50%);
  z-index: 0;
`;

const OverlayTextLeft = styled.div`
  position: absolute;
  bottom: 40px;
  left: 40px;
  font-size: 1.5rem;
  max-width: 40%;
  text-transform: uppercase;
  font-weight: 600;
  letter-spacing: 1.5px;
  z-index: 10;
`;

const OverlayTextRight = styled.div`
  position: absolute;
  bottom: 40px;
  right: 40px;
  font-size: 1.2rem;
  max-width: 40%;
  font-weight: 400;
  letter-spacing: 1.2px;
  z-index: 10;
`;

const HeroSecond = () => {
  return (
    <Section>
      <VideoBackground autoPlay loop muted playsInline src="/images/---.mp4" type="video/mp4" />
      <OverlayTextLeft>A RECORD-BREAKING FORCE OF NATURE</OverlayTextLeft>
      <OverlayTextRight>
        Setting a new benchmark at 453.91 Km/h. A triumph of passion, precision, and performance.
      </OverlayTextRight>
    </Section>
  );
};

export default HeroSecond;
