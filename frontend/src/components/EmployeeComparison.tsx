import { useState, useEffect } from "react";
import { TrendingUp, TrendingDown, Minus, Users, BarChart3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { Progress } from "./ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Separator } from "./ui/separator";
import axios from "axios";
import {getHost} from "../data/getHost";


interface EmployeeDTO {
  id: number;
  name: string;
}

interface EmployeesComparisonResultDTO {
  employees: EmployeeDTO[];
  similarities: Similarity[];
  detailedDiscComparison: DiscComparison[];
  individualEmployeeProfiles: IndividualEmployeeProfile[];
}

interface Similarity {
  similar: string;
  message: string;
  scoreRange: number;
}

interface DiscComparison {
  sector: string;
  highestEmployee: EmployeeScore;
  lowestEmployee: EmployeeScore;
  averageScore: number;
  rangeScore: number;
  employees: EmployeeScore[];
}

interface EmployeeScore {
  name: string;
  score: number;
}

interface IndividualEmployeeProfile {
  name: string;
  company: string;
  position: string;
  dominanceScore: number;
  influenceScore: number;
  steadinessScore: number;
  consncientionScore: number;
}

interface EmployeeComparisonProps {
  selectedEmployees?: EmployeeDTO[];
}

export function EmployeeComparison({ selectedEmployees: initialSelected = [] }: EmployeeComparisonProps) {
  const [selectedIds, setSelectedIds] = useState<number[]>(
      initialSelected.map(emp => emp.id)
  );
  const [allEmployees, setAllEmployees] = useState<EmployeeDTO[]>([]);
  const [comparisonResult, setComparisonResult] = useState<EmployeesComparisonResultDTO | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Отримуємо всіх співробітників з бекенду
  useEffect(() => {
    axios.get<EmployeeDTO[]>(`https://disc-platform-ai-backend.onrender.com/api/employees`)
        .then(response => {
          setAllEmployees(response.data);
          console.log(response.data);
        })
        .catch(err => {
          console.error("Error fetching employees", err);
          setError("Не вдалося завантажити список співробітників");
        });
  }, []);

  // Отримуємо результати порівняння при зміні вибраних співробітників
  useEffect(() => {
    if (selectedIds.length >= 2) {
      fetchComparisonData();
    } else {
      setComparisonResult(null);
    }
  }, [selectedIds]);

  const fetchComparisonData = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post<EmployeesComparisonResultDTO>(
          `https://disc-platform-ai-backend.onrender.com/api/compare/employees`,
          { employeeIds: selectedIds }
      );
      setComparisonResult(response.data);
    } catch (err) {
      console.error("Error fetching comparison data", err);
      setError("Не вдалося завантажити дані порівняння");
    } finally {
      setLoading(false);
    }
  };

  const handleEmployeeSelect = (employeeId: string) => {
    const id = parseInt(employeeId);
    if (!selectedIds.includes(id)) {
      setSelectedIds(prev => [...prev, id]);
    }
  };

  const removeEmployee = (id: number) => {
    setSelectedIds(prev => prev.filter(empId => empId !== id));
  };

  const getTraitColor = (trait: string) => {
    switch (trait.toLowerCase()) {
      case 'dominance': return 'bg-red-500';
      case 'influence': return 'bg-amber-500';
      case 'steadiness': return 'bg-emerald-500';
      case 'conscientiousness': return 'bg-violet-500';
      default: return 'bg-gray-500';
    }
  };

  const formatTrait = (trait: string) => {
    return trait.charAt(0).toUpperCase() + trait.slice(1);
  };

  const selectedEmployees = allEmployees.filter(emp => selectedIds.includes(emp.id));

  return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Employee Comparison Tool
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="flex-1">
                <label className="text-sm font-medium mb-2 block">Add Employee to Compare</label>
                <Select onValueChange={handleEmployeeSelect}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an employee..." />
                  </SelectTrigger>
                  <SelectContent>
                    {allEmployees
                        .filter(emp => !selectedIds.includes(emp.id))
                        .map(employee => (
                            <SelectItem key={employee.id} value={employee.id.toString()}>
                              {employee.name}
                            </SelectItem>
                        ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {selectedEmployees.length > 0 && (
                <div className="mb-6">
                  <h4 className="mb-3">Selected Employees ({selectedEmployees.length})</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEmployees.map(employee => (
                        <Badge key={employee.id} variant="outline" className="pr-1">
                          {employee.name}
                          <button
                              onClick={() => removeEmployee(employee.id)}
                              className="ml-2 text-muted-foreground hover:text-foreground"
                          >
                            ×
                          </button>
                        </Badge>
                    ))}
                  </div>
                </div>
            )}

            {selectedEmployees.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3>No employees selected for comparison</h3>
                  <p>Add at least 2 employees to start comparing their DISC profiles.</p>
                </div>
            )}

            {selectedEmployees.length === 1 && (
                <div className="text-center py-12 text-muted-foreground">
                  <BarChart3 className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <h3>Add another employee to compare</h3>
                  <p>Select at least one more employee to see detailed comparisons.</p>
                </div>
            )}

            {loading && (
                <div className="text-center py-4">
                  <p>Loading comparison data...</p>
                </div>
            )}

            {error && (
                <div className="text-center py-4 text-red-500">
                  <p>{error}</p>
                </div>
            )}
          </CardContent>
        </Card>

        {comparisonResult && (
            <>
              {/* Similarities */}
              {comparisonResult.similarities.length > 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-green-600" />
                        Similarities
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {comparisonResult.similarities.map((similarity, index) => (
                            <div key={index} className="flex items-start gap-3 p-3 bg-green-50 rounded-lg">
                              <div className={`w-3 h-3 rounded-full mt-1 ${getTraitColor(similarity.similar)}`}></div>
                              <div>
                                <p className="font-medium text-green-800">
                                  Similar {formatTrait(similarity.similar)}
                                </p>
                                <p className="text-sm text-green-700">{similarity.message}</p>
                                <p className="text-xs text-green-600 mt-1">
                                  Score range: {similarity.scoreRange.toFixed(1)} points
                                </p>
                              </div>
                            </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
              )}

              {/* Detailed Comparison */}
              <Card>
                <CardHeader>
                  <CardTitle>Detailed DISC Comparison</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    {comparisonResult.detailedDiscComparison.map((comparison, index) => (
                        <div key={index} className="space-y-3">
                          <div className="flex items-center gap-2 mb-3">
                            <div className={`w-4 h-4 rounded ${getTraitColor(comparison.sector)}`}></div>
                            <h4>{formatTrait(comparison.sector)}</h4>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="font-medium">Highest:</span>
                                <span>{comparison.highestEmployee.name}</span>
                                <Badge variant="outline">{comparison.highestEmployee.score}</Badge>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <TrendingDown className="h-4 w-4 text-red-600" />
                                <span className="font-medium">Lowest:</span>
                                <span>{comparison.lowestEmployee.name}</span>
                                <Badge variant="outline">{comparison.lowestEmployee.score}</Badge>
                              </div>
                            </div>

                            <div className="space-y-2">
                              <div className="flex items-center gap-2 text-sm">
                                <Minus className="h-4 w-4 text-muted-foreground" />
                                <span className="font-medium">Average:</span>
                                <span>{comparison.averageScore.toFixed(1)}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <span className="font-medium">Range:</span>
                                <span>{comparison.rangeScore.toFixed(1)} points</span>
                              </div>
                            </div>
                          </div>

                          <div className="space-y-2">
                            {comparison.employees.map((employee, empIndex) => (
                                <div key={empIndex} className="flex items-center gap-3">
                          <span className="text-sm font-medium w-32 truncate">
                            {employee.name}
                          </span>
                                  <div className="flex-1">
                                    <Progress
                                        value={((employee.score + 100) / 200) * 100}
                                        className="h-2"
                                    />
                                  </div>
                                  <span className="text-sm font-mono w-12 text-right">
                            {employee.score}
                          </span>
                                </div>
                            ))}
                          </div>

                          {index !== comparisonResult.detailedDiscComparison.length - 1 && <Separator />}
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Individual Profiles */}
              <Card>
                <CardHeader>
                  <CardTitle>Individual Employee Profiles</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {comparisonResult.individualEmployeeProfiles.map((profile, index) => (
                        <div key={index} className="border rounded-lg p-4">
                          <h4 className="mb-3">{profile.name}</h4>

                          <div className="grid grid-cols-2 gap-3 mb-4">
                            <div>
                              <span className="text-xs text-muted-foreground">Company</span>
                              <p className="text-sm">{profile.company}</p>
                            </div>
                            <div>
                              <span className="text-xs text-muted-foreground">Position</span>
                              <p className="text-sm">{profile.position}</p>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Dominance</span>
                              <span className="text-sm font-mono">{profile.dominanceScore}</span>
                            </div>
                            <Progress value={((profile.dominanceScore + 100) / 200) * 100} className="h-1" />

                            <div className="flex justify-between items-center">
                              <span className="text-sm">Influence</span>
                              <span className="text-sm font-mono">{profile.influenceScore}</span>
                            </div>
                            <Progress value={((profile.influenceScore + 100) / 200) * 100} className="h-1" />

                            <div className="flex justify-between items-center">
                              <span className="text-sm">Steadiness</span>
                              <span className="text-sm font-mono">{profile.steadinessScore}</span>
                            </div>
                            <Progress value={((profile.steadinessScore + 100) / 200) * 100} className="h-1" />

                            <div className="flex justify-between items-center">
                              <span className="text-sm">Conscientiousness</span>
                              <span className="text-sm font-mono">{profile.consncientionScore}</span>
                            </div>
                            <Progress value={((profile.consncientionScore + 100) / 200) * 100} className="h-1" />
                          </div>
                        </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
        )}
      </div>
  );
}