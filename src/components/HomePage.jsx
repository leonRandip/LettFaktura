import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import styled from "styled-components";

const PageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px;
`;

const Title = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const Subtitle = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
  line-height: 1.6;
`;

const HomePage = () => {
  const { getText } = useLanguage();

  return (
    <PageContainer>
      <ContentCard>
        <Title>{getText("nav_home")}</Title>
        <Subtitle>
          Welcome to 123 Fakturera. This is a demo page showing the navigation
          structure. The Terms page contains the actual content you requested.
        </Subtitle>
      </ContentCard>
    </PageContainer>
  );
};

export default HomePage;
