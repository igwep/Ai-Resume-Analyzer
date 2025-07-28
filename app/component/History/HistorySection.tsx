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
import { useAppSelector } from '@/app/hooks/useTypedHooks';
import { HistoryEntry, /* UserData */ } from '@/types/userDataType';
import { getTimeAgo } from '@/app/utils/getTimeAgo';
import { useLatestHistoryDate } from '@/app/hooks/useGetLastAnalysis';
//Main

export const HistorySection = () => {
   // const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const [selectedAnalysis, setSelectedAnalysis] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const user = useAppSelector((state) => state.user.data);
  const latestHistoryDate = useLatestHistoryDate();
  const lastAnalysis = getTimeAgo(latestHistoryDate?.toISOString() || "");

 

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
const historyList: HistoryEntry[] =
  user?.history
    ? Object.values(user.history as { [key: string]: { [key: string]: HistoryEntry } })
        .flatMap((group) => Object.values(group as { [key: string]: HistoryEntry }))
    : [];

  console.log("User:", user);
  console.log("History List:", historyList);

  

/*  const filteredHistory = historyList.filter((item: HistoryEntry) => {
  const matchesSearch = item.resumeName?.toLowerCase().includes(searchQuery.toLowerCase());
  const matchesFilter = filterType === "all";
  return matchesSearch && matchesFilter;
});
  console.log("Filtered History:", filteredHistory); */


  return (
   <div>
  <main className="flex-1 overflow-auto p-4 sm:p-6">
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Card className="border-[#334155] bg-[#1E293B]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-[#1E3A8A]/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-[#60A5FA]" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {historyList.length}
                </p>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  Total Analyses
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#334155] bg-[#1E293B]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-emerald-900/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <BarChart3 className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-400" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">89</p>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  Average Score
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#334155] bg-[#1E293B]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-900/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <TrendingUp className="w-5 h-5 sm:w-6 sm:h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">+12</p>
                <p className="text-neutral-400 text-xs sm:text-sm">
                  Best Improvement
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-[#334155] bg-[#1E293B]">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-orange-900/30 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
              </div>
              <div>
                <p className="text-xl sm:text-2xl font-bold text-white">
                  {lastAnalysis}
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
      <Card className="border-[#334155] bg-[#1E293B]">
        <CardContent className="p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-4 h-4" />
              <Input
                placeholder="Search analyses..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-[#334155] border-[#334155] text-white placeholder-neutral-400"
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
                    : "border-[#334155] text-neutral-300 hover:bg-[#334155]"
                }
              >
                Resumes
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* History List */}
      <Card className="border-[#334155] bg-[#1E293B]">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <HistoryIcon className="w-5 h-5 mr-2 text-brand-400" />
            Analysis History
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-[#334155]">
            {historyList.map((analysis: HistoryEntry) => (
              <div
                key={analysis.id}
                className="p-4 sm:p-6 hover:bg-[#334155]/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-[#1E3A8A]/30  rounded-lg flex items-center justify-center">
                      <FileText className="w-5 h-5 text-[#60A5FA]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-white font-medium truncate">
                        {analysis.id}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-neutral-400 mt-1">
                        <span className="flex items-center">
                          <Calendar className="w-3 h-3 mr-1" />
                          {getTimeAgo(analysis.createdAt)} ago
                        </span>
                     {/*    <span>{analysis.size}</span> */}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Badge
                      className={`${
    analysis.score?.value >= 90
      ? "bg-green-900/30 text-green-300"
      : analysis.score?.value >= 80
      ? "bg-yellow-900/30 text-yellow-300"
      : analysis.score?.value >= 60
      ? "bg-orange-900/30 text-orange-300"
      : "bg-red-900/30 text-red-300"
  }`}
                    >
                      {analysis.score?.value}
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

