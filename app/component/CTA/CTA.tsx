import React from 'react'
import { Button } from '../ui/button';
import { Upload, ArrowRight } from "lucide-react";

const CTA = () => {
  return (
     <section className="py-16 sm:py-20 lg:py-24 bg-[#1E293B]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 sm:mb-6">
              Ready to Transform Your Resume?
            </h2>
            <p className="text-lg sm:text-xl text-[#DBEAFE] mb-6 sm:mb-8 leading-relaxed">
              Join thousands of professionals who have already improved their
              job prospects with AI-powered resume analysis.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-white text-[#2563EB] hover:bg-neutral-50 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold w-full sm:w-auto"
              >
                <Upload className="w-4 sm:w-5 h-4 sm:h-5 mr-2 text-[#2563EB]" />
                Start Free Analysis
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-brand-300 text-white hover:bg-brand-700 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg w-full sm:w-auto"
              >
                Learn More
                <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 ml-2" />
              </Button>
            </div>
            <p className="text-[#BFDBFE] text-sm mt-4">
              No credit card required • Free to start • Instant results
            </p>
          </div>
        </div>
      </section>
  )
}

export default CTA