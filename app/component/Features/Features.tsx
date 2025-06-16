import React from 'react'
import { Card, CardContent } from "../ui/Cards"
import { Target, Sparkles, Users, Zap, Shield, FileText } from "lucide-react"

const Features = () => {
  return (
    
    <section id="features" className="py-16 sm:py-20 lg:py-24 bg-[#020817] ">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
              Powerful AI Features
            </h2>
            <p className="text-lg sm:text-xl text-neutral-300 max-w-2xl mx-auto">
              Everything you need to create a resume that stands out and gets
              noticed
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <Card className="border-[#334155] bg-[#1E293B] py-6 md:px-1  hover:border-blue-600  transition-colors group">
              <CardContent className="">
                <div className="w-12 h-12 bg-[#1E3A8A]/30 group-hover:bg-[#1E3A8A]/50  rounded-xl flex items-center justify-center mb-6 transition-colors">
                  <Target className="w-6 h-6 text-[#93C5FD]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  ATS Optimization
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Ensure your resume passes Applicant Tracking Systems with
                  optimized formatting and keyword suggestions.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#334155] bg-[#1E293B] py-6 md:px-1  hover:border-blue-600  transition-colors group">
              <CardContent className="">
                <div className="w-12 h-12 bg-[#1E3A8A]/30 group-hover:bg-[#1E3A8A]/50 rounded-xl flex items-center justify-center mb-6  transition-colors">
                  <Sparkles className="w-6 h-6 text-[#93C5FD]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Smart Suggestions
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Get AI-powered recommendations for improving your content,
                  structure, and presentation.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#334155] bg-[#1E293B] py-6 md:px-1  hover:border-blue-600  transition-colors group">
              <CardContent className="">
                <div className="w-12 h-12 bg-[#1E3A8A]/30 group-hover:bg-[#1E3A8A]/50 rounded-xl flex items-center justify-center mb-6  transition-colors">
                  <Users className="w-6 h-6 text-[#93C5FD]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Industry Specific
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Tailored advice based on your industry and role, ensuring
                  relevance and accuracy.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#334155] bg-[#1E293B] py-6 md:px-1  hover:border-blue-600 transition-colors group">
              <CardContent className="">
                <div className="w-12 h-12 bg-[#1E3A8A]/30 group-hover:bg-[#1E3A8A]/50 rounded-xl flex items-center justify-center mb-6  transition-colors">
                  <Zap className="w-6 h-6 text-[#93C5FD]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Instant Results
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Get comprehensive analysis and feedback within seconds, not
                  days.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#334155] py-6 md:px-1  bg-[#1E293B] hover:border-blue-600 transition-colors group">
              <CardContent className="">
                <div className="w-12 h-12 bg-[#1E3A8A]/30 group-hover:bg-[#1E3A8A]/50 rounded-xl flex items-center justify-center mb-6  transition-colors">
                  <Shield className="w-6 h-6 text-[#93C5FD]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Privacy First
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Your resume data is encrypted and never stored permanently.
                  Complete privacy guaranteed.
                </p>
              </CardContent>
            </Card>
            <Card className="border-[#334155] bg-[#1E293B] py-6 md:px-1  hover:border-blue-600 transition-colors group">
              <CardContent className="">
                <div className="w-12 h-12 bg-[#1E3A8A]/30 group-hover:bg-[#1E3A8A]/50 rounded-xl flex items-center justify-center mb-6  transition-colors">
                  <FileText className="w-6 h-6 text-[#93C5FD]" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  Format Flexibility
                </h3>
                <p className="text-neutral-300 leading-relaxed">
                  Works with all resume formats and provides export options in
                  multiple file types.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
  )
}

export default Features