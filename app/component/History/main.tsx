"use client";
import React,{ useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../ui/Cards";
import {
  FileText,
  Eye,
  BarChart3,
  TrendingUp,
  HistoryIcon,
  Clock,
  /* HelpCircle,
  Settings,
  Home, */
  Calendar,
  Trash2,
  Search,
} from "lucide-react";
import { Input } from "../ui/Input";
import { Button } from "../ui/button";
import { Badge } from "../ui/Badge";


const Main = () => {
   // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showDetailsModal, setShowDetailsModal] = useState(false);

  const analysisHistory = [
    {
      id: 1,
      name: "Senior_Developer_Resume.pdf",
      date: "2024-03-15",
      time: "2 hours ago",
      score: 92,
      status: "completed",
      type: "resume",
      size: "2.3 MB",
      analysisResults: {
        score: {
          title: "Match Score",
          value: 92,
        },
        missingSkills: {
          title: "Missing Skills or Experiences",
          value: [
            { name: "TypeScript", importance: "high" as const },
            { name: "AWS", importance: "medium" as const },
            { name: "Docker", importance: "low" as const },
          ],
        },
        suggestions: {
          title: "Suggestions to Improve Resume",
          value:
            "Add more quantifiable achievements and highlight your leadership experience. Consider adding TypeScript skills to match current market demands.",
        },
        detailedSuggestions: [
          {
            title: "Include more measurable achievements",
            status: "improvement" as const,
            note: "Quantifying your results (e.g., 'improved performance by 40%') makes your resume more compelling.",
          },
          {
            title: "Highlight relevant backend experience",
            status: "critical" as const,
            note: "The job emphasizes full-stack skills, but your backend experience needs more emphasis.",
          },
          {
            title: "Strong technical foundation",
            status: "success" as const,
            note: "Your technical skills section is well-structured and comprehensive.",
          },
        ],
      },
    },
    {
      id: 2,
      name: "Product_Manager_CV.pdf",
      date: "2024-03-14",
      time: "1 day ago",
      score: 87,
      status: "completed",
      type: "resume",
      size: "1.8 MB",
      analysisResults: {
        score: {
          title: "Match Score",
          value: 87,
        },
        missingSkills: {
          title: "Missing Skills or Experiences",
          value: [
            { name: "Agile Methodology", importance: "high" as const },
            { name: "Data Analysis", importance: "medium" as const },
          ],
        },
        suggestions: {
          title: "Suggestions to Improve Resume",
          value:
            "Emphasize cross-functional team leadership and add metrics to product launch achievements.",
        },
        detailedSuggestions: [
          {
            title: "Add product metrics",
            status: "improvement" as const,
            note: "Include specific metrics like user growth, revenue impact, or engagement rates.",
          },
          {
            title: "Highlight stakeholder management",
            status: "critical" as const,
            note: "Product management roles require strong stakeholder communication skills.",
          },
        ],
      },
    },
    {
      id: 3,
      name: "UX_Designer_Resume.pdf",
      date: "2024-03-12",
      time: "3 days ago",
      score: 94,
      status: "completed",
      type: "resume",
      size: "2.1 MB",
      analysisResults: {
        score: {
          title: "Match Score",
          value: 94,
        },
        missingSkills: {
          title: "Missing Skills or Experiences",
          value: [{ name: "Prototyping Tools", importance: "medium" as const }],
        },
        suggestions: {
          title: "Suggestions to Improve Resume",
          value:
            "Excellent portfolio presentation. Consider adding more user research methodology details.",
        },
        detailedSuggestions: [
          {
            title: "Outstanding design portfolio",
            status: "success" as const,
            note: "Your portfolio effectively demonstrates design thinking and problem-solving skills.",
          },
        ],
      },
    },
    {
      id: 4,
      name: "Data_Scientist_CV.pdf",
      date: "2024-03-10",
      time: "5 days ago",
      score: 89,
      status: "completed",
      type: "resume",
      size: "1.9 MB",
      analysisResults: {
        score: {
          title: "Match Score",
          value: 89,
        },
        missingSkills: {
          title: "Missing Skills or Experiences",
          value: [
            { name: "MLOps", importance: "high" as const },
            { name: "Kubernetes", importance: "medium" as const },
          ],
        },
        suggestions: {
          title: "Suggestions to Improve Resume",
          value:
            "Strong technical background. Add more business impact details to your data science projects.",
        },
        detailedSuggestions: [
          {
            title: "Add business impact metrics",
            status: "improvement" as const,
            note: "Quantify how your data science work affected business outcomes.",
          },
        ],
      },
    },
    {
      id: 5,
      name: "Marketing_Manager_Resume.pdf",
      date: "2024-03-08",
      time: "1 week ago",
      score: 85,
      status: "completed",
      type: "resume",
      size: "2.0 MB",
      analysisResults: {
        score: {
          title: "Match Score",
          value: 85,
        },
        missingSkills: {
          title: "Missing Skills or Experiences",
          value: [
            { name: "Digital Marketing", importance: "high" as const },
            { name: "SEO/SEM", importance: "medium" as const },
          ],
        },
        suggestions: {
          title: "Suggestions to Improve Resume",
          value:
            "Good campaign management experience. Add more digital marketing and analytics skills.",
        },
        detailedSuggestions: [
          {
            title: "Expand digital marketing skills",
            status: "critical" as const,
            note: "Modern marketing roles require strong digital and analytics capabilities.",
          },
        ],
      },
    },
    {
      id: 6,
      name: "Frontend_Developer_CV.pdf",
      date: "2024-03-05",
      time: "2 weeks ago",
      score: 91,
      status: "completed",
      type: "resume",
      size: "2.4 MB",
      analysisResults: {
        score: {
          title: "Match Score",
          value: 91,
        },
        missingSkills: {
          title: "Missing Skills or Experiences",
          value: [
            { name: "Next.js", importance: "medium" as const },
            { name: "Testing", importance: "high" as const },
          ],
        },
        suggestions: {
          title: "Suggestions to Improve Resume",
          value:
            "Excellent frontend skills. Consider adding testing experience and modern framework knowledge.",
        },
        detailedSuggestions: [
          {
            title: "Add testing experience",
            status: "critical" as const,
            note: "Testing skills are essential for senior frontend development roles.",
          },
        ],
      },
    },
  ];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleViewAnalysis = (analysis: any) => {
    setSelectedAnalysis(analysis);
    setShowDetailsModal(true);
  };

  /* const sidebarItems = [
    { id: "dashboard", label: "Dashboard", icon: Home, href: "/dashboard" },
    {
      id: "history",
      label: "History",
      icon: HistoryIcon,
      href: "/dashboard/history",
    },
    {
      id: "settings",
      label: "Settings",
      icon: Settings,
      href: "/dashboard/settings",
    },
    { id: "support", label: "Support", icon: HelpCircle, href: "#" },
  ];

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }; */

  const filteredHistory = analysisHistory.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesFilter = filterType === "all" || item.type === filterType;
    return matchesSearch && matchesFilter;
  });


  return (
    <div>
        <main className="flex-1 overflow-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <Card className="border-neutral-700 bg-neutral-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-brand-900/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                      <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-brand-400" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        {analysisHistory.length}
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm">
                        Total Analyses
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-700 bg-neutral-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                      <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        89
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm">
                        Average Score
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-700 bg-neutral-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                      <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        +12
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm">
                        Best Improvement
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-neutral-700 bg-neutral-800">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-900/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                      <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                    </div>
                    <div>
                      <p className="text-xl sm:text-2xl font-bold text-white">
                        2h
                      </p>
                      <p className="text-neutral-400 text-xs sm:text-sm">
                        Last Analysis
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Search and Filter */}
            <Card className="border-neutral-700 bg-neutral-800">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
                    <Input
                      placeholder="Search analyses..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10 bg-neutral-700 border-neutral-600 text-white placeholder-neutral-400"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant={filterType === "all" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType("all")}
                      className={
                        filterType === "all"
                          ? "bg-brand-600 hover:bg-brand-700"
                          : "border-neutral-600 text-neutral-300 hover:bg-neutral-700"
                      }
                    >
                      All
                    </Button>
                    <Button
                      variant={filterType === "resume" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setFilterType("resume")}
                      className={
                        filterType === "resume"
                          ? "bg-brand-600 hover:bg-brand-700"
                          : "border-neutral-600 text-neutral-300 hover:bg-neutral-700"
                      }
                    >
                      Resumes
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* History List */}
            <Card className="border-neutral-700 bg-neutral-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <HistoryIcon className="w-5 h-5 mr-2 text-brand-400" />
                  Analysis History
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y divide-neutral-700">
                  {filteredHistory.map((analysis) => (
                    <div
                      key={analysis.id}
                      className="p-4 sm:p-6 hover:bg-neutral-700/50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1 min-w-0">
                          <div className="w-10 h-10 bg-brand-900/30 rounded-lg flex items-center justify-center">
                            <FileText className="w-5 h-5 text-brand-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-white font-medium truncate">
                              {analysis.name}
                            </h3>
                            <div className="flex items-center space-x-4 text-sm text-neutral-400 mt-1">
                              <span className="flex items-center">
                                <Calendar className="w-3 h-3 mr-1" />
                                {analysis.time}
                              </span>
                              <span>{analysis.size}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
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
                          <div className="flex space-x-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleViewAnalysis(analysis)}
                              className="text-neutral-400 hover:text-white p-2"
                              title="View analysis details"
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-neutral-400 hover:text-red-400 p-2"
                              title="Delete analysis"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </main>

    </div>
  )
}

export default Main