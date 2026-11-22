import React from 'react';
import { Users, Building, Award, MapPin } from 'lucide-react';

export const StatsSection: React.FC = () => {
  const stats = [
    {
      value: '1,200+',
      label: 'Properties Listed',
      icon: Users,
    },
    {
      value: '850+',
      label: 'Happy Clients',
      icon: Building,
    },
    {
      value: '15+',
      label: 'Years of Experience',
      icon: Award,
    },
    {
      value: '8+',
      label: 'Prime Locations',
      icon: MapPin,
    },
  ];

  return (
    <section className="bg-[#080D0C] border-y border-[#1F332E] py-8 sm:py-10 relative z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3.5 sm:gap-4 group justify-center md:justify-start"
              >
                {/* Icon box */}
                <div className="w-12 h-12 rounded-xl bg-[#101B18] border border-[#29423C] flex items-center justify-center text-[#DFC5A0] group-hover:border-[#C5A880] group-hover:bg-[#15221F] transition-all flex-shrink-0 shadow-sm">
                  <Icon className="w-6 h-6 transition-transform group-hover:scale-110" />
                </div>

                {/* Typography */}
                <div>
                  <div className="font-serif text-2xl sm:text-3xl font-bold text-white tracking-tight leading-none mb-1 group-hover:text-[#DFC5A0] transition-colors">
                    {stat.value}
                  </div>
                  <div className="text-xs sm:text-sm text-[#8E9A96] font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
