'use client';

import React from 'react';
import { Upload, Search, TrendingUp } from 'lucide-react';
import { Badge } from '../ui/Badge';
import { motion, Variants } from 'framer-motion';

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const steps = [
  {
    icon: <Upload className="w-8 h-8 text-[#93C5FD]" />,
    title: 'Upload Your Resume',
    step: 'Step 1',
    description:
      'Simply drag and drop your resume or upload it in PDF, DOC, or DOCX format. We support all major file types.',
  },
  {
    icon: <Search className="w-8 h-8 text-[#93C5FD]" />,
    title: 'AI Analysis',
    step: 'Step 2',
    description:
      'Our advanced AI analyzes your resume against industry standards, ATS requirements, and best practices.',
  },
  {
    icon: <TrendingUp className="w-8 h-8 text-[#93C5FD]" />,
    title: 'Get Insights',
    step: 'Step 3',
    description:
      'Receive detailed feedback, improvement suggestions, and an optimized version of your resume ready for applications.',
  },
];

const How = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-20 lg:py-24 bg-[#1E293B]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Static Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            How It Works
          </h2>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            Get professional resume feedback in three simple steps
          </p>
        </div>

        {/* Animated Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              className="text-center"
            >
              <div className="w-16 h-16 bg-[#1E3A8A]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                {step.icon}
              </div>
              <div className="mb-4">
                <Badge className="bg-[#27428b] text-[#93C5FD] border-[#1D4ED8] hover:bg-[#1E3A8A] mb-4">
                  {step.step}
                </Badge>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-neutral-300 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default How;
