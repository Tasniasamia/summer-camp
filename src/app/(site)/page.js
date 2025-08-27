import AboutSection from '@/components/home/about';
import ClassesSection from '@/components/home/classSection';
import HeroSection from '@/components/home/hero';
import InstructorsSection from '@/components/home/instructorSection';
import PricingSection from '@/components/home/pricing';
import TestimonialsSection from '@/components/home/testimonialSection';
import React from 'react';

const page = () => {
  return (
    <div>
      <HeroSection/>
      <AboutSection/>
      <ClassesSection/>
      <InstructorsSection/>
      <TestimonialsSection/>
      <PricingSection/>
    </div>
  );
};

export default page;
