'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import {
  Target,
  Sparkles,
  Users,
  Zap,
  Shield,
  FileText,
} from 'lucide-react';
import { Card, CardContent } from '../ui/Cards';

const features = [
  {
    icon: <Target className="w-6 h-6 text-[#93C5FD]" />,
    title: 'ATS Optimization',
    description:
      'Ensure your resume passes Applicant Tracking Systems with optimized formatting and keyword suggestions.',
  },
  {
    icon: <Sparkles className="w-6 h-6 text-[#93C5FD]" />,
    title: 'Smart Suggestions',
    description:
      'Get AI-powered recommendations for improving your content, structure, and presentation.',
  },
  {
    icon: <Users className="w-6 h-6 text-[#93C5FD]" />,
    title: 'Industry Specific',
    description:
      'Tailored advice based on your industry and role, ensuring relevance and accuracy.',
  },
  {
    icon: <Zap className="w-6 h-6 text-[#93C5FD]" />,
    title: 'Instant Results',
    description:
      'Get comprehensive analysis and feedback within seconds, not days.',
  },
  {
    icon: <Shield className="w-6 h-6 text-[#93C5FD]" />,
    title: 'Privacy First',
    description:
      'Your resume data is encrypted and never stored permanently. Complete privacy guaranteed.',
  },
  {
    icon: <FileText className="w-6 h-6 text-[#93C5FD]" />,
    title: 'Format Flexibility',
    description:
      'Works with all resume formats and provides export options in multiple file types.',
  },
];

const cardVariants: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: 'easeOut',
    },
  }),
};

const Features = () => {
  return (
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-[#020817]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header (not animated) */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
            Powerful AI Features
          </h2>
          <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
            Everything you need to create a resume that stands out and gets
            noticed
          </p>
        </div>

        {/* Animated Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {features.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
            >
              <Card className="border-[#334155] bg-[#1E293B] py-6 md:px-1 hover:border-blue-600 transition-colors group">
                <CardContent>
                  <div className="w-12 h-12 bg-[#1E3A8A]/30 group-hover:bg-[#1E3A8A]/50 rounded-xl flex items-center justify-center mb-6 transition-colors">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-neutral-300 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
