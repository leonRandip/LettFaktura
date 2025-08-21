import React from "react";
import { useLanguage } from "../contexts/LanguageContext";
import styled from "styled-components";

const PageContainer = styled.div`
  padding-top: 70px; /* Account for fixed navigation */
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  min-height: calc(100vh - 70px);
`;

const TopSection = styled.div`
  text-align: center;
  width: 100%;
  max-width: 900px;
  padding: 30px 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 850px;
  padding: 20px 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
`;

const TermsCard = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 40px 50px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  width: 100%;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BottomSection = styled.div`
  text-align: center;
  width: 100%;
  max-width: 900px;
  padding: 0 20px;
  margin-bottom: 40px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  text-align: center;
  color: white;
  font-family: "Open Sans", sans-serif;
  font-weight: 600;
  font-size: 24px;
  line-height: normal;
  margin-bottom: 20px;
`;

const CloseButton = styled.button`
  background: #079e1e;
  color: white;
  width: 300px;
  border: none;
  padding: 17px 40px;
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  font-size: 16px;
  line-height: 18px;
  border-radius: 30px;
  cursor: pointer;
  transition: all 0.3s ease;
  margin: 0 auto;
  display: block;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(39, 174, 96, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 250px;
    padding: 20px 40px;
    margin: 0 auto;
  }
`;

const TermsContent = styled.div`
  color: rgba(0, 0, 0, 0.6);
  font-family: "Open Sans", sans-serif;
  font-weight: 500;
  font-size: 15px;
  line-height: 23px;
  text-align: center;
  width: 100%;
  max-width: 100%;

  p {
    margin-bottom: 1rem;
    text-align: left;
  }

  strong,
  b {
    font-weight: 700 !important;
    color: rgba(0, 0, 0, 0.6) !important;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  color: white;
  font-size: 1.2rem;
`;

const TermsPage = () => {
  const { getText, loading } = useLanguage();

  const handleClose = () => {
    // In a real application, this would navigate back or close the modal
    window.history.back();
  };

  if (loading) {
    return (
      <PageContainer>
        <ContentWrapper>
          <LoadingSpinner>Loading...</LoadingSpinner>
        </ContentWrapper>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <TopSection>
        <Title>{getText("terms_title")}</Title>
        <CloseButton onClick={handleClose}>
          {getText("close_button")}
        </CloseButton>
      </TopSection>

      <ContentWrapper>
        <TermsCard>
          <TermsContent>
            {getText("terms_content")
              .split("\n\n")
              .map((paragraph, index) => (
                <p
                  key={index}
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}
          </TermsContent>
        </TermsCard>

        <BottomSection>
          <CloseButton onClick={handleClose}>
            {getText("close_button")}
          </CloseButton>
        </BottomSection>
      </ContentWrapper>
    </PageContainer>
  );
};

export default TermsPage;
