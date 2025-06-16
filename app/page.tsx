"use client";
//import React,{useState} from 'react'
/* import UploadResume from './component/UploadResume';
import Suggestions from './component/Suggestion'; */
import Navbar from "./component/ui/Navbar";
import { Hero } from "./component/hero/Hero";
import Testimonial from "./component/Testimonial/Testimonial";
import How from "./component/how-it-works/How-It-Works";
import Features from "./component/Features/Features";
import CTA from "./component/CTA/CTA";
import Footer from "./component/Footer/Footer";

const Home = () => {
  //const [result, setResult] = useState('');
  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar />
      <Hero />
      <Testimonial />
      <How />
      <Features />
      <CTA />
      <Footer />
     
    </div>
   
  )
}

export default Home;
 {/* <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">AI Resume Analyzer</h1>
      <UploadResume onResult={setResult} />
      {result && <Suggestions content={result} />}
    </main> */}