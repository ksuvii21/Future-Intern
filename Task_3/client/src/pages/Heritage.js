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
      year: '2005',
      title: 'Modern Era',
      description: 'Veyron 16.4 redefines hyper sports cars with 1,001 horsepower.'
    },
    {
      year: '2016',
      title: 'Chiron',
      description: 'The Chiron continues the legacy with unprecedented performance and luxury.'
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
    </HeritageContainer>
  );
};

export default Heritage;