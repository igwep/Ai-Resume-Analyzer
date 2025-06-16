import React from 'react'
import { Upload, Search, TrendingUp } from "lucide-react";
import { Badge } from "../ui/Badge";

const How = () => {
  return (
  <section
        id="how-it-works"
        className="py-16 sm:py-20 lg:py-24 bg-[#1E293B]"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              How It Works
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
              Get professional resume feedback in three simple steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E3A8A]/30  rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Upload className="w-8 h-8 text-[#93C5FD]" />
              </div>
              <div className="mb-4">
                <Badge className="bg-[#27428b] text-[#93C5FD] border-[#1D4ED8] hover:bg-[#1E3A8A]  mb-4">
                  Step 1
                </Badge>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Upload Your Resume
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Simply drag and drop your resume or upload it in PDF, DOC, or
                  DOCX format. We support all major file types.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E3A8A]/30  rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="w-8 h-8 text-[#93C5FD]" />
              </div>
              <div className="mb-4">
                <Badge className="bg-[#27428b] text-[#93C5FD] border-[#1D4ED8] hover:bg-[#1E3A8A] mb-4">
                  Step 2
                </Badge>
                <h3 className="text-xl font-semibold text-white mb-3">
                  AI Analysis
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Our advanced AI analyzes your resume against industry
                  standards, ATS requirements, and best practices.
                </p>
              </div>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1E3A8A]/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-brand-400 text-[#93C5FD]" />
              </div>
              <div className="mb-4">
                <Badge className="bg-[#27428b] text-[#93C5FD] border-[#1D4ED8] hover:bg-[#1E3A8A] mb-4">
                  Step 3
                </Badge>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Get Insights
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Receive detailed feedback, improvement suggestions, and an
                  optimized version of your resume ready for applications.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
  )
}

export default How;