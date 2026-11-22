import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, MapPin, ArrowUpRight } from 'lucide-react';
import { Project } from '../types/estate.types';

interface SignatureProjectsSectionProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const SignatureProjectsSection: React.FC<SignatureProjectsSectionProps> = ({
  projects,
  onSelectProject,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const canGoPrev = startIndex > 0;
  const canGoNext = startIndex + 3 < projects.length;

  const handlePrev = () => {
    if (canGoPrev) setStartIndex(startIndex - 1);
  };

  const handleNext = () => {
    if (canGoNext) setStartIndex(startIndex + 1);
  };

  const visibleProjects = projects.slice(startIndex, startIndex + 3);

  return (
    <section className="bg-[#0B1210] py-16 sm:py-24 text-white relative border-t border-[#1F332E]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header matching reference */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="text-xs uppercase font-bold tracking-[0.2em] text-[#C5A880] block mb-2">
              OUR PROJECTS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Signature Projects
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Carousel navigation controls */}
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                disabled={!canGoPrev}
                aria-label="Previous project"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  canGoPrev
                    ? 'border-[#29423C] bg-[#15221F] text-white hover:border-[#C5A880] hover:text-[#DFC5A0] cursor-pointer'
                    : 'border-[#1A2623] text-[#404D4A] cursor-not-allowed'
                }`}
              >
                <ArrowLeft className="w-4 h-4" />
              </button>

              <button
                onClick={handleNext}
                disabled={!canGoNext}
                aria-label="Next project"
                className={`w-10 h-10 rounded-full border flex items-center justify-center transition-all ${
                  canGoNext
                    ? 'border-[#29423C] bg-[#15221F] text-white hover:border-[#C5A880] hover:text-[#DFC5A0] cursor-pointer'
                    : 'border-[#1A2623] text-[#404D4A] cursor-not-allowed'
                }`}
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <Link
              to="/demos/real-estate/projects"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#DFC5A0] hover:text-white transition-colors ml-2 group"
            >
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>

        {/* Horizontal Project Showcase Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              onClick={() => onSelectProject(project)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer shadow-lg border border-[#1F332E] hover:border-[#C5A880]/60 transition-all duration-500"
            >
              {/* Background Project Photography */}
              <img
                src={project.coverImage}
                alt={project.name}
                loading="lazy"
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
              />

              {/* Dark Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B1210] via-[#0B1210]/40 to-transparent"></div>

              {/* Card Footer Content matching reference */}
              <div className="absolute bottom-0 inset-x-0 p-5 flex items-end justify-between gap-4">
                <div>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-white group-hover:text-[#DFC5A0] transition-colors mb-1">
                    {project.name}
                  </h3>
                  <div className="flex items-center gap-1.5 text-xs text-[#C2CBC8]">
                    <MapPin className="w-3.5 h-3.5 text-[#C5A880]" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Circular Action Button matching reference */}
                <div className="w-10 h-10 rounded-full border border-white/30 bg-black/40 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-[#DFC5A0] group-hover:text-[#0B1210] group-hover:border-[#DFC5A0] transition-all flex-shrink-0 shadow-md">
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
