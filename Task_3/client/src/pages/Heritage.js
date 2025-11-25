import React from 'react';
import styled from 'styled-components';

const HeritageContainer = styled.div`
  padding-top: 100px;
  min-height: 100vh;
`;

const HeritageContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 50px 20px;
`;

const Title = styled.h1`
  font-size: 3rem;
  text-align: center;
  margin-bottom: 50px;
`;

const HistorySection = styled.section`
  margin-bottom: 50px;
`;

const SectionTitle = styled.h2`
  font-size: 2rem;
  margin-bottom: 20px;
  color: ${props => props.theme.colors.secondary};
`;

const Paragraph = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 20px;
`;

const Heritage = () => {
  return (
    <HeritageContainer>
      <HeritageContent>
        <Title>BUGATTI HERITAGE</Title>
        
        <HistorySection>
          <SectionTitle>The Beginning</SectionTitle>
          <Paragraph>
            Founded in 1909 by Italian-born Ettore Bugatti, the brand quickly established itself as a manufacturer of high-performance automobiles. The company's reputation was built on the success of its racing cars and the unparalleled luxury of its road cars.
          </Paragraph>
        </HistorySection>

        <HistorySection>
          <SectionTitle>The Golden Era</SectionTitle>
          <Paragraph>
            The 1920s and 1930s were the golden era for Bugatti, with the Type 35 becoming one of the most successful racing cars in history. The Type 41 Royale represented the pinnacle of automotive luxury, while the Type 57 became a classic of the 1930s.
          </Paragraph>
        </HistorySection>

        <HistorySection>
          <SectionTitle>Revival</SectionTitle>
          <Paragraph>
            After several decades of dormancy, the brand was revived in the 1990s and later acquired by the Volkswagen Group. The Veyron, introduced in 2005, redefined the hyper sports car segment with its staggering performance figures. It was followed by the Chiron in 2016, pushing the boundaries even further.
          </Paragraph>
        </HistorySection>
      </HeritageContent>
    </HeritageContainer>
  );
};

export default Heritage;