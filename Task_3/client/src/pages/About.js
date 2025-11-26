import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaCheck, FaGlobeAmericas, FaTrophy, FaUsers, FaBuilding } from 'react-icons/fa';

const AboutContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(to bottom, #000000, #0a0a0a);
  color: white;
`;

const HeroSection = styled.section`
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  background: linear-gradient(135deg, rgba(0,0,0,0.8), rgba(190, 15, 52, 0.1));
  padding: 100px 20px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(190, 15, 52, 0.05) 0%, transparent 100%);
    pointer-events: none;
  }
`;

const HeroContent = styled(motion.div)`
  max-width: 800px;
  position: relative;
  z-index: 1;
`;

const HeroTitle = styled.h1`
  font-size: 5rem;
  margin-bottom: 20px;
  letter-spacing: 3px;
  font-weight: 900;
  background: linear-gradient(135deg, #ffffff, #BE0F34);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 2.5rem;
  }
`;

const HeroSubtitle = styled.p`
  font-size: 1.5rem;
  color: #d1d5db;
  margin-bottom: 30px;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
  position: relative;
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 50px;
  color: white;
  font-weight: 900;
  letter-spacing: 2px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || 'repeat(auto-fit, minmax(300px, 1fr))'};
  gap: 40px;
  margin-bottom: 60px;
`;

const Card = styled(motion.div)`
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 1px solid #374151;
  border-radius: 15px;
  padding: 40px;
  text-align: center;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(190, 15, 52, 0.5);
    box-shadow: 0 0 30px rgba(190, 15, 52, 0.2);
    transform: translateY(-10px);
  }

  svg {
    font-size: 3rem;
    color: #BE0F34;
    margin-bottom: 20px;
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: white;
  font-weight: 700;
`;

const CardText = styled.p`
  color: #d1d5db;
  line-height: 1.8;
  font-size: 1rem;
`;

const TextBlock = styled.div`
  font-size: 1.1rem;
  color: #d1d5db;
  line-height: 2;
  margin-bottom: 40px;

  strong {
    color: #BE0F34;
    font-weight: 700;
  }
`;

const TimelineContainer = styled.div`
  position: relative;
  padding: 40px 0;

  &::before {
    content: '';
    position: absolute;
    left: 50%;
    top: 0;
    bottom: 0;
    width: 2px;
    background: linear-gradient(to bottom, #BE0F34, transparent);

    @media (max-width: 768px) {
      left: 30px;
    }
  }
`;

const TimelineItem = styled(motion.div)`
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;

  ${props => props.$alternate && `
    > div:first-child {
      order: 2;
    }
    > div:last-child {
      order: 1;
    }
  `}

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 20px;
    ${props => props.$alternate && `
      > div:first-child {
        order: 1;
      }
      > div:last-child {
        order: 2;
      }
    `}
  }
`;

const TimelineMarker = styled.div`
  display: flex;
  justify-content: center;
`;

const TimelineCircle = styled.div`
  width: 30px;
  height: 30px;
  background: #BE0F34;
  border-radius: 50%;
  border: 3px solid #0a0a0a;
  position: relative;
  z-index: 2;
`;

const TimelineContent = styled.div`
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 1px solid #374151;
  border-radius: 10px;
  padding: 30px;
  border-left: 4px solid #BE0F34;

  h4 {
    font-size: 1.3rem;
    color: #BE0F34;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    color: #d1d5db;
    line-height: 1.6;
  }
`;

const HighlightsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
  margin-bottom: 60px;
`;

const HighlightBox = styled(motion.div)`
  background: linear-gradient(135deg, rgba(190, 15, 52, 0.1), rgba(0, 0, 0, 0.3));
  border: 1px solid #BE0F34;
  border-radius: 10px;
  padding: 30px;
  text-align: center;

  h4 {
    font-size: 1.8rem;
    color: #BE0F34;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    color: #d1d5db;
    font-size: 0.95rem;
  }
`;

const ValuesList = styled.ul`
  list-style: none;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-bottom: 60px;
`;

const ValueItem = styled(motion.li)`
  display: flex;
  align-items: flex-start;
  gap: 15px;

  svg {
    color: #BE0F34;
    margin-top: 5px;
    flex-shrink: 0;
  }

  div {
    p {
      color: #d1d5db;
      line-height: 1.6;
      margin: 5px 0;
    }

    strong {
      color: white;
      display: block;
      font-weight: 700;
    }
  }
`;

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <AboutContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <HeroTitle>ABOUT BUGATTI</HeroTitle>
          <HeroSubtitle>
            "If comparable, it is no longer Bugatti." — A legacy of innovation, artistry, and uncompromising excellence spanning over a century.
          </HeroSubtitle>
        </HeroContent>
      </HeroSection>

      {/* Company Overview */}
      <ContentSection>
        <SectionTitle>OUR STORY</SectionTitle>
        <TextBlock>
          Bugatti is a luxury automotive manufacturer renowned for producing some of the world's most exclusive and high-performance hypercars. Founded in 1909 by <strong>Ettore Bugatti</strong> in Molsheim, Alsace, the brand has maintained an unwavering commitment to automotive excellence and artistic craftsmanship for over <strong>110 years</strong>.
        </TextBlock>

        <TextBlock>
          Each Bugatti is more than a car—it's a masterpiece of engineering and design. The company produces vehicles in extremely limited quantities, with the philosophy that <strong>exclusivity and perfection</strong> are paramount. Today, Bugatti is owned by the Volkswagen Group and continues to push the boundaries of automotive innovation and luxury.
        </TextBlock>

        <Grid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaTrophy />
            <CardTitle>Legacy of Excellence</CardTitle>
            <CardText>
              Over a century of automotive artistry and engineering innovation, defining the pinnacle of luxury performance.
            </CardText>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FaGlobeAmericas />
            <CardTitle>Global Prestige</CardTitle>
            <CardText>
              Recognized worldwide as the ultimate symbol of automotive exclusivity and uncompromising craftsmanship.
            </CardText>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaBuilding />
            <CardTitle>Handcrafted Mastery</CardTitle>
            <CardText>
              Every vehicle hand-assembled in Molsheim, France with meticulous attention to detail and precision.
            </CardText>
          </Card>
        </Grid>
      </ContentSection>

      {/* Key Highlights */}
      <ContentSection style={{ backgroundColor: 'rgba(190, 15, 52, 0.05)', padding: '100px 20px', margin: '-50px -20px 0 -20px' }}>
        <SectionTitle>KEY ACHIEVEMENTS</SectionTitle>
        <HighlightsGrid>
          <HighlightBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <h4>110+</h4>
            <p>Years of Heritage</p>
          </HighlightBox>

          <HighlightBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4>490+</h4>
            <p>km/h Top Speed</p>
          </HighlightBox>

          <HighlightBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4>1600+</h4>
            <p>Horsepower</p>
          </HighlightBox>

          <HighlightBox
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4>10</h4>
            <p>World Records</p>
          </HighlightBox>
        </HighlightsGrid>
      </ContentSection>

      {/* Timeline */}
      <ContentSection>
        <SectionTitle>MILESTONES</SectionTitle>
        <TimelineContainer>
          <TimelineItem initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <TimelineContent>
              <h4>1909</h4>
              <p>Ettore Bugatti founds Automobiles Ettore Bugatti in Molsheim, Alsace, establishing a new standard for automotive engineering and artistry.</p>
            </TimelineContent>
            <TimelineMarker>
              <TimelineCircle />
            </TimelineMarker>
          </TimelineItem>

          <TimelineItem $alternate initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <TimelineMarker>
              <TimelineCircle />
            </TimelineMarker>
            <TimelineContent>
              <h4>1956</h4>
              <p>Production ceases. The end of an era following Ettore Bugatti's death in 1947, leaving a legendary legacy of 8,000 vehicles.</p>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <TimelineContent>
              <h4>1998</h4>
              <p>Bugatti brand is revived under Volkswagen Group. The marque returns with renewed vision and cutting-edge technology.</p>
            </TimelineContent>
            <TimelineMarker>
              <TimelineCircle />
            </TimelineMarker>
          </TimelineItem>

          <TimelineItem $alternate initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <TimelineMarker>
              <TimelineCircle />
            </TimelineMarker>
            <TimelineContent>
              <h4>2005</h4>
              <p>Bugatti Veyron launches as the world's fastest production car, redefining automotive performance and luxury with 1001 HP and breaking speed records.</p>
            </TimelineContent>
          </TimelineItem>

          <TimelineItem initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <TimelineContent>
              <h4>2016</h4>
              <p>Bugatti Chiron debuts as the successor to the Veyron, featuring 1479 HP and advancements in design, performance, and luxury craftsmanship.</p>
            </TimelineContent>
            <TimelineMarker>
              <TimelineCircle />
            </TimelineMarker>
          </TimelineItem>

          <TimelineItem $alternate initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <TimelineMarker>
              <TimelineCircle />
            </TimelineMarker>
            <TimelineContent>
              <h4>Today</h4>
              <p>Bugatti continues to set the standard for hypercar excellence, producing exclusive models that combine artistry, engineering, and luxury in perfect harmony.</p>
            </TimelineContent>
          </TimelineItem>
        </TimelineContainer>
      </ContentSection>

      {/* Core Values */}
      <ContentSection style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', padding: '100px 20px', margin: '-50px -20px 0 -20px' }}>
        <SectionTitle>CORE VALUES</SectionTitle>
        <ValuesList as={motion.ul} variants={containerVariants} initial="hidden" whileInView="visible">
          <ValueItem variants={itemVariants}>
            <FaCheck />
            <div>
              <strong>Uncompromising Excellence</strong>
              <p>Every detail is perfected. We refuse compromise on quality, performance, or aesthetics.</p>
            </div>
          </ValueItem>

          <ValueItem variants={itemVariants}>
            <FaCheck />
            <div>
              <strong>Artistry & Engineering</strong>
              <p>Bugatti merges automotive engineering with artistic vision, creating rolling sculptures.</p>
            </div>
          </ValueItem>

          <ValueItem variants={itemVariants}>
            <FaCheck />
            <div>
              <strong>Exclusivity</strong>
              <p>Limited production ensures each Bugatti remains rare, precious, and infinitely desirable.</p>
            </div>
          </ValueItem>

          <ValueItem variants={itemVariants}>
            <FaCheck />
            <div>
              <strong>Innovation</strong>
              <p>Continuously pushing technological boundaries to create the next generation of hypercars.</p>
            </div>
          </ValueItem>

          <ValueItem variants={itemVariants}>
            <FaCheck />
            <div>
              <strong>Heritage</strong>
              <p>Honoring over a century of automotive legacy while embracing the future.</p>
            </div>
          </ValueItem>

          <ValueItem variants={itemVariants}>
            <FaCheck />
            <div>
              <strong>Craftsmanship</strong>
              <p>Hand-assembled with meticulous attention, each vehicle is a masterpiece of human skill.</p>
            </div>
          </ValueItem>
        </ValuesList>
      </ContentSection>

      {/* Founder Section */}
      <ContentSection>
        <SectionTitle>THE FOUNDER</SectionTitle>
        <Grid columns="1fr 1fr">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <TextBlock>
              <strong>Ettore Bugatti (1881-1947)</strong> was an Italian-born automobile designer and manufacturer who revolutionized the automotive industry. Born into an artistic family—his father was a renowned furniture designer—Ettore combined artistry with engineering prowess.
            </TextBlock>

            <TextBlock>
              His philosophy was simple yet profound: <strong>"If comparable, it is no longer Bugatti."</strong> This commitment to creating incomparable vehicles established the brand's uncompromising standards that persist today.
            </TextBlock>

            <TextBlock>
              Ettore Bugatti produced approximately 8,000 vehicles during his lifetime, each one a testament to his vision of perfection. His legacy transcends automobiles—it represents a philosophy of excellence that influences craftspeople and designers worldwide.
            </TextBlock>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Card style={{ textAlign: 'left', height: '100%' }}>
              <h3 style={{ color: '#BE0F34', marginBottom: '20px', fontSize: '1.3rem' }}>LEGACY INSIGHTS</h3>
              <ul style={{ listStyle: 'none', color: '#d1d5db', lineHeight: '2' }}>
                <li>✦ Founded Automobiles Ettore Bugatti in 1909</li>
                <li>✦ Pioneered advanced engineering techniques</li>
                <li>✦ Won over 1,000 races with Bugatti vehicles</li>
                <li>✦ Created the iconic Type 35 racing car</li>
                <li>✦ Established Molsheim as the hub of luxury manufacturing</li>
                <li>✦ Set standards for craftsmanship that persist today</li>
              </ul>
            </Card>
          </motion.div>
        </Grid>
      </ContentSection>

      {/* Locations */}
      <ContentSection style={{ backgroundColor: 'rgba(190, 15, 52, 0.05)', padding: '100px 20px', margin: '-50px -20px 0 -20px' }}>
        <SectionTitle>BUGATTI WORLDWIDE</SectionTitle>
        <Grid>
          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaBuilding />
            <CardTitle>Molsheim, France</CardTitle>
            <CardText>
              The heart of Bugatti. The historic manufacturing facility where every hypercar is hand-assembled with meticulous precision and artistry.
            </CardText>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <FaUsers />
            <CardTitle>Global Showrooms</CardTitle>
            <CardText>
              Bugatti showrooms worldwide offer personalized experiences and consultations with our experts to create your bespoke hypercar.
            </CardText>
          </Card>

          <Card
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <FaTrophy />
            <CardTitle>Automotive Excellence</CardTitle>
            <CardText>
              Bugatti vehicles are delivered to collectors, enthusiasts, and racing legends across continents, representing the pinnacle of automotive achievement.
            </CardText>
          </Card>
        </Grid>
      </ContentSection>
    </AboutContainer>
  );
};

export default About;
