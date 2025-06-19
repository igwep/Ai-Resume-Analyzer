'use client'

import React from 'react'
import { motion, easeOut } from 'framer-motion'
import { Button } from '../ui/button'
import { Badge } from '../ui/Badge'
import { Sparkles, Upload, Play, CheckCircle } from 'lucide-react'

export const Hero = () => {
  const containerVariants = {
    hidden: {},
    show: {
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      },
    },
  }

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  }

  return (
    <section className="pt-12 sm:pt-20 pb-16 sm:pb-32 bg-gradient-to-b from-[#1E293B] to-[#020817]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-4xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="show"
        >
          <motion.div variants={fadeInUp}>
            <Badge className="mb-4 sm:mb-6 bg-[#27428b] text-[#93C5FD] border-[#1D4ED8] hover:bg-[#1E3A8A] bg-opacity-90">
              <Sparkles className="w-3 h-3 mr-1" />
              AI-Powered Resume Analysis
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 sm:mb-6 leading-tight"
          >
            Elevate Your Resume with{" "}
            <span className="text-[#60A5FA]">AI Intelligence</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-neutral-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0"
          >
            Get instant, AI-powered feedback on your resume. Optimize for ATS
            systems, improve your content, and land more interviews with
            personalized suggestions.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-12 px-4 sm:px-0"
          >
            <Button
             onClick={() => (window.location.href = "/Dashboard")}
              size="lg"
              className="bg-[#2563EB] hover:bg-brand-700 text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
            >
              <Upload className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Analyze My Resume
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="border-neutral-600 text-neutral-300 hover:bg-[#1E3A8A] hover:text-white px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
            >
              <Play className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
              Watch Demo
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 text-sm text-neutral-400 px-4 sm:px-0"
          >
            {[
              'Free to start',
              'Instant results',
              'ATS optimized'
            ].map((text, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-2"
                variants={fadeInUp}
              >
                <CheckCircle className="w-4 h-4 text-green-400" />
                <span>{text}</span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
