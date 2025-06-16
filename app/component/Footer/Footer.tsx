import React from 'react'
import { FileText } from 'lucide-react'

const Footer = () => {
  return (
    <footer className="bg-[#020817] text-white py-12 sm:py-16">
  <div className="container mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
      {/* Logo and Description */}
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
           <FileText className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-semibold">ResumeAI</span>
        </div>
        <p className="text-neutral-400 leading-relaxed max-w-sm">
          AI-powered resume analysis to help you stand out and land interviews.
        </p>
      </div>

      {/* Navigation */}
      <div>
        <h4 className="font-semibold mb-4 text-white">Explore</h4>
        <ul className="space-y-3 text-neutral-400">
          <li><a href="#features" className="hover:text-white transition">Features</a></li>
          <li><a href="#how-it-works" className="hover:text-white transition">How It Works</a></li>
          <li><a href="/signin" className="hover:text-white transition">Sign In</a></li>
          <li><a href="/get-started" className="hover:text-white transition">Get Started</a></li>
        </ul>
      </div>

      {/* Contact */}
      <div>
        <h4 className="font-semibold mb-4 text-white">Contact</h4>
        <ul className="space-y-3 text-neutral-400">
          <li><a href="mailto:support@resumeai.com" className="hover:text-white transition">support@resumeai.com</a></li>
          <li><a href="#" className="hover:text-white transition">+1 (800) 123-4567</a></li>
        </ul>
      </div>
    </div>

    {/* Bottom Bar */}
    <div className="border-t border-neutral-800 pt-6 sm:pt-8">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-neutral-400 text-sm text-center sm:text-left">
          © 2024 ResumeAI. All rights reserved.
        </p>
        <div className="flex items-center gap-6 text-neutral-400">
          <a href="#" aria-label="Twitter" className="hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg>
          </a>
          <a href="#" aria-label="LinkedIn" className="hover:text-white transition">
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="..." /></svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</footer>

  )
}

export default Footer