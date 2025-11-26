import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPlay } from 'react-icons/fa';

const HeritageContainer = styled.div`
  background: linear-gradient(to bottom, #000000, #0a0a0a);
  color: white;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  position: relative;
  height: 80vh;
  background: linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.7)),
              url('/images/heritage-bg.jpg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 50% 50%, rgba(190, 15, 52, 0.1) 0%, transparent 100%);
    pointer-events: none;
  }
`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;

  h1 {
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
  }

  p {
    font-size: 1.3rem;
    color: #d1d5db;
  }
`;

const ContentSection = styled.section`
  max-width: 1200px;
  margin: 0 auto;
  padding: 100px 20px;
`;

const SectionTitle = styled.h2`
  font-size: 3.5rem;
  margin-bottom: 60px;
  color: white;
  font-weight: 900;
  letter-spacing: 2px;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 2rem;
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
    transform: translateX(-50%);

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

  h3 {
    font-size: 1.5rem;
    color: #BE0F34;
    margin-bottom: 12px;
    font-weight: 700;
  }

  h4 {
    font-size: 1.1rem;
    color: white;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    color: #d1d5db;
    line-height: 1.8;
  }
`;

const GallerySection = styled.section`
  padding: 100px 20px;
  background: rgba(190, 15, 52, 0.05);
`;

const GalleryContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 25px;
  margin-top: 50px;
`;

const GalleryItem = styled(motion.div)`
  position: relative;
  border-radius: 15px;
  overflow: hidden;
  height: 350px;
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 1px solid #374151;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }

  &:hover img {
    transform: scale(1.08);
  }

  .overlay {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover .overlay {
    opacity: 1;
  }

  .caption {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    background: linear-gradient(to top, rgba(0,0,0,0.9), transparent);
    color: white;
    padding: 30px 20px 20px;
    font-size: 1.1rem;
    font-weight: 700;
    transition: all 0.3s ease;
  }
`;

const FoundersSection = styled.section`
  padding: 100px 20px;
  max-width: 1200px;
  margin: 0 auto;
`;

const FoundersGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 40px;
  margin-top: 60px;
`;

const FounderCard = styled(motion.div)`
  text-align: center;
  background: linear-gradient(135deg, #1f2937, #111827);
  border: 1px solid #374151;
  border-radius: 15px;
  padding: 40px 30px;
  transition: all 0.3s ease;

  &:hover {
    border-color: rgba(190, 15, 52, 0.5);
    box-shadow: 0 0 30px rgba(190, 15, 52, 0.2);
    transform: translateY(-10px);
  }

  .image-wrapper {
    width: 180px;
    height: 180px;
    margin: 0 auto 25px;
    border-radius: 15px;
    overflow: hidden;
    border: 3px solid #BE0F34;
    background: linear-gradient(135deg, #374151, #1f2937);

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }

    &:hover img {
      transform: scale(1.1);
    }
  }

  h3 {
    font-size: 1.5rem;
    color: #BE0F34;
    margin-bottom: 10px;
    font-weight: 700;
  }

  p {
    color: #d1d5db;
    line-height: 1.8;
    font-size: 0.95rem;
  }
`;

const Heritage = () => {
  const timelineEvents = [
    {
      year: '1909',
      title: 'Foundation',
      subtitle: 'The Beginning of an Era',
      description: 'Ettore Bugatti establishes Automobiles E. Bugatti in Molsheim, Alsace. With a revolutionary approach to automotive engineering, he combines artistic vision with technical precision, setting new standards for the industry.'
    },
    {
      year: '1910',
      title: 'First Production',
      subtitle: 'Type 13 Debuts',
      description: 'The Type 13 marks the beginning of Bugatti production, establishing the brand\'s reputation for quality and innovation. Early models showcase Ettore\'s unique engineering philosophy.'
    },
    {
      year: '1924',
      title: 'Racing Glory',
      subtitle: 'Type 35 Dominance',
      description: 'The legendary Type 35 racing car emerges as the most successful race car ever built, winning over 2,000 races and establishing Bugatti as the dominant force in motorsport.'
    },
    {
      year: '1931',
      title: 'Luxury Icon',
      subtitle: 'Type 41 Royale',
      description: 'The Type 41 Royale represents the pinnacle of luxury and engineering. This automotive masterpiece features an 12.7-liter engine and is considered one of the most magnificent cars ever created.'
    },
    {
      year: '1947',
      title: 'Legacy Continues',
      subtitle: 'Ettore\'s Passing',
      description: 'Ettore Bugatti passes away, leaving behind a legendary legacy of innovation, craftsmanship, and automotive excellence that would influence generations.'
    },
    {
      year: '1998',
      title: 'Brand Revival',
      subtitle: 'Volkswagen Group',
      description: 'Bugatti is revived under the Volkswagen Group. The brand is reborn with a commitment to producing hypercars that honor the original spirit while embracing modern technology.'
    },
    {
      year: '2005',
      title: 'Modern Era',
      subtitle: 'Veyron 16.4',
      description: 'The Bugatti Veyron 16.4 debuts as the world\'s fastest production car, featuring a quad-turbocharged 8.0-liter W16 engine producing 1,001 horsepower and reaching speeds of 407 km/h.'
    },
    {
      year: '2016',
      title: 'Next Generation',
      subtitle: 'Chiron Launch',
      description: 'The Chiron succeeds the Veyron with enhanced performance, featuring 1,479 horsepower, advanced aerodynamics, and cutting-edge technology while maintaining Bugatti\'s uncompromising standards.'
    },
    {
      year: '2023',
      title: 'Present Day',
      subtitle: 'Ongoing Excellence',
      description: 'Bugatti continues to produce exclusive hypercars, maintaining its position as the ultimate symbol of automotive luxury, performance, and innovation for discerning collectors worldwide.'
    }
  ];

  const galleryItems = [
    { src: '/images/heritage1.jpg', caption: 'Vintage Type 35 Racing Car' },
    { src: '/images/heritage2.jpg', caption: 'Bugatti Royale Heritage' },
    { src: '/images/heritage3.jpg', caption: 'Historic Workshop' },
    { src: '/images/heritage4.jpg', caption: 'Classic Bugatti Legacy' },
    { src: '/images/heritage5.jpg', caption: 'Racing Tradition' },
    { src: '/images/chiron.jpg', caption: 'Modern Hypercar Era' }
  ];

  const founders = [
    {
      name: 'Ettore Bugatti',
      image: '/images/ettore.jpg',
      period: '1881-1947',
      bio: 'Founder and visionary. Ettore revolutionized automotive engineering by merging artistic design with technical excellence, creating the philosophy: "If comparable, it is no longer Bugatti."'
    },
    {
      name: 'Jean Bugatti',
      image: '/images/jean.jpg',
      period: '1909-1939',
      bio: 'Ettore\'s son and design successor. Jean contributed revolutionary designs including the iconic Type 57SC Atlantic, one of the most beautiful cars ever created.'
    },
    {
      name: 'Wolfgang Dürheimer',
      image: '/images/wolfgang.jpg',
      period: 'Modern Era',
      bio: 'Modern visionary. As CEO, Wolfgang led the development of contemporary hypercars, ensuring Bugatti\'s legacy continues with innovation and exclusivity.'
    }
  ];

  return (
    <HeritageContainer>
      {/* Hero Section */}
      <HeroSection>
        <HeroContent
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h1>HERITAGE</h1>
          <p>Over 110 Years of Automotive Excellence</p>
        </HeroContent>
      </HeroSection>

      {/* Timeline Section */}
      <ContentSection>
        <SectionTitle>THE LEGENDARY TIMELINE</SectionTitle>
        <TimelineContainer>
          {timelineEvents.map((event, index) => (
            <TimelineItem 
              key={index}
              $alternate={index % 2 === 1}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <TimelineContent>
                <h3>{event.year}</h3>
                <h4>{event.title}</h4>
                <p style={{ fontSize: '0.9rem', color: '#BE0F34', marginBottom: '10px' }}>
                  {event.subtitle}
                </p>
                <p>{event.description}</p>
              </TimelineContent>
              <TimelineMarker>
                <TimelineCircle />
              </TimelineMarker>
            </TimelineItem>
          ))}
        </TimelineContainer>
      </ContentSection>

      {/* Gallery Section */}
      <GallerySection>
        <GalleryContainer>
          <SectionTitle>ICONIC MOMENTS</SectionTitle>
          <GalleryGrid>
            {galleryItems.map((item, idx) => (
              <GalleryItem
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <img src={item.src} alt={item.caption} />
                <div className="overlay">
                  <FaPlay size={40} color="#BE0F34" />
                </div>
                <div className="caption">{item.caption}</div>
              </GalleryItem>
            ))}
          </GalleryGrid>
        </GalleryContainer>
      </GallerySection>

      {/* Founders Section */}
      <FoundersSection>
        <SectionTitle>VISIONARIES & LEGENDS</SectionTitle>
        <FoundersGrid>
          {founders.map((founder, idx) => (
            <FounderCard
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <div className="image-wrapper">
                <img src={founder.image} alt={founder.name} />
              </div>
              <h3>{founder.name}</h3>
              <p style={{ fontSize: '0.85rem', color: '#9ca3af', marginBottom: '15px' }}>
                {founder.period}
              </p>
              <p>{founder.bio}</p>
            </FounderCard>
          ))}
        </FoundersGrid>
      </FoundersSection>
    </HeritageContainer>
  );
};

export default Heritage;
