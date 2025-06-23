"use client";
import React,{useState, useRef} from 'react'
 import { useAppDispatch, useAppSelector } from '@/app/hooks/useTypedHooks';
 import { startLoading, stopLoading } from '@/app/Slices/LoaderSlice';
import { setAnalysisResult, clearAnalysisResult } from '@/app/Slices/analysisSlice'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/Cards";
import { Button } from "../ui/button";
import { Badge } from '../ui/Badge';
import {
  FileText,
  Eye,
/*   Zap,
  Download,
  Users, */
  Upload,
/*   Star, */
  Target,
  History,
  BarChart3,
  TrendingUp,
  Clock,
  Sparkles,
  AlertCircle,
  CheckCircle,
  Award,
} from "lucide-react";
import { Progress } from '../ui/Progress';

 const analysisHistory = [
    {
      id: 1,
      name: "Senior_Developer_Resume.pdf",
      date: "2 hours ago",
      score: 92,
      status: "completed",
    },
    {
      id: 2,
      name: "Product_Manager_CV.pdf",
      date: "1 day ago",
      score: 87,
      status: "completed",
    },
    {
      id: 3,
      name: "UX_Designer_Resume.pdf",
      date: "3 days ago",
      score: 94,
      status: "completed",
    },
  ];

const suggestions = [
    {
      type: "critical",
      icon: AlertCircle,
      title: "Add Keywords",
      description:
        "Include 'React', 'Node.js', and 'AWS' to match job requirements",
    },
    {
      type: "improvement",
      icon: TrendingUp,
      title: "Quantify Achievements",
      description:
        "Add metrics to your accomplishments (e.g., '40% performance improvement')",
    },
    {
      type: "success",
      icon: CheckCircle,
      title: "Strong Experience Section",
      description: "Your work experience is well-structured and detailed",
    },
  ];

  const skillGaps = [
    { skill: "Machine Learning", current: 60, target: 85 },
    { skill: "Cloud Architecture", current: 75, target: 90 },
    { skill: "Leadership", current: 45, target: 70 },
  ];

const Main = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [jobDescription, setJobDescription] = useState<string>("");
    const dispatch = useAppDispatch();
    /* const { isLoading, message } = useAppSelector((state) => state.loader); */
   // const analysis = useAppSelector((state) => state.analysis.result);
   


    const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    // Handle file drop logic here
  };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      setSelectedFile(file);
    }
  };
    const handleClick = () => {
    fileInputRef.current?.click();
  };
   const handleUpload = async () => {
    dispatch(startLoading('analzing your Resume'))
     if (!selectedFileName || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }
    const formData = new FormData();
    if (selectedFile) {
      formData.append("resume", selectedFile);
      formData.append("jobDesc", jobDescription);
    }
   


    try { 
      const res = await fetch('/api/analyze',{
        method: 'POST',
        body: formData,
      })
      const responseJson = await res.json(); // read once
      dispatch(setAnalysisResult(responseJson))
      console.log("Analysis Result:", responseJson);
      dispatch(stopLoading());

    
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to analyze resume. Please try again.");
    } 
   } 

  return (
   <div className="max-w-8xl mx-auto space-y-6">
            {/* Upload Section */}
            <Card className="border-[#334155] bg-[#1E293B]">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Upload className="w-5 h-5 mr-2 text-brand-400" />
                  Upload Resume & Job Description
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Resume Upload */}
           <div
      className={`border-2 border-dashed rounded-lg p-6 sm:p-8 text-center cursor-pointer transition-colors ${
        dragActive
          ? "border-brand-400 bg-brand-900/20"
          : "border-neutral-600 hover:border-neutral-500"
      }`}
      onClick={handleClick}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
    >
      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        onChange={handleFileChange}
        accept=".pdf,.doc,.docx"
      />
      <FileText className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-white mb-2">Upload Resume</h3>
      <p className="text-neutral-400 mb-4 text-sm sm:text-base">
        Drag and drop your resume or click to browse
      </p>
      <Button
        variant="outline"
        className="border-neutral-600 text-neutral-300 hover:bg-neutral-700"
        onClick={(e) => {
          e.stopPropagation();
          handleClick();
        }}
      >
        Choose File
      </Button>

      {selectedFileName && (
        <p className="mt-4 text-sm text-green-400">{selectedFileName}</p>
      )}
    </div>

                  {/* Job Description Upload */}
                   <div className="border-2 border-dashed border-neutral-600 rounded-lg p-6 sm:p-8 hover:border-neutral-500 transition-colors">
                    <Target className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">
                      Job Description
                    </h3>
                    <p className="text-neutral-400 mb-4 text-sm sm:text-base">
                      Paste job description for targeted analysis
                    </p>
                    <textarea
                      placeholder="Click here to paste the job description..."
                      className="w-full h-32 p-3 bg-[#334155] border border-[#334155] rounded-md text-white placeholder-neutral-400 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
                      onClick={(e) => {
                        e.currentTarget.focus();
                      }}
                      value={jobDescription}
                      onChange={(e) => setJobDescription(e.target.value)}
                    />
                  </div>
                </div>
                 <div className="flex justify-center mt-6">
                  <Button
                    size="lg"
                    className="bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 text-lg font-semibold min-w-[200px] shadow-lg hover:shadow-xl transition-all duration-200"
                    onClick={() => {
                      handleUpload()
                      // Handle analysis start logic here
                      console.log("Starting analysis...");
                    }}
                  >
                    <Sparkles className="w-5 h-5 mr-2" />
                    Start Analysis
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
              <Card className="border-[#334155] bg-[#1E293B]">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1E3A8A]/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                      <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-[#93C5FD]" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        92
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm">
                        Latest Score
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#334155] bg-[#1E293B]">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        +15
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm">
                        Score Improvement
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-[#334155] bg-[#1E293B] sm:col-span-2 lg:col-span-1">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        12
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm">
                        Analyses Done
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Analysis Results */}
              <div className="xl:col-span-2 space-y-6">
                <Card className="border-[#334155] bg-[#1E293B]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Sparkles className="w-5 h-5 mr-2 text-brand-400" />
                      AI Analysis Results
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {suggestions.map((suggestion, index) => {
                      const Icon = suggestion.icon;
                      return (
                        <div
                          key={index}
                          className="flex items-start space-x-3 p-4 rounded-lg bg-[#334155]/30 hover:bg-[#334155]/50 transition-colors"
                        >
                          <Icon
                            className={`w-5 h-5 mt-0.5 ${
                              suggestion.type === "critical"
                                ? "text-red-400"
                                : suggestion.type === "improvement"
                                  ? "text-yellow-400"
                                  : "text-green-400"
                            }`}
                          />
                          <div className="flex-1">
                            <h4 className="font-medium text-white">
                              {suggestion.title}
                            </h4>
                            <p className="text-sm text-neutral-300 mt-1">
                              {suggestion.description}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>

                {/* Skill Gaps */}
                <Card className="border-[#334155] bg-[#1E293B]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Award className="w-5 h-5 mr-2 text-brand-400" />
                      Skill Gap Analysis
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {skillGaps.map((skill, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-white font-medium">
                            {skill.skill}
                          </span>
                          <span className="text-neutral-400">
                            {skill.current}% → {skill.target}%
                          </span>
                        </div>
                        <div className="relative">
                          <Progress
                            value={skill.current}
                            className="h-2 bg-neutral-700"
                          />
                          <div
                            className="absolute top-0 h-2 bg-brand-600/30 rounded-full"
                            style={{ width: `${skill.target}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
  {/* History Panel */}
              <div className="space-y-6">
                <Card className="border-[#334155] bg-[#1E293B]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center justify-between">
                      <span className="flex items-center">
                        <History className="w-5 h-5 mr-2 text-brand-400" />
                        Recent Analyses
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-neutral-400 hover:text-white"
                        onClick={() =>
                          (window.location.href = "/dashboard/history")
                        }
                      >
                        View All
                      </Button>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {analysisHistory.map((analysis) => (
                      <div
                        key={analysis.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-[#334155]/30 hover:bg-[#334155]/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white truncate">
                            {analysis.name}
                          </p>
                          <p className="text-xs text-neutral-400">
                            {analysis.date}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge
                            className={`${
                              analysis.score >= 90
                                ? "bg-green-900/30 text-green-300"
                                : analysis.score >= 80
                                  ? "bg-yellow-900/30 text-yellow-300"
                                  : "bg-red-900/30 text-red-300"
                            }`}
                          >
                            {analysis.score}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-neutral-400 hover:text-white p-1"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
              {/*   <Card className="border-neutral-700 bg-[#1E293B]">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Zap className="w-5 h-5 mr-2 text-brand-400" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full justify-start bg-neutral-700 hover:bg-neutral-600 text-white text-sm">
                      <Download className="w-4 h-4 mr-2" />
                      Export Latest Report
                    </Button>
                    <Button className="w-full justify-start bg-neutral-700 hover:bg-neutral-600 text-white text-sm">
                      <Users className="w-4 h-4 mr-2" />
                      Compare with Industry
                    </Button>
                    <Button className="w-full justify-start bg-neutral-700 hover:bg-neutral-600 text-white text-sm">
                      <Star className="w-4 h-4 mr-2" />
                      Get Premium Analysis
                    </Button>
                  </CardContent>
                </Card> */}
              </div>
        
    </div>
    </div>
  )
}

export default Main;