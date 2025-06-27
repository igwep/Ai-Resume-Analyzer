"use client";
import React,{useState, useRef} from 'react'
 import { useAppDispatch, useAppSelector } from '@/app/hooks/useTypedHooks';
 import { startLoading, stopLoading } from '@/app/Slices/LoaderSlice';
import { setAnalysisResult, /* clearAnalysisResult */ } from '@/app/Slices/analysisSlice'
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
import { openModal, closeModal } from '@/app/Slices/modalSLice';

 interface AnalysisResult {
  score: {
    title: string;
    value: number;
  };
  missingSkills: {
    title: string;
    value: {
      name: string;
      importance: 'high' | 'medium' | 'low';
      note: string;
    }[];
  };
  suggestions: {
    title: string;
    value: string;
  };
  skills: {
    name: string;
    importance: 'high' | 'medium' | 'low';
    note: string;
  }[];
  detailedSuggestions: {
    title: string;
    status: 'critical' | 'improvement' | 'success';
    note: string;
  }[];
}



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


  const skillGaps = [
    { skill: "Machine Learning", current: 60, target: 85 },
    { skill: "Cloud Architecture", current: 75, target: 90 },
    { skill: "Leadership", current: 45, target: 70 },
  ];

const Main = () => {
    const [dragActive, setDragActive] = useState(false);
    const [selectedFileName, setSelectedFileName] = useState<string | null>(null);
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [jobRow, setJobRow] = useState<string>("");
    const dispatch = useAppDispatch();
    //const {openModal, closeModal} = useAppDispatch();
    /* const { isLoading, message } = useAppSelector((state) => state.loader); */
 const analysis = useAppSelector((state) => state.analysis.result) as AnalysisResult | null;

   


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
     if (!selectedFileName || !jobRow) {
      alert("Please upload a resume and enter a job description.");
      return;
    }
    const formData = new FormData();
    if (selectedFile) {
      formData.append("resume", selectedFile);
      formData.append("jobDesc", jobRow);
    }
   


    try { 
      const res = await fetch('/api/analyze',{
        method: 'POST',
        body: formData,
      })
      const responseJson = await res.json(); 
      if(responseJson.error === "server_fail"){
        dispatch(stopLoading());
        openModal({
          modalType: "error",
          modalProps: {
            title: "Server Error",
            message: "Failed to analyze resume. Please try again later.",
          },
        });
        return;
      }
      dispatch(setAnalysisResult(responseJson))
      console.log("Analysis Result:", responseJson);
      dispatch(stopLoading());

    
    } catch (error) {
      console.error("Error uploading resume:", error);
      alert("Failed to analyze resume. Please try again.");
    } 
   } 
   const latestScore = analysis?.score?.value || 0;
   const missingSkills = analysis?.missingSkills?.value || [];
   const missingSkillsTitle = analysis?.missingSkills?.title || "Missing Skills or Experiences";
   //const missingSkillsNote = analysis?.missingSkills?.note || "Important skills for your field";
   

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
    Job Role or Postion
  </h3>
  <p className="text-neutral-400 mb-4 text-sm sm:text-base">
    Paste job Role or Postion for targeted analysis
  </p>
  <textarea
    placeholder="Click here to paste the job Row or Position..."
    className="w-full h-32 p-3 bg-[#334155] border border-[#334155] rounded-md text-white placeholder-neutral-400 resize-none focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition-colors"
    maxLength={24}
    onClick={(e) => {
      e.currentTarget.focus();
    }}
    value={jobRow}
    onChange={(e) => setJobRow(e.target.value)}
  />
  <p className="text-sm text-neutral-500 text-right mt-2">
    {jobRow.length}/24 characters
  </p>
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
                        {latestScore}
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
  {/* Analysis Card */}
  <Card className="border-[#334155] bg-[#1E293B]">
    <CardHeader>
      <CardTitle className="text-white flex items-center">
        <Sparkles className="w-5 h-5 mr-2 text-brand-400" />
        AI Analysis Results
      </CardTitle>
    </CardHeader>
    <CardContent className="space-y-6">
      {/* Score Section */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-white flex items-center">
          <BarChart3 className="w-5 h-5 mr-2 text-brand-400" />
          {analysis?.score?.title}
        </h3>
        <div className="bg-[#334155]/30 hover:bg-[#334155]/50 transition-colors rounded-lg p-4">
          <div className="flex items-center justify-between mb-3">
            <span className="text-neutral-300">Resume Quality</span>
            <span className="text-3xl font-bold text-white">
              {latestScore}/100
            </span>
          </div>
          <div className="w-full bg-neutral-700 rounded-full h-3 mb-2">
            <div
              className="bg-gradient-to-r from-[#38BDF8] to-[#2563EB] h-3 rounded-full transition-all duration-500"
              style={{ width: `${latestScore}%` }}
            />
          </div>
          <p className="text-sm text-neutral-400">
            {latestScore >= 90
              ? "Excellent! Your resume is well-optimized and likely to pass ATS systems."
              : latestScore >= 80
              ? "Good score! A few improvements could make your resume even stronger."
              : "Your resume has potential. Follow the suggestions below to improve your score."}
          </p>
        </div>
      </div>

      {/* Missing Skills */}
  <div className="space-y-2">
  <h3 className="text-lg font-semibold text-white flex items-center">
    <AlertCircle className="w-5 h-5 mr-2 text-red-400" />
    {missingSkillsTitle}
  </h3>
  {missingSkills ? (
    missingSkills.length > 0 ? (
      missingSkills.map((skill, index) => (
        <div
          key={index}
          className="flex items-start space-x-3 p-3 rounded-lg bg-[#334155]/30 hover:bg-[#334155]/50 transition-colors"
        >
          <div
            className={`w-2 h-2 rounded-full mt-2 ${
              skill.importance === "high"
                ? "bg-red-400"
                : skill.importance === "medium"
                ? "bg-yellow-400"
                : "bg-blue-400"
            }`}
          />
          <div className="flex-1">
            <h4 className="font-medium text-white">{skill.name}</h4>
            <p className="text-sm text-neutral-300 mt-1">
              {skill.note || "No additional notes provided."}
            </p>
          </div>
          <span
            className={`text-xs px-2 py-1 rounded ${
              skill.importance === "high"
                ? "bg-red-900/30 text-red-300"
                : skill.importance === "medium"
                ? "bg-yellow-900/30 text-yellow-300"
                : "bg-blue-900/30 text-blue-300"
            }`}
          >
            {skill.importance}
          </span>
        </div>
      ))
    ) : (
      <div className="p-4 bg-[#334155]/30 rounded-lg text-neutral-300">
        No missing skills detected 
      </div>
    )
  ) : (
    <div className="p-4 bg-[#334155]/30 rounded-lg text-neutral-300">
      Resume not analyzed yet.
    </div>
  )}
</div>



{/* Suggestions Section */}
                 <div className="space-y-3">
  <h3 className="text-lg font-semibold text-white flex items-center">
    <CheckCircle className="w-5 h-5 mr-2 text-green-400" />
    {analysis?.suggestions?.title}
  </h3>

  {/* Main Suggestion Text Box */}
  <div className="bg-[#334155]/30 hover:bg-[#334155]/50 transition-colors rounded-lg p-6 border border-[#334155]">
    <p className="text-white text-base leading-relaxed">
      {analysis?.suggestions?.value || "No suggestions provided. Please analyze your resume."}
    </p>
  </div>
</div>

    </CardContent>
  </Card>

  {/* Skill Gap Analysis */}
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
            <span className="text-white font-medium">{skill.skill}</span>
            <span className="text-neutral-400">
              {skill.current}% → {skill.target}%
            </span>
          </div>
          <div className="relative">
            <Progress value={skill.current} className="h-2 bg-neutral-700" />
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