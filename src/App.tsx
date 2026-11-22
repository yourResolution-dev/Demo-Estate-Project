import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { WishlistProvider } from './context/WishlistContext';
import { ResolutionBanner } from './components/ResolutionBanner';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { AgencyInquiryModal } from './components/AgencyInquiryModal';
import { EnquiryModal } from './components/EnquiryModal';
import { QuickSearchModal } from './components/QuickSearchModal';
import { WishlistDrawer } from './components/WishlistDrawer';

import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AgentsPage } from './pages/AgentsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';

import './styles/estate.css';

export const App: React.FC = () => {
  const [agencyModalOpen, setAgencyModalOpen] = useState(false);
  const [enquiryModalOpen, setEnquiryModalOpen] = useState(false);
  const [enquiryPropertyTitle, setEnquiryPropertyTitle] = useState<string | undefined>(undefined);
  const [quickSearchOpen, setQuickSearchOpen] = useState(false);

  const handleOpenEnquiry = (title?: string) => {
    setEnquiryPropertyTitle(title);
    setEnquiryModalOpen(true);
  };

  return (
    <WishlistProvider>
      <BrowserRouter>
        <div className="min-h-screen flex flex-col bg-[#0B1210] selection:bg-[#C5A880] selection:text-[#0B1210]">
          
          {/* Subtle Demo Showcase Bar */}
          <ResolutionBanner onOpenAgencyModal={() => setAgencyModalOpen(true)} />

          {/* Luxury Navigation Bar */}
          <Navbar
            onOpenEnquiryModal={() => handleOpenEnquiry()}
            onOpenQuickSearch={() => setQuickSearchOpen(true)}
          />

          {/* Main App Routes */}
          <main className="flex-1">
            <Routes>
              {/* Main Demo Routes */}
              <Route
                path="/"
                element={
                  <HomePage
                    onOpenEnquiryModal={handleOpenEnquiry}
                    onOpenAdvisorModal={() => {}}
                  />
                }
              />
              <Route
                path="/demos/real-estate"
                element={
                  <HomePage
                    onOpenEnquiryModal={handleOpenEnquiry}
                    onOpenAdvisorModal={() => {}}
                  />
                }
              />
              <Route
                path="/demos/real-estate/properties"
                element={<PropertiesPage />}
              />
              <Route
                path="/demos/real-estate/property/:id"
                element={<PropertyDetailPage onOpenEnquiryModal={handleOpenEnquiry} />}
              />
              <Route
                path="/property/:id"
                element={<PropertyDetailPage onOpenEnquiryModal={handleOpenEnquiry} />}
              />
              <Route
                path="/demos/real-estate/projects"
                element={<ProjectsPage />}
              />
              <Route
                path="/demos/real-estate/agents"
                element={<AgentsPage />}
              />
              <Route
                path="/demos/real-estate/about"
                element={<AboutPage />}
              />
              <Route
                path="/demos/real-estate/contact"
                element={<ContactPage />}
              />

              {/* Fallback to /demos/real-estate */}
              <Route path="*" element={<Navigate to="/demos/real-estate" replace />} />
            </Routes>
          </main>

          {/* Comprehensive Luxury Footer */}
          <Footer />

          {/* Floating WhatsApp CTA */}
          <FloatingWhatsApp />

          {/* Global Modals & Drawers */}
          <AgencyInquiryModal
            isOpen={agencyModalOpen}
            onClose={() => setAgencyModalOpen(false)}
          />

          <EnquiryModal
            isOpen={enquiryModalOpen}
            onClose={() => setEnquiryModalOpen(false)}
            propertyTitle={enquiryPropertyTitle}
          />

          <QuickSearchModal
            isOpen={quickSearchOpen}
            onClose={() => setQuickSearchOpen(false)}
          />

          <WishlistDrawer />

        </div>
      </BrowserRouter>
    </WishlistProvider>
  );
};

export default App;
