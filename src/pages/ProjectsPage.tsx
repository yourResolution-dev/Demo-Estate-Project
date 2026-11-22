import React, { useState } from 'react';
import { MapPin, Calendar, Building, Sparkles, ArrowRight } from 'lucide-react';
import { SIGNATURE_PROJECTS } from '../data/estateData';
import { Project } from '../types/estate.types';
import { ProjectModal } from '../components/ProjectModal';

export const ProjectsPage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <div className="bg-[#0B1210] text-white min-h-screen pt-12 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="max-w-3xl mb-12">
          <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C5A880] block mb-2">
            ARCHITECTURAL LANDMARKS
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white">
            Signature Developments
          </h1>
          <p className="text-sm sm:text-base text-[#C2CBC8] font-light mt-3 leading-relaxed">
            Curated low-density townships, sky-mansion towers, and lakefront estates designed by world-renowned master architects.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SIGNATURE_PROJECTS.map((project) => (
            <div
              key={project.id}
              onClick={() => setSelectedProject(project)}
              className="group bg-[#15221F] rounded-3xl overflow-hidden border border-[#29423C] hover:border-[#C5A880] transition-all duration-500 shadow-xl cursor-pointer flex flex-col"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={project.coverImage}
                  alt={project.name}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#DFBE82] text-[#0B1210]">
                    {project.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-[#DFC5A0] transition-colors">
                      {project.name}
                    </h3>
                    <span className="text-sm font-bold text-[#DFC5A0]">
                      From {project.startingPrice}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-[#8E9A96] mb-4">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{project.location}</span>
                  </div>

                  <p className="text-xs sm:text-sm text-[#C2CBC8] leading-relaxed mb-6">
                    {project.tagline}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#1F332E] flex items-center justify-between text-xs text-[#8E9A96]">
                  <span>{project.totalUnits}</span>
                  <div className="flex items-center gap-1 font-semibold text-[#DFC5A0] group-hover:translate-x-1 transition-transform">
                    <span>Explore Master Plan</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </div>
  );
};
