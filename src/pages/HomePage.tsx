import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { StatsSection } from '../components/StatsSection';
import { FeaturedPropertiesSection } from '../components/FeaturedPropertiesSection';
import { WhyUsSection } from '../components/WhyUsSection';
import { SignatureProjectsSection } from '../components/SignatureProjectsSection';
import { AdvisorSection } from '../components/AdvisorSection';
import { CtaSection } from '../components/CtaSection';
import { AdvisorModal } from '../components/AdvisorModal';
import { ProjectModal } from '../components/ProjectModal';
import { PROPERTIES_DATA, SIGNATURE_PROJECTS, ADVISORS_DATA } from '../data/estateData';
import { Property, Project, Advisor, PropertyPurpose } from '../types/estate.types';

interface HomePageProps {
  onOpenEnquiryModal: (title?: string) => void;
  onOpenAdvisorModal: (advisor?: Advisor) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onOpenEnquiryModal }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);

  // Filtered properties state
  const [filteredProperties, setFilteredProperties] = useState<Property[]>(PROPERTIES_DATA);

  // Search filter handler from Hero Search Bar
  const handleHeroSearch = (filters: {
    purpose: PropertyPurpose;
    location: string;
    propertyType: string;
    budgetIndex: number;
    bedrooms: string;
  }) => {
    const res = PROPERTIES_DATA.filter((p) => {
      if (filters.purpose && p.purpose !== filters.purpose) return false;
      if (filters.location !== 'All Locations' && p.location.area !== filters.location) return false;
      if (filters.propertyType !== 'all' && p.type !== filters.propertyType) return false;
      if (filters.bedrooms !== 'any') {
        if (filters.bedrooms === '5+' && p.bedrooms < 5) return false;
        if (filters.bedrooms !== '5+' && p.bedrooms !== Number(filters.bedrooms)) return false;
      }
      return true;
    });
    setFilteredProperties(res.length > 0 ? res : PROPERTIES_DATA);
  };

  return (
    <div className="bg-[#080D0C] text-[#EFECE6]">
      {/* Cinematic Hero Section matching reference image */}
      <HeroSection
        onSearch={handleHeroSearch}
        onOpenAdvisorModal={() => setSelectedAdvisor(ADVISORS_DATA[0])}
      />

      {/* 4 Animated / Dark Statistics Counters matching reference */}
      <StatsSection />

      {/* Featured Properties Section matching reference */}
      <FeaturedPropertiesSection
        properties={filteredProperties}
        onFilterChange={(purpose) => {
          if (purpose === 'all') {
            setFilteredProperties(PROPERTIES_DATA);
          } else {
            setFilteredProperties(PROPERTIES_DATA.filter((p) => p.purpose === purpose));
          }
        }}
      />

      {/* Why Estate & Co. Section matching reference */}
      <WhyUsSection />

      {/* Signature Projects Showcase matching reference */}
      <SignatureProjectsSection
        projects={SIGNATURE_PROJECTS}
        onSelectProject={(proj) => setSelectedProject(proj)}
      />

      {/* Meet Our Property Advisors Section matching reference */}
      <AdvisorSection
        advisors={ADVISORS_DATA}
        onSelectAdvisor={(adv) => setSelectedAdvisor(adv)}
      />

      {/* Final Pre-Footer Call to Action matching reference */}
      <CtaSection onEnquireNow={() => onOpenEnquiryModal()} />

      {/* Interactive Modals */}
      <AdvisorModal
        advisor={selectedAdvisor}
        onClose={() => setSelectedAdvisor(null)}
      />

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
