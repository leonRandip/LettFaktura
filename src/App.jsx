import React, { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { LanguageProvider } from "./contexts/LanguageContext";
import Navigation from "./components/Navigation";
import HomePage from "./components/HomePage";
import TermsPage from "./components/TermsPage";
import styled from "styled-components";

const AppContainer = styled.div`
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
`;

const DummyPage = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  padding-top: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const DummyContent = styled.div`
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  padding: 40px;
  text-align: center;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 20px;
`;

const DummyTitle = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 20px;
`;

const DummyText = styled.p`
  color: #7f8c8d;
  font-size: 1.2rem;
  line-height: 1.6;
`;

function App() {
  return (
    <LanguageProvider>
      <Router>
        <AppContainer>
          <Navigation />
          <Routes>
            <Route path="/" element={<Navigate to="/terms" replace />} />
            <Route path="/terms" element={<TermsPage />} />
            <Route
              path="/order"
              element={
                <DummyPage>
                  <DummyContent>
                    <DummyTitle>Order Page</DummyTitle>
                    <DummyText>
                      This is a placeholder page. The Terms page contains the
                      actual content.
                    </DummyText>
                  </DummyContent>
                </DummyPage>
              }
            />
            <Route
              path="/customers"
              element={
                <DummyPage>
                  <DummyContent>
                    <DummyTitle>Our Customers</DummyTitle>
                    <DummyText>
                      This is a placeholder page. The Terms page contains the
                      actual content.
                    </DummyText>
                  </DummyContent>
                </DummyPage>
              }
            />
            <Route
              path="/about"
              element={
                <DummyPage>
                  <DummyContent>
                    <DummyTitle>About Us</DummyTitle>
                    <DummyText>
                      This is a placeholder page. The Terms page contains the
                      actual content.
                    </DummyText>
                  </DummyContent>
                </DummyPage>
              }
            />
            <Route
              path="/contact"
              element={
                <DummyPage>
                  <DummyContent>
                    <DummyTitle>Contact Us</DummyTitle>
                    <DummyText>
                      This is a placeholder page. The Terms page contains the
                      actual content.
                    </DummyText>
                  </DummyContent>
                </DummyPage>
              }
            />
          </Routes>
        </AppContainer>
      </Router>
    </LanguageProvider>
  );
}

export default App;
