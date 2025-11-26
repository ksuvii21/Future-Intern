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
  group;

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

    &:hover {
      opacity: 1;
    }
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
      description: 'Ettore Bugatti establishes Automobiles E. Bugatti in Molsheim, France.'
    },
    {
      year: '1910',
      title: 'First Production Car',
      description: 'The Type 13 begins production, marking the start of Bugatti\'s legacy.'
    },
    {
      year: '1924',
      title: 'Racing Dominance',
      description: 'Type 35 begins its legendary racing career, winning over 2,000 races.'
    },
    {
      year: '1931',
      title: 'Royale',
      description: 'Type 41 Royale represents the pinnacle of luxury and automotive excellence.'
    },
    {
      year: '1952',
      title: 'Post-War Revival',
      description: 'Bugatti resumes limited production, focusing on innovation.'
    },
    {
      year: '1987',
      title: 'Veyron Development Begins',
      description: 'Work commences on a new hypercar that will redefine performance standards.'
    },
    {
      year: '2005',
      title: 'Modern Era',
      description: 'Veyron 16.4 redefines hyper sports cars with 1,001 horsepower.'
    },
    {
      year: '2016',
      title: 'Chiron',
      description: 'The Chiron continues the legacy with unprecedented performance and luxury.'
    },
    {
      year: '2020',
      title: 'Divo Introduction',
      description: 'Divo ensures cutting-edge aerodynamics and handling technology.'
    }
  ];

  const galleryItems = [
    { src: '/images/heritage1.jpg', caption: 'Vintage Bugatti Type 35' },
    { src: '/images/heritage2.jpg', caption: 'Bugatti Royale in Classic Showroom' },
    { src: '/images/heritage3.jpg', caption: 'Ettore Bugatti Portrait' },
    { src: '/images/heritage4.jpg', caption: 'Classic Bugatti Workshop' },
    { src: '/images/heritage5.jpg', caption: 'Bugatti Racing Legacy' }
  ];

  const founders = [
    {
      name: 'Ettore Bugatti',
      image: '/images/ettore.jpg',
      bio: 'Founder and visionary behind the Bugatti brand, renowned for engineering excellence.'
    },
    {
      name: 'Jean Bugatti',
      image: '/images/jean.jpg',
      bio: 'Ettore’s son, contributed to design and innovation including the iconic Type 57SC Atlantic.'
    },
    {
      name: 'Wolfgang Dürheimer',
      image: '/images/wolfgang.jpg',
      bio: 'Former Bugatti CEO who led the development of the modern hypercar era.'
    }
  ];

  return (
    <HeritageContainer>
      <HeroSection>
        <div>
          <h1 style={{ fontSize: '4rem', marginBottom: '20px' }}>HERITAGE</h1>
          <p style={{ fontSize: '1.2rem' }}>A century of automotive excellence</p>
        </div>
      </HeroSection>

      <ContentSection>
        <h2 style={{ textAlign: 'center', fontSize: '2.5rem', marginBottom: '50px' }}>
          THE BUGATTI LEGACY
        </h2>
        
        <Timeline>
          {timelineEvents.map((event, index) => (
            <TimelineItem key={index}>
              <Year>{event.year}</Year>
              <Content className="content">
                <h3>{event.title}</h3>
                <p>{event.description}</p>
              </Content>
            </TimelineItem>
          ))}
        </Timeline>
      </ContentSection>

      <GallerySection>
        <GalleryTitle>Vintage Bugatti Gallery</GalleryTitle>
        <GalleryGrid>
          {galleryItems.map((item, idx) => (
            <GalleryItem key={idx}>
              <img src={item.src} alt={item.caption} />
              <p>{item.caption}</p>
            </GalleryItem>
          ))}
        </GalleryGrid>
      </GallerySection>

      <FoundersSection>
        <FoundersTitle>Founders & Legends</FoundersTitle>
        {founders.map((founder, idx) => (
          <FounderCard key={idx}>
            <img src={founder.image} alt={founder.name} />
            <h3>{founder.name}</h3>
            <p>{founder.bio}</p>
          </FounderCard>
        ))}
      </FoundersSection>

    </HeritageContainer>
  );
};

export default Heritage;
