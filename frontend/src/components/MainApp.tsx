import { useState } from "react";
import { FileText, BarChart3, Users, MessageSquare, Upload, Home } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { HRDashboard } from "./HRDashboard";
import { FileUpload } from "./FileUpload";
import { DISCChart } from "./DISCChart";
import { EmployeeComparison } from "./EmployeeComparison";
import { Chatbot } from "./Chatbot";
import { DISCChartData } from "../data/cvData";

export function MainApp() {
  const [selectedEmployees, setSelectedEmployees] = useState<DISCChartData[]>([]);

  const handleEmployeeSelection = (employees: DISCChartData[]) => {
    setSelectedEmployees(employees);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2">DISC Analytics Platform</h1>
          <p className="text-muted-foreground">
            Comprehensive behavioral assessment analysis and team insights
          </p>
        </div>

        {/* Main Navigation */}
        <Tabs defaultValue="dashboard" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard" className="flex items-center gap-2">
              <Home className="h-4 w-4" />
              Dashboard
            </TabsTrigger>
            <TabsTrigger value="upload" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Upload Data
            </TabsTrigger>
            <TabsTrigger value="disc-chart" className="flex items-center gap-2">
              <BarChart3 className="h-4 w-4" />
              DISC Chart
            </TabsTrigger>
            <TabsTrigger value="compare" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Compare
            </TabsTrigger>
            <TabsTrigger value="chatbot" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
                  <FileText className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">
                      • Upload new DISC datasets
                    </p>
                    <p className="text-xs text-muted-foreground">
                      • Visualize employee behavioral profiles
                    </p>
                    <p className="text-xs text-muted-foreground">
                      • Compare team members
                    </p>
                    <p className="text-xs text-muted-foreground">
                      • Get AI-powered insights
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">DISC Overview</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-sm">Dominance - Results-oriented</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-amber-500 rounded-full"></div>
                      <span className="text-sm">Influence - People-oriented</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
                      <span className="text-sm">Steadiness - Stability-focused</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
                      <span className="text-sm">Conscientiousness - Detail-oriented</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Selected for Comparison</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  {selectedEmployees.length > 0 ? (
                    <div className="space-y-2">
                      {selectedEmployees.slice(0, 3).map(emp => (
                        <Badge key={emp.id} variant="outline" className="text-xs">
                          {emp.name}
                        </Badge>
                      ))}
                      {selectedEmployees.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{selectedEmployees.length - 3} more
                        </Badge>
                      )}
                    </div>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No employees selected. Use the DISC Chart to select employees for comparison.
                    </p>
                  )}
                </CardContent>
              </Card>
            </div>

            <HRDashboard />
          </TabsContent>

          {/* Upload Tab */}
          <TabsContent value="upload" className="space-y-6">
            <FileUpload />
            
            <Card>
              <CardHeader>
                <CardTitle>Data Format Requirements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="mb-3">DISC Chart Data</h4>
                    <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                      name,dominance,influence,steadiness,conscientiousness<br/>
                      John Doe,75,45,-20,60<br/>
                      Jane Smith,-30,80,65,-15<br/>
                      ...
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Values should range from -100 to 100
                    </p>
                  </div>
                  
                  <div>
                    <h4 className="mb-3">Assessment Data</h4>
                    <div className="bg-muted p-3 rounded-lg text-sm font-mono">
                      examinee_id,name,company,position,assessment_date<br/>
                      1001,John Doe,Tech Corp,Developer,7/25/2025<br/>
                      1002,Jane Smith,Design Inc,Designer,7/26/2025<br/>
                      ...
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Include all standard assessment columns as shown in the original dataset
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* DISC Chart Tab */}
          <TabsContent value="disc-chart" className="space-y-6">
            <DISCChart onEmployeeSelect={handleEmployeeSelection} />
          </TabsContent>

          {/* Compare Tab */}
          <TabsContent value="compare" className="space-y-6">
            <EmployeeComparison selectedEmployees={selectedEmployees} />
          </TabsContent>

          {/* Chatbot Tab */}
          <TabsContent value="chatbot" className="space-y-6">
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <div className="xl:col-span-2">
                <Chatbot />
              </div>
              
              <div className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Assistant Features</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Employee Comparisons</p>
                          <p className="text-muted-foreground text-xs">
                            Compare DISC profiles between team members
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Trait Analysis</p>
                          <p className="text-muted-foreground text-xs">
                            Find employees with specific behavioral traits
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Team Insights</p>
                          <p className="text-muted-foreground text-xs">
                            Get recommendations for team composition
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
                        <div>
                          <p className="font-medium">Individual Profiles</p>
                          <p className="text-muted-foreground text-xs">
                            Deep dive into employee strengths and work styles
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Sample Questions</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p className="text-muted-foreground">Try asking:</p>
                      <ul className="space-y-1 text-xs">
                        <li>• "How does [Name] compare to [Name]?"</li>
                        <li>• "Who has high Dominance scores?"</li>
                        <li>• "What are [Name]'s key strengths?"</li>
                        <li>• "Which employees work well together?"</li>
                        <li>• "Show me similar personality profiles"</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Integration Note</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="outline" className="mb-2">Production Ready</Badge>
                    <p className="text-xs text-muted-foreground">
                      This chatbot uses pattern matching for demo purposes. In production, 
                      integrate with OpenAI API by adding your API key and replacing the 
                      generateResponse function with actual API calls.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}