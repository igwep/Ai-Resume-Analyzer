'use client'

import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Card, CardContent } from '../ui/Cards'
import { Star, Quote } from 'lucide-react'

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 40 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: [0.25, 0.8, 0.25, 1],
    },
  }),
};

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Software Engineer',
    initials: 'SJ',
    text: `ResumeAI helped me identify gaps in my resume I never
            noticed. I got 3x more interview calls after implementing
            their suggestions!`,
  },
  {
    name: 'Michael Chen',
    role: 'Product Manager',
    initials: 'MC',
    text: `The ATS optimization feature was a game-changer. My resume
            now passes through automated systems and reaches actual
            recruiters.`,
  },
  {
    name: 'Emily Rodriguez',
    role: 'UX Designer at Airbnb',
    initials: 'ER',
    text: `I was struggling to get interviews for months. After using
            ResumeAI, I landed my dream job within 2 weeks. The AI
            suggestions were spot-on!`,
  },
]

const Testimonial = () => {
  return (
    <section id='testimonial' className="py-12 sm:py-16 lg:py-20 bg-[#020817] border-b border-neutral-700">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3 sm:mb-4">
            Loved by Job Seekers Worldwide
          </h2>
          <p className="text-neutral-300 max-w-2xl mx-auto">
            See how ResumeAI has helped professionals land their dream jobs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              variants={cardVariants}
              custom={i} // Pass index as custom prop for staggered animation
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.4 }}
              transition={{ delay: i * 0.2 }}
              className={`${
                i === 2 ? 'md:col-span-2 lg:col-span-1' : ''
              }`}
            >
              <Card className="border-[#334155] bg-[#1E293B] hover:border-blue-600 py-6 px-1 transition-colors">
                <CardContent>
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, starIdx) => (
                        <Star key={starIdx} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <Quote className="w-6 h-6 text-neutral-600 mb-3" />
                  <p className="text-[#E2E8F0] mb-4 leading-relaxed">&quot;{t.text}&quot;</p>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-[#1E3A8A] rounded-full flex items-center justify-center mr-3">
                      <span className="text-[#93C5FD] font-semibold text-sm">{t.initials}</span>
                    </div>
                    <div>
                      <div className="font-semibold text-white text-sm">{t.name}</div>
                      <div className="text-neutral-400 text-xs">{t.role}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Testimonial
