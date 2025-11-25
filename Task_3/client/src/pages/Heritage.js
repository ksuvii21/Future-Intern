import React from 'react';
import styled from 'styled-components';

const HeritageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const HeroSection = styled.div`
  height: 60vh;
  background: linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)),
              url('/images/heritage-bg.jpg') center/cover;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: white;
`;

const ContentSection = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: 50px 20px;
`;

const Timeline = styled.div`
  position: relative;
  max-width: 800px;
  margin: 50px auto;
`;

const TimelineItem = styled.div`
  display: flex;
  margin-bottom: 50px;
  
  &:nth-child(even) {
    flex-direction: row-reverse;
    
    .content {
      text-align: right;
      margin-right: 30px;
      margin-left: 0;
    }
  }
`;

const Year = styled.div`
  background: #BE0F34;
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  font-weight: bold;
  min-width: 100px;
  text-align: center;
`;

const Content = styled.div`
  margin-left: 30px;
  flex: 1;
  
  h3 {
    margin-bottom: 10px;
    color: #333;
  }
  
  p {
    line-height: 1.6;
    color: #666;
  }
`;

const GallerySection = styled.div`
  max-width: 900px;
  margin: 50px auto;
  text-align: center;
`;

const GalleryTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #111;
`;

const GalleryGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
`;

const GalleryItem = styled.div`
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }

  img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
    border-radius: 10px;
  }

  p {
    margin-top: 10px;
    color: #444;
    font-weight: 600;
  }
`;

const FoundersSection = styled.div`
  max-width: 900px;
  margin: 50px auto 100px;
  text-align: center;
`;

const FoundersTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 30px;
  color: #111;
`;

const FounderCard = styled.div`
  display: inline-block;
  width: 250px;
  margin: 10px 15px;
  text-align: center;
  vertical-align: top;

  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 5px 15px rgba(0,0,0,0.2);
    margin-bottom: 15px;
  }

  h3 {
    color: #333;
    margin-bottom: 8px;
  }

  p {
    color: #666;
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
