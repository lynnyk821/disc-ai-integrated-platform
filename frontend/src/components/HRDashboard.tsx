import { useState, useMemo } from "react";
import { Search, FileText, Users, Calendar } from "lucide-react";
import { Input } from "./ui/input";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { CVCard } from "./CVCard";
import { CVData, mockCVData } from "../data/cvData";

export function HRDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBehaviorType, setSelectedBehaviorType] = useState("all");
  const [selectedCandidate, setSelectedCandidate] = useState<CVData | null>(null);

  const behaviorTypes = Array.from(new Set(mockCVData.map(cv => cv.behavior_type_class)));

  const filteredCVs = useMemo(() => {
    return mockCVData.filter(cv => {
      const matchesSearch = cv.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cv.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          cv.position.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesBehaviorType = selectedBehaviorType === "all" || 
                                cv.behavior_type_class === selectedBehaviorType;

      return matchesSearch && matchesBehaviorType;
    });
  }, [searchTerm, selectedBehaviorType]);

  const stats = {
    totalCandidates: mockCVData.length,
    uniqueCompanies: new Set(mockCVData.map(cv => cv.company)).size,
    behaviorTypes: behaviorTypes.length,
    averageTime: Math.round(mockCVData.reduce((sum, cv) => sum + cv.time, 0) / mockCVData.length)
  };

  if (selectedCandidate) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-6xl mx-auto">
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => setSelectedCandidate(null)}
              className="px-4 py-2 bg-white border rounded-lg hover:bg-gray-50 transition-colors"
            >
              ← Back to Dashboard
            </button>
            <h1>Candidate Assessment Details</h1>
          </div>
          <CVCard cvData={selectedCandidate} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">HR Candidate Assessment Dashboard</h1>
          <p className="text-muted-foreground">
            Review and analyze candidate behavioral assessments and qualifications
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Candidates</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalCandidates}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Companies</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.uniqueCompanies}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Behavior Types</CardTitle>
              <Badge className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.behaviorTypes}</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Assessment Time</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageTime}m</div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Search & Filter Candidates</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                  <Input
                    placeholder="Search by name, company, or position..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="w-full sm:w-64">
                <Select value={selectedBehaviorType} onValueChange={setSelectedBehaviorType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by behavior type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Behavior Types</SelectItem>
                    {behaviorTypes.map(type => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results */}
        <div className="mb-4">
          <h2>Candidates ({filteredCVs.length})</h2>
        </div>

        {/* Candidate List */}
        <div className="space-y-4">
          {filteredCVs.map((cv) => (
            <Card 
              key={cv.examinee_id} 
              className="cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setSelectedCandidate(cv)}
            >
              <CardContent className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <h3>{cv.name}</h3>
                      <Badge variant="outline">{cv.behavior_type_class}</Badge>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>{cv.position} at {cv.company}</p>
                      <p>Assessed: {cv.assessment_date} • Duration: {cv.time} minutes</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-blue-100 text-blue-800">
                      Logic: {cv.analyzer_logical.toFixed(0)}
                    </Badge>
                    <Badge className="bg-green-100 text-green-800">
                      Empathy: {cv.supporter_empathy.toFixed(0)}
                    </Badge>
                    <Badge className="bg-purple-100 text-purple-800">
                      Detail: {cv.attention_to_detail.toFixed(0)}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredCVs.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3>No candidates found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search criteria or filters
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}