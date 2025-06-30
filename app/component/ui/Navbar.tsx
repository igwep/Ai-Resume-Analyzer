"use client";
import React, {useState} from 'react'
import { Button } from './button';
import {
  /* Upload,
  Search,
  CheckCircle,
  Sparkles,
  Target, */
  FileText,
  /* TrendingUp,
  Zap,
  Shield,
  Users,
  Star,
  ArrowRight,
  Play,
  Quote, */
  Menu,
  X,
} from "lucide-react";

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  return (
 <header className="border-b border-[#334155] bg-[#020817]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <a href='#' className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-[#2563EB] rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-semibold text-white">ResumeAI</span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
                <a
                href="#testimonial"
                className="text-neutral-300 hover:text-white text-sm font-medium transition-colors"
              >
                Testimonials
              </a>
              <a
                href="#features"
                className="text-neutral-300 hover:text-white text-sm font-medium transition-colors"
              >
                Features
              </a>
              <a
                href="#how-it-works"
                className="text-neutral-300 hover:text-white text-sm font-medium transition-colors"
              >
                How it works
              </a>
             
              <Button
               onClick={() => (window.location.href = "/SignUp")}
                variant="outline"
                size="sm"
                className="border-neutral-600  text-neutral-300 hover:bg-[#1E3A8A] hover:text-white"
              >
                Sign in
              </Button>
              <Button
               onClick={() => (window.location.href = "/dashboard")}
                size="sm"
                className="bg-brand-600 hover:bg-brand-700 text-white"
              >
                Get started
              </Button>
            </nav>

            {/* Mobile menu button */}
            <button
              className="lg:hidden p-2 rounded-md text-neutral-300 hover:text-white hover:bg-neutral-800"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="lg:hidden border-t border-neutral-700 py-4">
              <div className="flex flex-col space-y-4">
                <a
                  href="#features"
                  className="text-neutral-300 hover:text-white text-sm font-medium transition-colors px-2 py-1"
                >
                  Features
                </a>
                <a
                  href="#how-it-works"
                  className="text-neutral-300 hover:text-white text-sm font-medium transition-colors px-2 py-1"
                >
                  How it works
                </a>
                
                <div className="flex flex-col space-y-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-neutral-600 text-neutral-300 hover:bg-neutral-800 hover:text-white w-full"
                  >
                    Sign in
                  </Button>
                  <Button
                    size="sm"
                    className="bg-[#2563EB] hover:bg-brand-700 text-white w-full"
                  >
                    Get started
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </header>
  )
}

export default Navbar